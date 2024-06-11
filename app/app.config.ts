export default defineAppConfig({
  ui: {
    primary: 'boston-blue',
    gray: 'shark',
    variables: {
      dark: {
        background: 'var(--color-gray-950)',
      },
      header: {
        height: '90px',
      },
    },
    icons: {
      dark: 'material-symbols:dark-mode',
      light: 'material-symbols:light-mode',
      dynamic: true,
    },
    avatar: {
      rounded: 'object-cover',
    },
    button: {
      variant: {
        solid:
          'text-copper-50 dark:text-copper-50 hover:bg-boston-blue-600 dark:bg-boston-blue-600 hover:dark:bg-boston-blue-500',
      },
    },
    header: {
      wrapper: 'lg:mb-0 lg:border-0 fixed w-full bg-background bg-background/50',
      center: 'dark:text-copper-50 text-shark-900',
      popover: {
        links: {
          active: 'dark:bg-gray-950/50',
          inactive: 'dark:hover:bg-gray-950/50',
        },
      },
      panel: {
        wrapper: 'h-[calc(100vh-var(--header-height))] top-[var(--header-height)] bg-background/75',
        body: 'p-[unset] sm:p-[unset] flex flex-col h-full',
      },
      button: {
        icon: {
          open: 'i-material-symbols-menu-rounded',
          close: 'i-material-symbols-close-rounded',
        },
      },
      links: {
        wrapper: 'gap-x-12',
        base: 'font-thermite uppercase items-stretch drop-shadow text-md hover:text-boston-blue-500',
        inactive: 'hover:text-boston-blue-500',
      },
    },
    blog: {
      list: {
        wrapper:
          'mt-[var(--header-height)] max-w-7xl p-4 sm:p-6 lg:p-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:mx-auto',
      },
    },
    navigation: {
      links: {
        wrapper: 'space-y-0',
        base: 'border-b-[1px] px-4 sm:px-6 py-5',
        active:
          'text-boston-blue-900 dark:text-boston-blue-100 border-boston-blue-900 dark:border-boston-blue-300 bg-boston-blue-400/30 backdrop-blur',
        inactive:
          'text-boston-blue-500 dark:text-boston-blue-300 border-boston-blue-700 dark:border-boston-blue-400 bg-boston-blue-50 dark:bg-gray-950',
        icon: {
          base: 'w-7 h-7',
        },
        label: 'text-xl font-thermite mt-[6px]',
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
