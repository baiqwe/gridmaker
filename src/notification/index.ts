import { websiteConfig } from '@/config/website';
import { serverEnv } from '@/env/server';
import { getBaseUrl } from '@/lib/urls';
import { DiscordProvider } from './provider/discord';
import { FeishuProvider } from './provider/feishu';
import type {
  NotificationProvider,
  NotificationProviderName,
  SendPaymentNotificationParams,
} from './types';

type ProviderFactory = () => NotificationProvider;

const providerRegistry: Record<NotificationProviderName, ProviderFactory> = {
  discord: () => {
    const webhookUrl = serverEnv.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) throw new Error('DISCORD_WEBHOOK_URL is required.');
    const logoPath = websiteConfig.metadata?.images?.logoLight;
    return new DiscordProvider({
      webhookUrl,
      botName: `${websiteConfig.metadata?.name ?? 'App Bot'}`,
      avatarUrl: logoPath ? `${getBaseUrl()}${logoPath}` : undefined,
    });
  },
  feishu: () => {
    const webhookUrl = serverEnv.FEISHU_WEBHOOK_URL;
    if (!webhookUrl) throw new Error('FEISHU_WEBHOOK_URL is required.');
    return new FeishuProvider({ webhookUrl });
  },
};

let notificationProvider: NotificationProvider | null = null;

function createProvider(): NotificationProvider {
  const name = websiteConfig.notification?.provider;
  if (!name)
    throw new Error('notification.provider is required in websiteConfig.');
  const factory = providerRegistry[name];
  if (!factory) {
    throw new Error(`Unsupported notification provider: ${name}.`);
  }
  return factory();
}

/**
 * Get the notification provider (lazy-initialized on first use)
 */
export function getNotificationProvider(): NotificationProvider {
  if (!notificationProvider) notificationProvider = createProvider();
  return notificationProvider;
}

/**
 * Send a payment notification
 */
export async function sendPaymentNotification(
  params: SendPaymentNotificationParams
): Promise<void> {
  if (!websiteConfig.notification?.enable) return;
  const provider = getNotificationProvider();
  await provider.sendPaymentNotification(params);
}
