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
    breadcrumb: {
      wrapper: 'pt-4 md:pt-6 lg:pt-12',
      ol: 'justify-center',
      li: 'text-md lg:text-xl',
      default: {
        divider: 'i-material-symbols-chevron-right',
      },
    },
    header: {
      wrapper: 'lg:mb-0 lg:border-0 fixed w-full bg-background/50 dark:bg-background/50',
      popover: {
        links: {
          wrapper: 'grid grid-cols-4 p-4 gap-2 space-y-0',
          base: 'px-3 py-2 items-center',
          active: 'dark:bg-gray-950/50',
          inactive: 'dark:hover:bg-gray-950/50',
          label: 'text-md dark:text-copper-50 text-shark-950',
          icon: {
            base: 'w-6 h-6 m-0',
          },
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
        wrapper: 'gap-x-12 hidden lg:flex',
        base: 'font-thermite dark:text-copper-50 text-shark-900 uppercase items-stretch drop-shadow text-md hover:text-boston-blue-500',
        inactive: 'hover:text-boston-blue-500',
        default: {
          popover: {
            ui: {
              width: 'auto',
              base: 'overflow-visible',
              ring: 'ring-2 ring-boston-blue-800 dark:ring-boston-blue-200',
              background: 'bg-boston-blue-200/95 dark:bg-boston-blue-800/95 backdrop-blur',
            },
          },
        },
      },
    },
    blog: {
      list: {
        wrapper:
          'mt-[var(--header-height)] max-w-7xl gap-y-8 p-4 sm:p-6 lg:p-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:mx-auto',
      },
    },
    navigation: {
      tree: {
        wrapper: 'space-y-0 ml-0',
        accordion: {
          wrapper: 'space-y-0',
          container: 'space-y-0',
          button: {
            base: 'border-b-[1px] px-4 sm:px-6 py-5',
            active:
            'text-boston-blue-900 dark:text-boston-blue-100 border-boston-blue-900 dark:border-boston-blue-300 bg-boston-blue-400/30 backdrop-blur',
            inactive:
            'text-shark-900 dark:text-copper-50 border-boston-blue-700 dark:border-boston-blue-400 bg-boston-blue-50 dark:bg-gray-950',
            icon: {
              base: 'w-7 h-7 text-boston-blue-500',
            },
            label: 'text-xl font-thermite mt-[6px]',
            trailingIcon: {
              name: 'i-mdi-chevron-down',
              base: 'w-7 h-7',
            },
          },
          tree: 'ml-0 border-none',
        },
        links: {
          wrapper: 'space-y-0 ml-0',
          wrapperLevel: 'space-y-0 ml-0',
          base: 'border-b-[1px] px-4 sm:px-6 py-5',
          active:
            'text-boston-blue-900 dark:text-boston-blue-100 border-boston-blue-900 dark:border-boston-blue-300 bg-boston-blue-400/30 backdrop-blur',
          inactive:
            'text-shark-900 dark:text-copper-50 border-boston-blue-700 dark:border-boston-blue-400 bg-boston-blue-50 dark:bg-gray-950',
          icon: {
            base: 'w-7 h-7 text-boston-blue-500',
          },
          label: 'text-xl font-thermite mt-[6px]',
        },
      },
    },
    landing: {
      hero: {
        wrapper: 'p-0 sm:p-0 md:p-0 m-0',
        container: 'h-full p-0 sm:p-0 md:p-0 lg:p-0 m-0 gap-0 sm:gap-0 max-w-full',
        title: 'hidden',
        base: '',
        headline: 'absolute inset-0 mb-0',
      },
    },
  },
})
