export const getMenuData: any[] = [
  // {
  //   category: true,
  //   title: 'Dashboards',
  // },

  // {
  //   title: 'Dashboards',
  //   key: 'dashboards',
  //   icon: 'fe fe-home',
  //   // roles: ['admin'], // set user roles with access to this route
  //   count: 4,
  //   children: [
  //     {
  //       title: 'Dashboard Alpha',
  //       key: 'dashboard',
  //       url: '/dashboard/alpha',
  //     },
  //     {
  //       title: 'Dashboard Beta',
  //       key: 'dashboardBeta',
  //       url: '/dashboard/beta',
  //     },
  //     {
  //       title: 'Dashboard Gamma',
  //       key: 'dashboardGamma',
  //       url: '/dashboard/gamma',
  //     },
  //     {
  //       title: 'Crypto Terminal',
  //       key: 'dashboardCrypto',
  //       url: '/dashboard/crypto',
  //     },
  //   ],
  // },
  {
    category: true,
    title: '',
  },
  {
    title: 'Sell',
    key: 'Sell',
    icon: 'fe fe-shopping-cart',
    // roles: ['admin'],
    url: '/apps/order',
  },
  {
    title: 'Receipts',
    key: 'Receipt',
    icon: 'fe fe-dollar-sign',
    url: '/apps/receipt',
  },
  {
    title: 'Customers',
    key: 'Customers',
    icon: 'fe fe-users',
    url: '/apps/customer',
  },
  // {
  //   title: 'Expenses',
  //   key: 'Expenses',
  //   icon: 'fe fe-package',
  //   url: '/apps/expenses',
  // },
  {
    title: 'Price Book',
    key: 'book',
    icon: 'fe fe-book-open',
    url: '/apps/pricebook',
  },
  {
    title: 'UrbanPiper Hub',
    key: 'book',
    icon: 'fe fe-underline',
    url: '/apps/urbanpiper',
  },
  // {
  //   title: 'Apps',
  //   key: 'apps',
  //   icon: 'fe fe-database',
  //   children: [
  //     {
  //       title: 'Profile',
  //       key: 'appsProfile',
  //       url: '/apps/profile',
  //     },
  //     {
  //       title: 'Calendar',
  //       key: 'appsCalendar',
  //       url: '/apps/calendar',
  //     },
  //     {
  //       title: 'Gallery',
  //       key: 'appsGallery',
  //       url: '/apps/gallery',
  //     },
  //     {
  //       title: 'Messaging',
  //       key: 'appsCart',
  //       url: '/apps/messaging',
  //     },
  // {
  //   title: 'Mail',
  //   key: 'appsMail',
  //   url: '/apps/mail',
  // },
  //     // {
  //     //   title: 'Sell',
  //     //   key: 'Sell',
  //     //   url: '/apps/order',
  //     // },
  //     // {
  //     //   title: 'Receipts',
  //     //   key: 'Receipt',
  //     //   url: '/apps/receipt',
  //     // },
  //     // {
  //     //   title: 'Customers',
  //     //   key: 'Customers',
  //     //   url: '/apps/customer',
  //     // },
  //     // {
  //     //   title: 'Expenses',
  //     //   key: 'Expenses',
  //     //   url: '/apps/expenses',
  //     // },
  //     // {
  //     //   title: 'Price Book',
  //     //   key: 'book',
  //     //   url: '/apps/pricebook',
  //     // },
  //     // {
  //     //   title: 'UrbanPiper Hub',
  //     //   key: 'book',
  //     //   url: '/apps/urbanpiper',
  //     // },

  //   ],
  // },
  // {
  //   title: 'Extra Apps',
  //   key: 'extraApps',
  //   icon: 'fe fe-hard-drive',
  //   children: [
  //     // {
  //     //   title: 'Settings',
  //     //   key: 'setting',
  //     //   url: '/apps/setting',
  //     // },
  //     // {
  //     //   title: 'Updater',
  //     //   key: 'Update',
  //     //   url: '/apps/updater',
  //     // },
  //     {
  //       title: 'Github Explore',
  //       key: 'extraAppsGithubExplore',
  //       url: '/apps/github-explore',
  //     },
  //     {
  //       title: 'Github Discuss',
  //       key: 'extraAppsGithubDiscuss',
  //       url: '/apps/github-discuss',
  //     },
  //     {
  //       title: 'Digitalocean Droplets',
  //       key: 'extraAppsDigitaloceanDroplets',
  //       url: '/apps/digitalocean-droplets',
  //     },
  //     {
  //       title: 'Digitalocean Create',
  //       key: 'extraAppsDigitaloceanCreate',
  //       url: '/apps/digitalocean-create',
  //     },
  //     {
  //       title: 'Google Analytics',
  //       key: 'extraAppsGoogleAnalytis',
  //       url: '/apps/google-analytics',
  //     },
  //     {
  //       title: 'Wordpress Post',
  //       key: 'extraAppsWordpressPost',
  //       url: '/apps/wordpress-post',
  //     },
  //     {
  //       title: 'Wordpress Posts',
  //       key: 'extraAppsWordpressPosts',
  //       url: '/apps/wordpress-posts',
  //     },
  //     {
  //       title: 'Wordpress Add',
  //       key: 'extraAppsWordpressAdd',
  //       url: '/apps/wordpress-add',
  //     },
  //     {
  //       title: 'Todoist List',
  //       key: 'extraAppsTodoistList',
  //       url: '/apps/todoist-list',
  //     },
  //     {
  //       title: 'Jira Dashboard',
  //       key: 'extraAppsJiraDashboard',
  //       url: '/apps/jira-dashboard',
  //     },
  //     {
  //       title: 'Jira Agile Board',
  //       key: 'extraAppsJiraAgileBoard',
  //       url: '/apps/jira-agile-board',
  //     },
  //     {
  //       title: 'Helpdesk Dashboard',
  //       key: 'extraAppsHelpdeskDashboard',
  //       url: '/apps/helpdesk-dashboard',
  //     },

  //   ],
  // },
  // {
  //   title: 'Ecommerce',
  //   key: 'ecommerce',
  //   icon: 'fe fe-shopping-cart',
  //   children: [
  //     {
  //       title: 'Dashboard',
  //       key: 'ecommerceDashboard',
  //       url: '/ecommerce/dashboard',
  //     },
  //     {
  //       title: 'Orders',
  //       key: 'ecommerceOrders',
  //       url: '/ecommerce/orders',
  //     },
  //     {
  //       title: 'Propduct Catalog',
  //       key: 'ecommerceProductCatalog',
  //       url: '/ecommerce/product-catalog',
  //     },
  //     {
  //       title: 'Product Details',
  //       key: 'ecommerceProductDetails',
  //       url: '/ecommerce/product-details',
  //     },
  //     {
  //       title: 'Cart',
  //       key: 'ecommerceCart',
  //       url: '/ecommerce/cart',
  //     },
  //   ],
  // },
  // {
  //   title: 'Auth Pages',
  //   key: 'auth',
  //   icon: 'fe fe-user',
  //   children: [
  //     {
  //       title: 'Login',
  //       key: 'authLogin',
  //       url: '/auth/login',
  //     },
  //     {
  //       title: 'Forgot Password',
  //       key: 'authForgotPassword',
  //       url: '/auth/forgot-password',
  //     },
  //     {
  //       title: 'Register',
  //       key: 'authRegister',
  //       url: '/auth/register',
  //     },
  //     {
  //       title: 'Lockscreen',
  //       key: 'authLockscreen',
  //       url: '/auth/lockscreen',
  //     },
  //     {
  //       title: 'Page 404',
  //       key: 'auth404',
  //       url: '/auth/404',
  //     },
  //     {
  //       title: 'Page 500',
  //       key: 'auth500',
  //       url: '/auth/500',
  //     },
  //   ],
  // },
  {
    category: true,
    title: '',
  },

  {
    title: 'Settings',
    key: 'setting',
    icon: 'icmn-cog',
    url: '/apps/setting',
  },
  // {
  //   title: 'Updater',
  //   key: 'Update',
  //   icon: 'fe fe-download-cloud',
  //   url: '/apps/updater',
  // },

  {
    title: 'Reports',
    key: 'Report',
    icon: 'fe fe-file-text',
    children: [
      {
        title: 'Support Chat',
        key: 'authLogin',
        url: '/apps/report',
      },
      {
        title: 'Issue History',
        key: 'appsMail',
        url: '/apps/mail',
      },
    ],
  },

  {
    title: 'AboutUs',
    key: 'Update',
    icon: 'fe fe-alert-octagon',
    url: '/apps/aboutus',
  },

  {
    title: 'Ant Design',
    key: 'antDesign',
    icon: 'fe fe-bookmark',
    url: '/ui-kits/antd',
  },
  {
    title: 'Bootstrap',
    key: 'bootstrap',
    icon: 'fe fe-bookmark',
    url: '/ui-kits/bootstrap',
  },
  // {
  //   category: true,
  //   title: 'Components',
  // },
  // {
  //   title: 'Widgets',
  //   key: 'widgets',
  //   icon: 'fe fe-image',
  //   count: 47,
  //   children: [
  //     {
  //       title: 'General',
  //       key: 'widgetsGeneral',
  //       url: '/widgets/general',
  //     },
  //     {
  //       title: 'Lists',
  //       key: 'widgetsLists',
  //       url: '/widgets/lists',
  //     },
  //     {
  //       title: 'Tables',
  //       key: 'widgetsTables',
  //       url: '/widgets/tables',
  //     },
  //     {
  //       title: 'Charts',
  //       key: 'widgetsCharts',
  //       url: '/widgets/charts',
  //     },
  //   ],
  // },
  // {
  //   title: 'Cards',
  //   key: 'cards',
  //   icon: 'fe fe-credit-card',
  //   children: [
  //     {
  //       title: 'Basic Cards',
  //       key: 'cardsBasicCards',
  //       url: '/cards/basic-cards',
  //     },
  //     {
  //       title: 'Tabbed Cards',
  //       key: 'cardsTabbedCards',
  //       url: '/cards/tabbed-cards',
  //     },
  //   ],
  // },
  {
    title: 'Tables',
    key: 'tables',
    icon: 'fe fe-grid',
    children: [
      {
        title: 'Ant Design',
        key: 'tablesAntd',
        url: '/tables/antd',
      },
      {
        title: 'Bootstrap',
        key: 'tablesBootstrap',
        url: '/tables/bootstrap',
      },
    ],
  },
  // {
  //   title: 'Charts',
  //   key: 'charts',
  //   icon: 'fe fe-pie-chart',
  //   children: [
  //     {
  //       title: 'Chartist.js',
  //       key: 'chartsChartistjs',
  //       url: '/charts/chartistjs',
  //     },
  //     {
  //       title: 'Chart.js',
  //       key: 'chartsChartjs',
  //       url: '/charts/chartjs',
  //     },
  //     {
  //       title: 'C3',
  //       key: 'chartsC3',
  //       url: '/charts/c3',
  //     },
  //   ],
  // },
  {
    title: 'Icons',
    key: 'icons',
    icon: 'fe fe-star',
    children: [
      {
        title: 'Feather Icons',
        key: 'iconsFeatherIcons',
        url: '/icons/feather-icons',
      },
      {
        title: 'Fontawesome',
        key: 'iconsFontawesome',
        url: '/icons/fontawesome',
      },
      {
        title: 'Linearicons Free',
        key: 'iconsLineariconsFree',
        url: '/icons/linearicons-free',
      },
      {
        title: 'Icomoon Free',
        key: 'iconsIcomoonFree',
        url: '/icons/icomoon-free',
      },
    ],
  },
  // {
  //   category: true,
  //   title: 'Advanced',
  // },
  // {
  //   title: 'Form Examples',
  //   key: 'formExamples',
  //   icon: 'fe fe-menu',
  //   url: '/advanced/form-examples',
  // },
  // {
  //   title: 'Email Templates',
  //   key: 'emailTemplates',
  //   icon: 'fe fe-mail',
  //   url: '/advanced/email-templates',
  // },
  // {
  //   title: 'Pricing Tables',
  //   key: 'pricingTables',
  //   icon: 'fe fe-command',
  //   url: '/advanced/pricing-tables',
  // },
  // {
  //   title: 'Invoice',
  //   key: 'invoice',
  //   icon: 'fe fe-file-text',
  //   url: '/advanced/invoice',
  // },
  // {
  //   title: 'Utilities',
  //   key: 'utilities',
  //   icon: 'fe fe-inbox',
  //   url: '/advanced/utilities',
  // },
  // {
  //   title: 'Grid',
  //   key: 'grid',
  //   icon: 'fe fe-grid',
  //   url: '/advanced/grid',
  // },
  // {
  //   title: 'Typography',
  //   key: 'typography',
  //   icon: 'fe fe-type',
  //   url: '/advanced/typography',
  // },
  // {
  //   title: 'Colors',
  //   key: 'colors',
  //   icon: 'fe fe-feather',
  //   url: '/advanced/colors',
  // },
  // {
  //   title: 'Nested Items',
  //   key: 'nestedItem1',
  //   icon: 'fe fe-layers',
  //   children: [
  //     {
  //       title: 'Nested Item 1-1',
  //       key: 'nestedItem1-1',
  //       children: [
  //         {
  //           title: 'Nested Item 1-1-1',
  //           key: 'nestedItem1-1-1',
  //         },
  //         {
  //           title: 'Nested Items 1-1-2',
  //           key: 'nestedItem1-1-2',
  //           disabled: true,
  //         },
  //       ],
  //     },
  //     {
  //       title: 'Nested Items 1-2',
  //       key: 'nestedItem1-2',
  //     },
  //   ],
  // },
  // {
  //   title: 'Disabled Item',
  //   key: 'disabledItem',
  //   icon: 'fe fe-slash',
  //   disabled: true,
  // },
]
