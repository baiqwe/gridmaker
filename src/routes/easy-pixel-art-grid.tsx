import { createFileRoute } from '@tanstack/react-router';
import { PixelPracticePage } from '@/components/grid-maker/pixel-practice-page';
import { practiceHead } from '@/lib/grid-maker/practice-head';

export const Route = createFileRoute('/easy-pixel-art-grid')({
  head: () => practiceHead('en'),
  component: () => <PixelPracticePage key="en" />,
});
