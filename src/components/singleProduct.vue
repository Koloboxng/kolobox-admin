<template>
  <v-app>
    <router-link class="link" to="/index/get-products">Back To Products</router-link>
    <v-layout justify-center>
      <v-flex xs9>
        <v-card>
          <v-toolbar color="blue" dark>
            <v-toolbar-title>{{product.name}}</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list>
            <template>
              <v-divider></v-divider>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Active</v-list-tile-title>
                  <v-list-tile-sub-title v-html="product.active"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Minimum Amount</v-list-tile-title>
                  <v-list-tile-sub-title v-html="product.Minimum_amount"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Product Type</v-list-tile-title>
                  <v-list-tile-sub-title v-html="product.product_type"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Tenor</v-list-tile-title>
                  <v-list-tile-sub-title v-html="product.tenor"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Withdrawal Charges</v-list-tile-title>
                  <v-list-tile-sub-title v-html="product.withdrawal_charges"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Interest Rate</v-list-tile-title>
                  <v-list-tile-sub-title v-html="product.interest_rate"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
