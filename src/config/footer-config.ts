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
    { title: 'Contact', href: Routes.Contact, external: false },
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

  return [
    { title: 'Tools', items: toolItems },
    { title: 'Legal', items: legalItems },
  ];
}
