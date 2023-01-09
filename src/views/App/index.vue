<template>
  <v-app>
    <v-toolbar color="blue darken-2" flat clipped-left>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click="showNav = !showNav"></v-toolbar-side-icon>
      <v-flex>
        <router-link to="/index/home">
          <v-img :src="require('../../assets/logo.png')" alt="logo" height="54px" width="150px"></v-img>
        </router-link>
      </v-flex>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Welcome, {{email}}</v-btn>
        <v-btn flat @click="logOut()">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container fluid>
      <v-layout row>
        <v-flex xs2>
          <v-navigation-drawer stateless value="showNav" dark>
            <v-list>
              <v-list-group prepend-icon="home" value="true">
                <v-list-tile slot="activator">
                  <v-list-tile-title>Admin</v-list-tile-title>
                </v-list-tile>

                <v-list-tile v-for="(admin,index) in Admins" :key="index">
                  <v-list-tile-title>
                    <router-link class="link" :to="admin.route">{{admin.name}}</router-link>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list-group>

              <v-list-group prepend-icon="folder_open" value="true">
                <v-list-tile slot="activator">
                  <v-list-tile-title>Users</v-list-tile-title>
                </v-list-tile>

                <v-list-tile v-for="(user,index) in users" :key="index">
                  <v-list-tile-title>
                    <router-link class="link" :to="user.route">{{user.name}}</router-link>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list-group>

              <v-list-group prepend-icon="widgets" value="true">
                <v-list-tile slot="activator">
                  <v-list-tile-title>Products</v-list-tile-title>
                </v-list-tile>

                <v-list-tile v-for="(product,index) in products" :key="index">
                  <v-list-tile-title>
                    <router-link class="link" :to="product.route">{{product.name}}</router-link>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list-group>

              <v-list-group prepend-icon="widgets" value="true">
                <v-list-tile slot="activator">
                  <v-list-tile-title>Groups</v-list-tile-title>
                </v-list-tile>

                <v-list-tile v-for="(group,index) in groups" :key="index">
                  <v-list-tile-title>
                    <router-link class="link" :to="group.route">{{group.name}}</router-link>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list-group>

              <v-list-group prepend-icon="widgets" value="true">
                <v-list-tile slot="activator">
                  <v-list-tile-title>Withdrawal</v-list-tile-title>
                </v-list-tile>

                <v-list-tile v-for="(withdraw,index) in withdrawals" :key="index">
                  <v-list-tile-title>
                    <router-link class="link" :to="withdraw.route">{{withdraw.name}}</router-link>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list-group>

              <v-list-group prepend-icon="widgets" value="true">
                <v-list-tile slot="activator">
                  <v-list-tile-title>Referrals</v-list-tile-title>
                </v-list-tile>

                <v-list-tile v-for="(referral,index) in referrals" :key="index">
                  <v-list-tile-title>
                    <router-link class="link" :to="referral.route">{{referral.name}}</router-link>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list-group>

              <v-list-group prepend-icon="widgets" value="true">
                <v-list-tile slot="activator">
                  <v-list-tile-title>Subscriptions</v-list-tile-title>
                </v-list-tile>

                <v-list-tile v-for="(subscription,index) in subscriptions" :key="index">
                  <v-list-tile-title>
                    <router-link class="link" :to="subscription.route">{{subscription.name}}</router-link>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list-group>

              <v-list-group prepend-icon="settings" value="true">
                <v-list-tile slot="activator">
                  <v-list-tile-title>Settings</v-list-tile-title>
                </v-list-tile>

                <v-list-tile v-for="(setting,index) in settings" :key="index">
                  <v-list-tile-title>
                    <router-link class="link" :to="setting.route">{{setting.name}}</router-link>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list-group>

              <v-list-group prepend-icon="money" value="true">
                <v-list-tile slot="activator">
                  <v-list-tile-title>Paystack</v-list-tile-title>
                </v-list-tile>

                <v-list-tile v-for="(paystack,index) in paystack" :key="index">
                  <v-list-tile-title>
                    <router-link class="link" :to="paystack.route">{{paystack.name}}</router-link>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list-group>

              <v-list-group prepend-icon="money" value="true">
                <v-list-tile slot="activator">
                  <v-list-tile-title>Documentation</v-list-tile-title>
                </v-list-tile>

                <v-list-tile v-for="(item,index) in documentation" :key="index">
                  <v-list-tile-title>
                    <router-link class="link" :to="item.route">{{item.name}}</router-link>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list-group>
            </v-list>
          </v-navigation-drawer>
        </v-flex>
        <v-flex xs10>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    showNav: false,
    Admins: [
      { name: 'Create Role', route: '/index/create-role' },
      { name: 'Show All Roles', route: '/index/all-roles' },
      { name: 'Create Permission', route: '/index/create-permission' },
      { name: 'Show All Permissions', route: '/index/all-permissions' },
      { name: 'Create Admin', route: '/index/create-admin' },
      { name: 'Show All Admins', route: '/index/show-all-admins' },
    ],
    referrals: [{ name: 'All Referrals', route: '/index/all-referrals' }],
    subscriptions: [
      { name: 'All Subscriptions', route: '/index/all-subscriptions' },
      { name: 'Failed Subscriptions', route: '/index/failed-subscriptions' },
    ],
    users: [
      { name: 'All Users', route: '/index/all-users' },
      { name: 'All Transactions', route: '/index/all-transactions' },
      { name: 'Credit User', route: '/index/credit-account' },
      { name: 'Debit User', route: '/index/debit-account' },
      { name: 'User Login', route: '/index/login-details' },
    ],
    products: [
      { name: 'All Products', route: '/index/all-user-products' },
      { name: 'Move users', route: '/index/move-users' },
      {
        name: 'Create Product Category',
        route: '/index/create-product-category',
      },
      {
        name: 'View All Product Categories',
        route: '/index/get-product-categories',
      },
      {
        name: 'Funded Products',
        route: '/index/all-funded-user-products'
      },
      {
        name: 'UnFunded Products',
        route: '/index/all-unfunded-user-products'
      },
      {
        name: 'Product Earnings',
        route: '/index/product-earnings'
      },
    ],
    groups: [
      { name: 'All Groups', route: '/index/get-group-product' },
    ],
    withdrawals: [
      { name: 'Withdrawal Details', route: '/index/withdrawal-details' },
    ],
    settings: [
      { name: 'Enable/Disable/Finalize OTP', route: '/index/otp-handler' },
      { name: 'Update Password', route: '/index/update-password' },
    ],
    paystack: [{ name: 'Run Callback', route: '/index/paystack-callback' }],
    documentation: [{name:'Kolobox Documentation', route: '/index/documentation'}],
    email: null,
  }),
  computed: {
    ...mapGetters(['account']),
  },
  methods: {
    logOut() {
      this.$auth.logout(this, '/');
      // Close Pouch DB
      this.$pouch.close();
    },
  },
  created() {
    this.email = localStorage.getItem('email');
  },
};
</script>

<style>
.container.fluid {
  margin: 0 !important;
  padding: 0 !important;
}
.v-btn__content {
  color: white !important;
}
.link {
  text-decoration: none !important;
  color: white !important;
  margin-left: 50px !important;
}
</style>
