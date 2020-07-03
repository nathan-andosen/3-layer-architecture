import Vue from 'vue';
import VueRouter from 'vue-router';
import { USER_ROUTES } from '@features/user/routes';


Vue.use(VueRouter);

const routes: any[] = [
  { path: '/', redirect: '/user/signin' },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: Home,
  // },
  // {
  //   path: '/user/signin',
  //   name: 'user-signin',
  //   component: SignInPageComponent,
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(
  //     /* webpackChunkName: "about" */
  //     '../../../views/About.vue'),
  // },
];

routes.push(...USER_ROUTES);

const router = new VueRouter({
  routes,
});

export default router;
