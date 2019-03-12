<template>
  <v-app>
    <v-toolbar color="blue darken-2" flat clipped-left>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click="showNav = !showNav"></v-toolbar-side-icon>
      <v-flex>
        <v-img :src="require('../../assets/logo.png')" alt="logo" height="54px" width="150px"></v-img>
      </v-flex>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Welcome, {{email}}</v-btn>
        <v-btn flat @click="logOut()">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container fluid>
      <v-layout row>
        <v-flex xs3>
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
      { name: 'Create Admin', route: '/index/create-admin' },
      { name: 'Show All Admins', route: '/index/show-all-admins' },
    ],
    users: [
      { name: 'All Users', route: '/index/all-users' },
      { name: 'All Transactions', route: '/index/all-transactions' },
    ],
    products: [
      { name: 'Create Product', route: '/index/create-product' },
      { name: 'All Products', route: '/index/get-products' },
      {
        name: 'See products(self-managed)',
        route: '/index/get-selfmanaged-products',
      },
      { name: 'Move users', route: '/index/move-users' },
      {
        name: 'Create Investment Approach',
        route: '/index/create-investment-approach',
      },
      {
        name: 'View All Investment Approaches',
        route: '/index/get-investment-approaches',
      },
      {
        name: 'Create Product Category',
        route: '/index/create-product-category',
      },
      {
        name: 'View All Product Categories',
        route: '/index/get-product-categories',
      },
    ],
    settings: [
      { name: 'Enable/Disable/Finalize OTP', route: '/index/otp-handler' },
      { name: 'Update Password', route: '/index/update-password' },
    ],
    paystack: [{ name: 'Run Callback', route: '/index/paystack-callback' }],
    email: null,
  }),
  computed: {
    ...mapGetters(['account']),
  },
  methods: {
    logOut() {
      this.$auth.logout(this, '/');
    },
  },
  watch: {
    account() {
      console.log(this.account);
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
