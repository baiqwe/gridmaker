import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { Analytics } from '@/components/analytics/analytics';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { NotFound } from '@/components/layout/not-found';
import { websiteConfig } from '@/config/website';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';
import appCss from '../styles.css?url';

/** Marketing pages: Navbar + main + Footer. Dashboard: full-screen app shell only. */
function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname }) ?? '';
  const isDashboard = pathname.startsWith('/dashboard');

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar scroll />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

const DEFAULT_THEME = websiteConfig.ui?.mode?.defaultMode ?? 'system';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'MkFast - Make AI SaaS in days',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-default-theme={DEFAULT_THEME}
      className={DEFAULT_THEME === 'dark' ? 'dark' : undefined}
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
      </head>
      <body>
        <Analytics>
          <ThemeProvider>
            <RootLayout>{children}</RootLayout>
          </ThemeProvider>
          {/* <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          /> */}
          <Scripts />
        </Analytics>
      </body>
    </html>
  );
}
