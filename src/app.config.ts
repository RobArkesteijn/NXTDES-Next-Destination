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
    header: {
      wrapper: 'lg:mb-0 lg:border-0 fixed w-full bg-background/50',
      popover: {
        links: {
          active: 'dark:bg-gray-950/50',
          inactive: 'dark:hover:bg-gray-950/50',
        },
      },
      panel: {
        wrapper: 'h-[calc(100vh-var(--header-height))] top-[var(--header-height)]',
      },
      button: {
        icon: {
          open: 'i-material-symbols-menu-rounded',
          close: 'i-material-symbols-close-rounded',
        },
      },
      links: {
        wrapper: 'gap-x-12',
        base: 'font-thermite uppercase items-stretch drop-shadow text-md',
      },
    },
    blog: {
      list: {
        wrapper:
          'mt-[var(--header-height)] max-w-7xl p-4 sm:p-6 lg:p-8 md:grid md:grid-cols-2 md:mx-auto',
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
