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
        base: 'font-thermite uppercase items-stretch drop-shadow',
      },
    },
    blog: {
      post: {
        wrapper: 'h-screen gap-y-4 sm:gap-y-6 lg:gap-y-8',
        image: {
          wrapper: 'h-full ring-0 rounded-none shapedivider shapedivider--bottom',
        },
        container: 'max-w-7xl px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 mx-auto',
        authors: {
          avatar: {
            size: 'md',
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
