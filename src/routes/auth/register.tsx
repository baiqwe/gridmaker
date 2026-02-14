import { createFileRoute, Link } from '@tanstack/react-router';
import { RegisterForm } from '@/components/auth/register-form';
import { messages } from '@/config/messages';
import { Routes } from '@/routes';

const m = messages.auth.register;
const authCommon = messages.auth.common;

export const Route = createFileRoute('/auth/register')({
  component: RegisterPage,
  head: () => ({
    meta: [{ title: m.title }, { name: 'description', content: m.description }],
  }),
});

function RegisterPage() {
  return (
    <div className="flex flex-col gap-4">
      <RegisterForm />
      <div className="text-balance text-center text-xs text-muted-foreground">
        {authCommon.byClickingContinue}
        <Link
          to={Routes.TermsOfService}
          className="underline underline-offset-4 hover:text-primary"
        >
          {authCommon.termsOfService}
        </Link>
        {authCommon.and}
        <Link
          to={Routes.PrivacyPolicy}
          className="underline underline-offset-4 hover:text-primary"
        >
          {authCommon.privacyPolicy}
        </Link>
      </div>
    </div>
  );
}
