import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  getDefaultPath,
  getLocalizedPath,
  getPageSlugByLocalizedSlug,
  localeConfigs,
  locales,
  type Locale,
} from '@/lib/grid-maker/i18n';
import { toolPages } from '@/lib/grid-maker/tool-pages';
import { cn } from '@/lib/utils';
import { Link, useLocation } from '@tanstack/react-router';
import { IconLanguage } from '@tabler/icons-react';

const languageOptions = [
  { locale: 'en', label: 'English', shortLabel: 'EN' },
  ...locales.map((locale) => ({
    locale,
    label: localeConfigs[locale].name,
    shortLabel: locale.toUpperCase(),
  })),
] as const;

function getCurrentPageSlug(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (locales.includes(firstSegment as Locale)) {
    return (
      getPageSlugByLocalizedSlug(firstSegment as Locale, segments[1] ?? '') ??
      'home'
    );
  }

  return toolPages.find((page) => page.path === pathname)?.slug ?? 'home';
}

function getCurrentLocale(pathname: string) {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return locales.includes(firstSegment as Locale)
    ? (firstSegment as Locale)
    : 'en';
}

function getLanguagePath(locale: string, pageSlug: string) {
  return locale === 'en'
    ? getDefaultPath(pageSlug)
    : getLocalizedPath(locale as Locale, pageSlug);
}

export function LanguageSwitcher({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const pathname = useLocation().pathname;
  const currentLocale = getCurrentLocale(pathname);
  const currentPageSlug = getCurrentPageSlug(pathname);
  const currentOption =
    languageOptions.find((option) => option.locale === currentLocale) ??
    languageOptions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/40 hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50',
          compact && 'size-8 rounded-md px-0',
          className
        )}
        aria-label="Change language"
      >
        <IconLanguage className="size-4" aria-hidden="true" />
        {compact ? null : <span>{currentOption.shortLabel}</span>}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.locale}
            className={cn(
              'cursor-pointer text-foreground hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground',
              option.locale === currentLocale && 'font-semibold text-primary'
            )}
            render={
              <Link to={getLanguagePath(option.locale, currentPageSlug)} />
            }
          >
            <span className="min-w-7 text-xs uppercase text-muted-foreground">
              {option.shortLabel}
            </span>
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
