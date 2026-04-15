import { getDb } from '@/db';
import { payment } from '@/db/app.schema';
import { user } from '@/db/auth.schema';
import { sendPaymentNotification } from '@/notification';
import { desc, eq } from 'drizzle-orm';
import type {
  CheckoutResult,
  CreateCheckoutParams,
  CreatePortalParams,
  PaymentProvider,
  PaymentStatus,
  PlanInterval,
  PortalResult,
} from '../types';
import { PaymentScenes, PaymentTypes, PlanIntervals } from '../types';

// ─── Creem Webhook Types ──────────────────────────────────────

interface CreemWebhookEvent {
  id: string;
  eventType: string;
  object: CreemWebhookObject;
}

interface CreemWebhookObject {
  request_id: string;
  id: string;
  customer: {
    id: string;
    email?: string;
    name?: string;
  };
  product: {
    id: string;
    name?: string;
    billing_type: string;
    billing_period?: string;
    price?: number;
  };
  // Nested subscription object (present in checkout.completed)
  subscription?: {
    id: string;
    status?: string;
    current_period_start_date?: string;
    current_period_end_date?: string;
    cancel_at_period_end?: boolean;
  };
  // Top-level period fields (present in subscription.* events)
  current_period_start_date?: string;
  current_period_end_date?: string;
  canceled_at?: string;
  status: string;
  metadata: Record<string, unknown>;
}

// ─── Creem API Response Types ─────────────────────────────────

interface CreemCheckoutResponse {
  id: string;
  checkout_url: string;
  [key: string]: unknown;
}

interface CreemPortalResponse {
  customer_portal_link: string;
  [key: string]: unknown;
}

// ─── Creem Provider Implementation ───────────────────────────

/**
 * Creem payment provider implementation
 *
 * Uses direct REST API calls instead of the Creem npm SDK
 * for Cloudflare Workers compatibility.
 *
 * Creem API docs: https://docs.creem.io
 */
export class CreemProvider implements PaymentProvider {
  private apiKey: string;
  private webhookSecret: string;
  private baseUrl: string;

  constructor() {
    const apiKey = process.env.CREEM_API_KEY;
    if (!apiKey) {
      throw new Error('CREEM_API_KEY environment variable is not set');
    }

    const webhookSecret = process.env.CREEM_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error('CREEM_WEBHOOK_SECRET environment variable is not set');
    }

