/* eslint-disable comma-dangle */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'authenticate',
      component: () => import(/* webpackChunkName: "dashboard" */
        './views/authentication.vue'
      ),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "dashboard" */
        './views/account.vue'
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
      children: [
        {
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
          path: 'credit-account',
          name: 'CreditAccount',
          component: () => import(/* webpackChunkName: "admin" */
            './views/App/credit-user-acct.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'debit-account',
          name: 'DebititAccount',
          component: () => import(/* webpackChunkName: "admin" */
            './views/App/debit-user-acct.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'login-details',
          name: 'LoginDetails',
          component: () => import(/* webpackChunkName: "admin" */
            './views/App/get-all-login-details.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'documentation',
          name: 'Documentation',
          component: () => import(/* webpackChunkName: "dashboard" */
            './views/App/documentation.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'all-roles',
          name: 'GetRoles',
          component: () => import(/* webpackChunkName: "users" */
            './views/App/get-all-roles.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'create-role',
          name: 'CreateRole',
          component: () => import(/* webpackChunkName: "users" */
            './views/App/create-role.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'create-permission',
          name: 'CreatePermission',
          component: () => import(/* webpackChunkName: "users" */
            './views/App/create-permission.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'all-permissions',
          name: 'GetPermissions',
          component: () => import(/* webpackChunkName: "users" */
            './views/App/get-all-permissions.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'get-single-role-details/:id',
          name: 'GetSingleRoleDetails',
          component: () => import(/* webpackChunkName: "users" */
            './views/App/get-single-role-details.vue'
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
          path: 'create-investment-approach',
          name: 'CreateInvestmentApproach',
          component: () => import(/* webpackChunkName: "product" */
            './views/App/create-investment-approach.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'get-investment-approaches',
          name: 'GetInvestmentApproaches',
          component: () => import(/* webpackChunkName: "product" */
            './views/App/get-investment-approaches.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'create-product-category',
          name: 'CreatProductCategory',
          component: () => import(/* webpackChunkName: "product" */
            './views/App/create-product-category.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'get-product-categories',
          name: 'GetProductCategories',
          component: () => import(/* webpackChunkName: "product" */
            './views/App/get-product-categories.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'get-selfmanaged-products',
          name: 'GetSelfManagedProducts',
          component: () => import(/* webpackChunkName: "product" */
            './views/App/get-self-managed-products.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'get-single-user/:id',
          name: 'GetSingleUser',
          component: () => import(/* webpackChunkName: "users" */
            './views/App/get-single-user.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'get-group-product',
          name: 'GetAllGroups',
          component: () => import(/* webpackChunkName: "users" */
            './views/App/all-group-products.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'otp-handler',
          name: 'OtpHandler',
          component: () => import(/* webpackChunkName: "users" */
            './views/App/otp-handler.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'all-transactions',
          name: 'GetAllTransactions',
          component: () => import(/* webpackChunkName: "users" */
            './views/App/get-all-transactions.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'update-password',
          name: 'UpdatePassword',
          component: () => import(/* webpackChunkName: "users" */
            './views/App/update-password.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'paystack-callback',
          name: 'PaystackCallback',
          component: () => import(/* webpackChunkName: "users" */
            './views/App/paystack-callback.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'withdrawal-details',
          name: 'WithdrawalDetails',
          component: () => import(/* webpackChunkName: "admin" */
            './views/App/get-all-withdrawal-details.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'all-referrals',
          name: 'AllReferrals',
          component: () => import(/* webpackChunkName: "referrrals" */
            './views/App/get-all-referrals.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'all-subscriptions',
          name: 'AllSubscriptions',
          component: () => import(/* webpackChunkName: "subscriptions" */
            './views/App/get-all-subscriptions.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'all-user-products',
          name: 'AllUserProducts',
          component: () => import(/* webpackChunkName: "subscriptions" */
            './views/App/get-all-user-products.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'get-single-group/:id',
          name: 'GetSingleGroup',
          component: () => import(/* webpackChunkName: "users" */
            './views/App/get-single-group.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'all-funded-user-products',
          name: 'AllFundedUserProducts',
          component: () => import(/* webpackChunkName: "subscriptions" */
            './views/App/get-all-user-funded-products.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'all-unfunded-user-products',
          name: 'AllUnFundedUserProducts',
          component: () => import(/* webpackChunkName: "subscriptions" */
            './views/App/get-all-user-unfunded-products.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'product-earnings',
          name: 'ProductsEarnings',
          component: () => import(/* webpackChunkName: "subscriptions" */
            './views/App/product-earnings.vue'
          ),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'failed-subscriptions',
          name: 'AllFailedSubscriptions',
          component: () => import(/* webpackChunkName: "subscriptions" */
            './views/App/get-failed-subscriptions.vue'
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
