import type {
  NotificationProvider,
  SendPaymentNotificationParams,
} from '../types';

interface DiscordProviderOptions {
  webhookUrl: string;
  botName: string;
  avatarUrl?: string;
}

/**
 * Send a message to Discord via webhook.
 */
async function sendMessage(
  webhookUrl: string,
  body: Record<string, unknown>
): Promise<void> {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    console.error('Failed to send Discord message:', response);
  }
}

export class DiscordProvider implements NotificationProvider {
  private webhookUrl: string;
  private botName: string;
  private avatarUrl?: string;

  constructor(options: DiscordProviderOptions) {
    this.webhookUrl = options.webhookUrl;
    this.botName = options.botName;
    this.avatarUrl = options.avatarUrl;
  }

  getProviderName(): string {
    return 'discord';
  }

  async sendPaymentNotification(
    params: SendPaymentNotificationParams
  ): Promise<void> {
    const { sessionId, customerId, userName, amount } = params;
    try {
      const body: Record<string, unknown> = {
        username: this.botName,
        embeds: [
          {
            title: '🎉 New Purchase',
            color: 0x4caf50,
            fields: [
              { name: 'Username', value: userName, inline: true },
              { name: 'Amount', value: `$${amount.toFixed(2)}`, inline: true },
              {
                name: 'Customer ID',
                value: `\`${customerId}\``,
                inline: false,
              },
              { name: 'Session ID', value: `\`${sessionId}\``, inline: false },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };
      if (this.avatarUrl) body.avatar_url = this.avatarUrl;
      await sendMessage(this.webhookUrl, body);
      console.log(
        `Successfully sent Discord notification for user ${userName}`
      );
    } catch (error) {
      console.error('Failed to send Discord notification:', error);
    }
  }
}
