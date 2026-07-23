/**
 * Fixed English URL paths — never derive these from t() / translated labels.
 * Menu labels may be localized; hrefs stay constant.
 */
export const APP_ROUTES = {
  home: '/',
  community: '/community',
  support: '/support',
  share: '/share',
  userProfile: '/user-profile',
  premium: '/premium',
  pointsShop: '/points-shop',
  terms: '/terms',
  privacy: '/privacy',
} as const

export type AppRoutePath = (typeof APP_ROUTES)[keyof typeof APP_ROUTES]
