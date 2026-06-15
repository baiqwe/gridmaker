import { ToolPage } from '@/components/grid-maker/tool-page';
import { toolRouteHead } from '@/lib/grid-maker/route-head';
import { getToolPageByPath } from '@/lib/grid-maker/tool-pages';
import { Routes } from '@/lib/routes';
import { createFileRoute } from '@tanstack/react-router';

const page = getToolPageByPath(Routes.CrochetGridMaker);

export const Route = createFileRoute('/crochet-grid-maker')({
  head: () => toolRouteHead(page),
  component: () => <ToolPage page={page} />,
});
