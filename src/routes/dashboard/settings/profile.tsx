import { SettingsPageLayout } from '@/components/dashboard/settings-page-layout';
import { UpdateAvatarCard } from '@/components/settings/profile/update-avatar-card';
import { UpdateNameCard } from '@/components/settings/profile/update-name-card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/settings/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  const breadcrumbs = [
    { label: 'Settings', isCurrentPage: false },
    { label: 'Profile', isCurrentPage: true },
  ];

  return (
    <SettingsPageLayout
      breadcrumbs={breadcrumbs}
      title="Profile"
      description="Manage your account information"
    >
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UpdateNameCard />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UpdateAvatarCard />
        </div>
      </div>
    </SettingsPageLayout>
  );
}
