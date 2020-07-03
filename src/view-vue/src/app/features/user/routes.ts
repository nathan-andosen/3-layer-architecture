
export const USER_ROUTES = [
  {
    path: '/user/signin',
    name: 'user-signin',
    component: () => import(/* webpackChunkName: "signin" */
      './sign-in-page/sign-in-page.component.vue'),
  },
];
