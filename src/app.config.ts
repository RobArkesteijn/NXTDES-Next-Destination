export default defineAppConfig({
  ui: {
    primary: 'boston-blue',
    gray: 'shark',
    variables: {
      dark: {
        background: 'var(--color-gray-950)',
      },
      header: {
        height: '10vh',
      },
    },
    icons: {
      dark: 'material-symbols:dark-mode',
      light: 'material-symbols:light-mode',
      dynamic: true,
    },
    header: {
      wrapper: 'lg:mb-0 lg:border-0',
      popover: {
        links: {
          active: 'dark:bg-gray-950/50',
          inactive: 'dark:hover:bg-gray-950/50',
        },
      },
      panel: {
        wrapper: 'bg-boston-blue-100 dark:bg-boston-blue-900',
      },
      button: {
        icon: {
          open: 'i-material-symbols-menu-rounded',
          close: 'i-material-symbols-close-rounded',
        },
      },
      links: {
        wrapper: 'gap-x-12',
        base: 'font-thermite uppercase items-stretch',
        default: {
          popover: {
            ui: {
              // width: 'w-full translate-x-[-8px]',
            },
          },
        },
      },
    },
    navigation: {
      links: {
        base: 'font-thermite',
      },
    },
    landing: {
      hero: {
        wrapper: 'flex flex-col items-center justify-center',
        title: 'hidden',
        headline: 'mb-0',
      },
    },
  },
});
