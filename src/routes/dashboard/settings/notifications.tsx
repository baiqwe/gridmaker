import { SettingsPageLayout } from '@/components/dashboard/settings-page-layout';
import { NewsletterFormCard } from '@/components/settings/notification/newsletter-form-card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/settings/notifications')({
  component: NotificationsPage,
});

function NotificationsPage() {
  const breadcrumbs = [
    { label: 'Settings', isCurrentPage: false },
    { label: 'Notification', isCurrentPage: true },
  ];

  return (
    <SettingsPageLayout
      breadcrumbs={breadcrumbs}
      title="Notification"
      description="Manage your notification preferences"
    >
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NewsletterFormCard />
        </div>
      </div>
    </SettingsPageLayout>
  );
}
