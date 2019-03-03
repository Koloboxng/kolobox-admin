/* eslint-disable comma-dangle */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'authenticate',
    component: () => import(/* webpackChunkName: "dashboard" */
      './views/authentication.vue'
    ),
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: () => import(/* webpackChunkName: "dashboard" */
      // eslint-disable-next-line comma-dangle
      './views/forgotPassword.vue'
    ),
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "dashboard" */ './views/App/index.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "dashboard" */
        './views/App/home.vue'
      ),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'create-admin',
      name: 'CreateAdmin',
      component: () => import(/* webpackChunkName: "admin" */
        './views/App/create-admin.vue'
      ),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'show-all-admins',
      name: 'GetAdmin',
      component: () => import(/* webpackChunkName: "admin" */
        './views/App/get-admins.vue'
      ),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'all-users',
      name: 'GetUsers',
      component: () => import(/* webpackChunkName: "users" */
        './views/App/get-users.vue'
      ),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'create-product',
      name: 'CreateProduct',
      component: () => import(/* webpackChunkName: "product" */
        './views/App/create-product.vue'
      ),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'get-products',
      name: 'GetProducts',
      component: () => import(/* webpackChunkName: "product" */
        './views/App/get-products.vue'
      ),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'get-single-product/:id',
      name: 'GetSingleProduct',
      component: () => import(/* webpackChunkName: "product" */
        './views/App/get-single-product.vue'
      ),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'move-users',
      name: 'MoveUsers',
      component: () => import(/* webpackChunkName: "product" */
        './views/App/move-users.vue'
      ),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'product-analysis',
      name: 'ProductAnalysis',
      component: () => import(/* webpackChunkName: "product" */
        './views/App/product-analysis.vue'
      ),
      meta: {
        requiresAuth: true,
      },
    },
    ],
  },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (Vue.prototype.$auth.authenticated) next();
    else next('/');
  } else if (Vue.prototype.$auth.authenticated) next('/index/home');
  else next();
});

export default router;
