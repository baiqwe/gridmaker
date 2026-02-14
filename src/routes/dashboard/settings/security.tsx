import { SettingsPageLayout } from '@/components/dashboard/settings-page-layout';
import { DeleteAccountCard } from '@/components/settings/security/delete-account-card';
import { PasswordCardWrapper } from '@/components/settings/security/password-card-wrapper';
import { websiteConfig } from '@/config/website';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/settings/security')({
  component: SecurityPage,
});

function SecurityPage() {
  const breadcrumbs = [
    { label: 'Settings', isCurrentPage: false },
    { label: 'Security', isCurrentPage: true },
  ];
  const credentialLoginEnabled = websiteConfig.auth?.enableCredentialLogin ?? true;

  return (
    <SettingsPageLayout
      breadcrumbs={breadcrumbs}
      title="Security"
      description="Manage your security settings"
    >
      <div className="flex flex-col gap-8">
        {credentialLoginEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PasswordCardWrapper />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DeleteAccountCard />
        </div>
      </div>
    </SettingsPageLayout>
  );
}
