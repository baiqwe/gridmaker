import { Routes } from '@/lib/routes';
import type { MenuItemConfig } from '../types';

/**
 * Footer links, grouped by section
 */
export function getFooterLinks(): MenuItemConfig[] {
  const toolItems: MenuItemConfig[] = [
    { title: 'Grid Maker', href: Routes.Root, external: false },
    {
      title: 'Instagram Grid Maker',
      href: Routes.InstagramGridMaker,
      external: false,
    },
    {
      title: 'Drawing Grid Maker',
      href: Routes.DrawingGridMaker,
      external: false,
    },
    {
      title: 'Crochet Grid Maker',
      href: Routes.CrochetGridMaker,
      external: false,
    },
    {
      title: 'Pixel Grid Maker',
      href: Routes.PixelGridMaker,
      external: false,
    },
    {
      title: 'Add Grid to Photo',
      href: Routes.AddGridToPhoto,
      external: false,
    },
    {
      title: 'Cross Stitch Grid Maker',
      href: Routes.CrossStitchGridMaker,
      external: false,
    },
  ];

  const legalItems: MenuItemConfig[] = [
    { title: 'About', href: Routes.About, external: false },
    { title: 'Privacy Policy', href: Routes.PrivacyPolicy, external: false },
    {
      title: 'Terms of Service',
      href: Routes.TermsOfService,
      external: false,
    },
    {
      title: 'Cookie Policy',
      href: Routes.CookiePolicy,
      external: false,
    },
  ];

  const languageItems: MenuItemConfig[] = [
    { title: 'Español', href: '/es', external: false },
    { title: 'Português', href: '/pt', external: false },
    { title: '日本語', href: '/ja', external: false },
    { title: '中文', href: '/zh', external: false },
  ];

  return [
    { title: 'Tools', items: toolItems },
    { title: 'Languages', items: languageItems },
    { title: 'Legal', items: legalItems },
  ];
}