    this.apiKey = apiKey;
    this.webhookSecret = webhookSecret;
    const isTest = process.env.CREEM_DEBUG === 'true';
    this.baseUrl = isTest
      ? 'https://test-api.creem.io'
      : 'https://api.creem.io';
  }

  getProviderName(): string {
    return 'creem';
  }

  // ─── API Helpers ──────────────────────────────────────────

  /**
   * Make an authenticated request to the Creem API
   */
  private async apiRequest<T>(
    method: string,
    path: string,
    body?: Record<string, unknown>
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const options: RequestInit = {
      method,
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Creem API error [${response.status}]:`, errorText);
      throw new Error(
        `Creem API request failed: ${response.status} ${response.statusText}`
      );
    }

    return response.json() as Promise<T>;
  }

  // ─── Checkout ─────────────────────────────────────────────

  /**
   * Create a Creem checkout session
   *
   * Maps the generic CreateCheckoutParams to Creem's checkout API:
   * - priceId → product_id (Creem uses product IDs)
   * - metadata.userId → request_id (for webhook correlation)
   */
  public async createCheckout(
    params: CreateCheckoutParams
  ): Promise<CheckoutResult> {
    const { priceId, customerEmail, successUrl, metadata } = params;

    try {
      const userId = metadata?.userId;

      // Build checkout request body
      const requestBody: Record<string, unknown> = {
        product_id: priceId,
        success_url: successUrl ?? '',
        request_id: userId ?? '',
        metadata: metadata ?? {},
      };

      // Add customer email if available
      if (customerEmail) {
        requestBody.customer = { email: customerEmail };
      }

      const checkout = await this.apiRequest<CreemCheckoutResponse>(
        'POST',
        '/v1/checkouts',
        requestBody
      );

      return {
        url: checkout.checkout_url,
        id: checkout.id,
      };
    } catch (error) {
      console.error('Creem create checkout error:', error);
      throw new Error('Failed to create Creem checkout session');
    }
  }

  // ─── Customer Portal ──────────────────────────────────────

  /**
   * Create a Creem customer portal link
   *
   * Creem provides a hosted customer portal where users can
   * manage subscriptions, view invoices, and update billing.
   */
  public async createCustomerPortal(
    params: CreatePortalParams
  ): Promise<PortalResult> {
    const { customerId } = params;

    try {
      const portal = await this.apiRequest<CreemPortalResponse>(
        'POST',
        '/v1/customers/billing',
        { customer_id: customerId }
      );

      return {
        url: portal.customer_portal_link,
      };
    } catch (error) {
      console.error('Creem create customer portal error:', error);
      throw new Error('Failed to create Creem customer portal');
    }
  }

  // ─── Webhook Handling ─────────────────────────────────────

  /**
   * Handle Creem webhook event
   *
   * Creem webhook events:
   * - checkout.completed: Payment successful (one-time or first subscription)
   * - subscription.paid: Recurring payment successful (renewal)
   * - subscription.canceled: Subscription canceled
   * - subscription.expired: Subscription expired
   * - subscription.trialing: Trial started
   * - subscription.paused: Subscription paused
   *
   * @param payload Raw webhook payload
   * @param signature Webhook signature (creem-signature header)
   */
  public async handleWebhookEvent(
    payload: string,
    signature: string
  ): Promise<void> {
    try {
      // Verify webhook signature
      await this.verifySignature(payload, signature);

      const event: CreemWebhookEvent = JSON.parse(payload);
      const { eventType } = event;
      console.log(`handle Creem webhook event, type: ${eventType}`);

      switch (eventType) {
        case 'checkout.completed':
          await this.onCheckoutCompleted(event);
          break;
        case 'subscription.paid':
          await this.onSubscriptionPaid(event);
          break;
        case 'subscription.active':
          await this.onSubscriptionActive(event);
          break;
        case 'subscription.update':
          await this.onSubscriptionUpdate(event);
          break;
        case 'subscription.canceled':
          await this.onSubscriptionCanceled(event);
          break;
        case 'subscription.expired':
          await this.onSubscriptionExpired(event);
          break;
        case 'subscription.trialing':
          await this.onSubscriptionTrialing(event);
          break;
        case 'subscription.paused':
          await this.onSubscriptionPaused(event);
          break;
        default:
          console.warn(`Unhandled Creem webhook event: ${eventType}`);
      }
    } catch (error) {
      console.error('Creem webhook handling error:', error);
      throw new Error('Failed to handle Creem webhook event');
    }
  }

  /**
   * Verify Creem webhook signature using HMAC-SHA256
   */
  private async verifySignature(
    payload: string,
    signature: string
  ): Promise<void> {
    if (!signature) {
      throw new Error('Missing Creem webhook signature');
    }

    // Use Web Crypto API (Cloudflare Workers compatible)
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(this.webhookSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(payload)
    );

    const computed = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    if (computed !== signature) {
      throw new Error('Invalid Creem webhook signature');
    }
  }

  // ─── Event Handlers ───────────────────────────────────────

  /**
   * Handle checkout.completed event
   *
   * This fires for both one-time payments and first subscription payments.
   * Creates a payment record and updates user's customerId.
   */
  private async onCheckoutCompleted(event: CreemWebhookEvent): Promise<void> {
    console.log('>> Handle Creem checkout completed:', event.id);

    const { object } = event;
    const isOneTime = object.product.billing_type !== 'recurring';
    const userId = this.extractUserId(object);

    if (!userId) {
      console.error('<< No userId found in Creem checkout event');
      return;
    }

    // Update user's customerId
    await this.updateUserCustomerId(object.customer.id, userId);

    if (isOneTime) {
      await this.createOneTimePaymentRecord(event, userId);
    } else {
      await this.createSubscriptionPaymentRecord(event, userId);
    }

    console.log('<< Handle Creem checkout completed success');
  }

  /**
   * Handle subscription.paid event (renewal)
   *
   * For subscription renewals, update the existing payment record
   * with new period dates and status.
   */
  private async onSubscriptionPaid(event: CreemWebhookEvent): Promise<void> {
    console.log('>> Handle Creem subscription paid:', event.id);

    const { object } = event;
    const subscriptionId = object.subscription?.id ?? object.id;

    // Find existing payment record by subscriptionId
    const db = getDb();
    const existing = await db
      .select()
      .from(payment)
      .where(eq(payment.subscriptionId, subscriptionId))
      .orderBy(desc(payment.createdAt))
      .limit(1);

    if (existing.length === 0) {
      // No existing record — treat as initial payment
      console.log(
        'No existing record for subscription.paid, creating new record'
      );
      const userId = this.extractUserId(object);
      if (userId) {
        await this.updateUserCustomerId(object.customer.id, userId);
        await this.createSubscriptionPaymentRecord(event, userId);
      }
      return;
    }

    // Update existing payment record with renewed period
    const periodDates = this.extractPeriodDates(object);

    await db
      .update(payment)
      .set({
        status: 'active' as PaymentStatus,
        paid: true,
        periodStart: periodDates.periodStart,
        periodEnd: periodDates.periodEnd,
        cancelAtPeriodEnd: false,
        updatedAt: new Date(),
      })
      .where(eq(payment.subscriptionId, subscriptionId));

    console.log('<< Handle Creem subscription paid success');
  }

  /**
   * Handle subscription.canceled event
   */
  private async onSubscriptionCanceled(
    event: CreemWebhookEvent
  ): Promise<void> {
    console.log('>> Handle Creem subscription canceled:', event.id);

    const { object } = event;
    const subscriptionId = object.subscription?.id ?? object.id;

    const db = getDb();
    const result = await db
      .update(payment)
      .set({
        status: 'canceled' as PaymentStatus,
        cancelAtPeriodEnd: object.subscription?.cancel_at_period_end ?? true,
        updatedAt: new Date(),
      })
      .where(eq(payment.subscriptionId, subscriptionId))
      .returning({ id: payment.id });

    if (result.length > 0) {
      console.log('<< Marked payment record as canceled');
    } else {
      console.warn('<< No payment record found for subscription cancellation');
    }
  }

  /**
   * Handle subscription.expired event
   *
   * Maps to 'canceled' status since our PaymentStatus doesn't have 'expired'.
   * Both represent "subscription no longer active" which is what matters
   * for getCurrentPlan() logic.
   */
  private async onSubscriptionExpired(event: CreemWebhookEvent): Promise<void> {
    console.log('>> Handle Creem subscription expired:', event.id);

    const { object } = event;
    const subscriptionId = object.subscription?.id ?? object.id;

    const db = getDb();
    const result = await db
      .update(payment)
      .set({
        status: 'canceled' as PaymentStatus,
        paid: false,
        updatedAt: new Date(),
      })
      .where(eq(payment.subscriptionId, subscriptionId))
      .returning({ id: payment.id });

    if (result.length > 0) {
      console.log('<< Marked payment record as canceled (expired)');
    } else {
      console.warn('<< No payment record found for subscription expiration');
    }
  }

  /**
   * Handle subscription.trialing event
   */
  private async onSubscriptionTrialing(
    event: CreemWebhookEvent
  ): Promise<void> {
    console.log('>> Handle Creem subscription trialing:', event.id);

    const { object } = event;
    const subscriptionId = object.subscription?.id ?? object.id;

    const db = getDb();
    const existing = await db
      .select()
      .from(payment)
      .where(eq(payment.subscriptionId, subscriptionId))
      .limit(1);

    if (existing.length > 0) {
      // Update existing record to trialing status
      const periodDates = this.extractPeriodDates(object);
      await db
        .update(payment)
        .set({
          status: 'trialing' as PaymentStatus,
          paid: true,
          periodStart: periodDates.periodStart,
          periodEnd: periodDates.periodEnd,
          trialStart: periodDates.periodStart,
          trialEnd: periodDates.periodEnd,
          updatedAt: new Date(),
        })
        .where(eq(payment.subscriptionId, subscriptionId));
    } else {
      // Create new record for trial
      const userId = this.extractUserId(object);
      if (userId) {
        await this.updateUserCustomerId(object.customer.id, userId);
        await this.createSubscriptionPaymentRecord(event, userId, 'trialing');
      }
    }

    console.log('<< Handle Creem subscription trialing success');
  }

  /**
   * Handle subscription.paused event
   */
  private async onSubscriptionPaused(event: CreemWebhookEvent): Promise<void> {
    console.log('>> Handle Creem subscription paused:', event.id);

    const { object } = event;
    const subscriptionId = object.subscription?.id ?? object.id;

    const db = getDb();
    const result = await db
      .update(payment)
      .set({
        status: 'paused' as PaymentStatus,
        updatedAt: new Date(),
      })
      .where(eq(payment.subscriptionId, subscriptionId))
      .returning({ id: payment.id });

    if (result.length > 0) {
      console.log('<< Marked payment record as paused');
    } else {
      console.warn('<< No payment record found for subscription pause');
    }
  }

  /**
   * Handle subscription.active event
   *
   * Fires when a subscription becomes active.
   * Updates the payment record with period dates and active status.
   */
  private async onSubscriptionActive(event: CreemWebhookEvent): Promise<void> {
    console.log('>> Handle Creem subscription active:', event.id);

    const { object } = event;
    const subscriptionId = object.subscription?.id ?? object.id;
    const periodDates = this.extractPeriodDates(object);

    const db = getDb();
    const existing = await db
      .select()
      .from(payment)
      .where(eq(payment.subscriptionId, subscriptionId))
      .orderBy(desc(payment.createdAt))
      .limit(1);

    if (existing.length > 0) {
      // Update existing record with period dates and active status
      await db
        .update(payment)
        .set({
          status: 'active' as PaymentStatus,
          paid: true,
          periodStart: periodDates.periodStart,
          periodEnd: periodDates.periodEnd,
          updatedAt: new Date(),
        })
        .where(eq(payment.subscriptionId, subscriptionId));
      console.log('<< Updated subscription record to active with period dates');
    } else {
      // No record yet — might arrive before checkout.completed
      // Create a new record if we can identify the user
      const userId = this.extractUserId(object);
      if (userId) {
        await this.updateUserCustomerId(object.customer.id, userId);
        await this.createSubscriptionPaymentRecord(event, userId);
      } else {
        console.log(
          '<< No existing record and no userId for subscription.active, skipping'
        );
      }
    }
  }

  /**
   * Handle subscription.update event
   *
   * Fires when a subscription is updated (e.g. plan change, period renewal).
   * Updates the payment record with the latest period dates and status.
   */
  private async onSubscriptionUpdate(event: CreemWebhookEvent): Promise<void> {
    console.log('>> Handle Creem subscription update:', event.id);

    const { object } = event;
    const subscriptionId = object.subscription?.id ?? object.id;
    const periodDates = this.extractPeriodDates(object);

    const db = getDb();
    const existing = await db
      .select()
      .from(payment)
      .where(eq(payment.subscriptionId, subscriptionId))
      .orderBy(desc(payment.createdAt))
      .limit(1);

    if (existing.length > 0) {
      // Build update set — only update period dates if they are present
      const updateSet: Record<string, unknown> = {
        updatedAt: new Date(),
      };
      if (periodDates.periodStart) {
        updateSet.periodStart = periodDates.periodStart;
      }
      if (periodDates.periodEnd) {
        updateSet.periodEnd = periodDates.periodEnd;
      }
      // Map subscription status if available
      const subStatus = object.subscription?.status;
      if (subStatus === 'active' || subStatus === 'trialing') {
        updateSet.status = subStatus as PaymentStatus;
      }
      if (object.subscription?.cancel_at_period_end !== undefined) {
        updateSet.cancelAtPeriodEnd = object.subscription.cancel_at_period_end;
      }

      await db
        .update(payment)
        .set(updateSet)
        .where(eq(payment.subscriptionId, subscriptionId));
      console.log('<< Updated subscription record from subscription.update');
    } else {
      console.log('<< No existing record for subscription.update, skipping');
    }
  }

  // ─── Record Creation ──────────────────────────────────────

  /**
   * Create a one-time payment record (lifetime plan)
   */
  private async createOneTimePaymentRecord(
    event: CreemWebhookEvent,
    userId: string
  ): Promise<void> {
    console.log('>> Create Creem one-time payment record');

    const { object } = event;
    const currentDate = new Date();

    try {
      const db = getDb();
      await db.insert(payment).values({
        id: crypto.randomUUID(),
        priceId: object.product.id,
        userId: userId,
        customerId: object.customer.id,
        subscriptionId: null,
        sessionId: event.id,
        invoiceId: event.id,
        type: PaymentTypes.ONE_TIME,
        scene: PaymentScenes.LIFETIME,
        interval: null,
        status: 'completed' as PaymentStatus,
        paid: true,
        periodStart: null,
        periodEnd: null,
        cancelAtPeriodEnd: null,
        trialStart: null,
        trialEnd: null,
        createdAt: currentDate,
        updatedAt: currentDate,
      });

      // Send notification for lifetime purchase
      const amount = object.product.price ? object.product.price / 100 : 0;
      await sendPaymentNotification({
        sessionId: event.id,
        customerId: object.customer.id,
        userName:
          (object.metadata?.userName as string) ??
          object.customer.name ??
          'Customer',
        amount,
      });

      console.log('<< Created Creem one-time payment record success');
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('unique constraint')
      ) {
        console.log('<< One-time payment record already exists, skipping');
        return;
      }
      throw error;
    }
  }

  /**
   * Create a subscription payment record
   */
  private async createSubscriptionPaymentRecord(
    event: CreemWebhookEvent,
    userId: string,
    statusOverride?: PaymentStatus
  ): Promise<void> {
    console.log('>> Create Creem subscription payment record');

    const { object } = event;
    const currentDate = new Date();
    const subscriptionId = object.subscription?.id ?? object.id;
    const periodDates = this.extractPeriodDates(object);
    const interval = this.mapBillingPeriodToInterval(
      object.product.billing_period
    );

    const isTrialing = statusOverride === 'trialing';

    try {
      const db = getDb();
      await db.insert(payment).values({
        id: crypto.randomUUID(),
        priceId: object.product.id,
        userId: userId,
        customerId: object.customer.id,
        subscriptionId: subscriptionId,
        sessionId: event.id,
        invoiceId: event.id,
        type: PaymentTypes.SUBSCRIPTION,
        scene: PaymentScenes.SUBSCRIPTION,
        interval: interval,
        status: statusOverride ?? ('active' as PaymentStatus),
        paid: true,
        periodStart: periodDates.periodStart,
        periodEnd: periodDates.periodEnd,
        cancelAtPeriodEnd: false,
        trialStart: isTrialing ? periodDates.periodStart : null,
        trialEnd: isTrialing ? periodDates.periodEnd : null,
        createdAt: currentDate,
        updatedAt: currentDate,
      });

      console.log('<< Created Creem subscription payment record success');
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('unique constraint')
      ) {
        console.log('<< Subscription payment record already exists, skipping');
        return;
      }
      throw error;
    }
  }

  // ─── Helpers ──────────────────────────────────────────────

  /**
   * Extract userId from Creem webhook object
   *
   * Creem stores the userId in multiple places:
   * 1. metadata.userId (set during checkout)
   * 2. request_id (set as requestId during checkout)
   */
  private extractUserId(object: CreemWebhookObject): string | undefined {
    return (
      (object.metadata?.userId as string) || object.request_id || undefined
    );
  }

  /**
   * Extract period dates from webhook object
   *
   * Creem uses `current_period_start_date` / `current_period_end_date` as field names.
   * For subscription.* events these are top-level fields on the object.
   * For checkout.completed the subscription is nested.
   *
   * Note: Creem has no separate trial_start / trial_end fields.
   * During trialing, period dates represent the trial start and end.
   */
  private extractPeriodDates(object: CreemWebhookObject): {
    periodStart: Date | null;
    periodEnd: Date | null;
  } {
    // Period start: try top-level first (subscription.* events), then nested
    const periodStartStr =
      object.current_period_start_date ??
      object.subscription?.current_period_start_date ??
      null;

    // Period end: try top-level first, then nested
    const periodEndStr =
      object.current_period_end_date ??
      object.subscription?.current_period_end_date ??
      null;

    return {
      periodStart: periodStartStr ? new Date(periodStartStr) : null,
      periodEnd: periodEndStr ? new Date(periodEndStr) : null,
    };
  }

  /**
   * Map Creem billing_period to PlanInterval
   *
   * Creem periods: 'every-month', 'every-3-months', 'every-6-months', 'every-year'
   * Our intervals: 'month', 'year'
   */
  private mapBillingPeriodToInterval(billingPeriod?: string): PlanInterval {
    switch (billingPeriod) {
      case 'every-year':
        return PlanIntervals.YEAR;
      default:
        return PlanIntervals.MONTH;
    }
  }

  /**
   * Update user record with Creem customer ID
   */
  private async updateUserCustomerId(
    customerId: string,
    userId: string
  ): Promise<void> {
    try {
      const db = getDb();
      await db
        .update(user)
        .set({
          customerId: customerId,
          updatedAt: new Date(),
        })
        .where(eq(user.id, userId));
      console.log('Updated user with Creem customer ID');
    } catch (error) {
      console.error('Update user with Creem customer ID error:', error);
    }
  }
}
