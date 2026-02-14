import { AuthCard } from '@/components/auth/auth-card';
import { messages } from '@/config/messages';
import { Routes } from '@/routes';
import { IconAlertTriangle } from '@tabler/icons-react';

const m = messages.auth.error;

export function ErrorCard() {
  return (
    <AuthCard
      headerLabel={m.title}
      bottomButtonHref={Routes.Login}
      bottomButtonLabel={m.backToLogin}
      className="border-none"
    >
      <div className="w-full flex justify-center items-center py-4 gap-2">
        <IconAlertTriangle className="text-destructive size-4" />
        <p className="font-medium text-destructive">{m.tryAgain}</p>
      </div>
    </AuthCard>
  );
}
