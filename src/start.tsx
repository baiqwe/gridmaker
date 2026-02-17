import { createStart } from '@tanstack/react-start';

declare module '@tanstack/react-start' {
  interface Register {
    server: {
      requestContext: {
        fromFetch: boolean;
      };
    };
  }
}

export const startInstance = createStart(() => {
  console.log('create startInstance');
  return {
    defaultSsr: true,
  };
});

startInstance.createMiddleware().server(({ next }) => {
  console.log('create middleware from startInstance');
  return next({
    context: {
      fromStartInstanceMw: true,
    },
  });
});
