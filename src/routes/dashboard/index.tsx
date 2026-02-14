import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { SectionCards } from '@/components/dashboard/section-cards';
import { messages } from '@/config/messages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardPage,
});

function DashboardPage() {
  const breadcrumbs = [
    {
      label: messages.dashboard.title,
      isCurrentPage: true,
    },
  ];

  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
          </div>
        </div>
      </div>
    </>
  );
}
