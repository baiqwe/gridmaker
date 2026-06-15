import { Routes } from '@/lib/routes';
import {
  IconBuilding,
  IconCookie,
  IconFileText,
  IconGridDots,
  IconGrid3x3,
  IconNeedleThread,
  IconPencil,
  IconPhotoDown,
  IconShieldCheck,
} from '@tabler/icons-react';
import type { MenuItemConfig } from '../types';

/**
 * Navbar links
 */
export function getNavbarLinks(): MenuItemConfig[] {
  return [
    { title: 'Grid Maker', href: Routes.Root, external: false },
    {
      title: 'Tools',
      items: [
        {
          title: 'Instagram Grid Maker',
          description: 'Split photos into 3x3 and carousel-ready tiles.',
          href: Routes.InstagramGridMaker,
          icon: IconPhotoDown,
          external: false,
        },
        {
          title: 'Drawing Grid Maker',
          description: 'Add adjustable grid lines for drawing references.',
          href: Routes.DrawingGridMaker,
          icon: IconPencil,
          external: false,
        },
        {
          title: 'Crochet Grid Maker',
          description: 'Create dense grids for crochet and craft patterns.',
          href: Routes.CrochetGridMaker,
          icon: IconNeedleThread,
          external: false,
        },
        {
          title: 'Pixel Grid Maker',
          description: 'Pixelate an image and preview a clean grid.',
          href: Routes.PixelGridMaker,
          icon: IconGridDots,
          external: false,
        },
      ],
    },
    {
      title: 'Trust',
      items: [
        {
          title: 'No Uploads',
          description: 'Images stay in your browser while you edit.',
          href: Routes.Root,
          icon: IconGrid3x3,
          external: false,
        },
        {
          title: 'About Grid Maker',
          description: 'Why this private browser-based tool exists.',
          href: Routes.About,
          icon: IconBuilding,
          external: false,
        },
        {
          title: 'Privacy Policy',
          description: 'How this browser-based tool treats your data.',
          href: Routes.PrivacyPolicy,
          icon: IconShieldCheck,
          external: false,
        },
        {
          title: 'Terms of Service',
          description: 'Simple rules for using Grid Maker.',
          href: Routes.TermsOfService,
          icon: IconFileText,
          external: false,
        },
        {
          title: 'Cookie Policy',
          description: 'Cookie and analytics details.',
          href: Routes.CookiePolicy,
          icon: IconCookie,
          external: false,
        },
      ],
    },
  ];
}
