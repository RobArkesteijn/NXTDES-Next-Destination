// Central UI strings. Replaces the i18n lang files now that the site is
// English-only (see docs/MIGRATION_PLAN.md, Phase 1b). Navigation labels are
// kept here so they stay consistent across header/footer; route paths are
// written as flat literals at their call sites.
export const strings = {
  nav: {
    aboutUs: 'About Us',
    authors: 'Authors',
    blogs: 'Blogs',
    contact: 'Contact',
    countries: 'Countries',
    faq: 'Frequently Asked Questions',
    interactiveMap: 'Interactive Map',
    legalInfo: 'Legal Info',
    privacyStatement: 'Privacy Statement',
    termsAndConditions: 'Terms and Conditions',
    theGoal: 'The Goal',
    theStory: 'The Story',
  },
  home: {
    metaTitle: 'Home',
  },
  error: {
    notFound: {
      statusMessage: 'Page not found',
      message: 'The page you are looking for does not exist.',
    },
    serverError: {
      statusMessage: 'Internal Server Error',
      message: 'It seems like our servers are down. Please try again later.',
    },
  },
} as const
