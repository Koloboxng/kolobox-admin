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
              <v-list-tile>
                <v-list-tile-content>
                  <v-btn
                    color="blue"
                    @click="viewProductAnalytics(product.id);showDiv = true;"
                  >VIEW PRODUCT ANALYTICS</v-btn>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
        <div v-on="showDiv">
          <div v-if="!productMethodRunning">
            <loader/>
          </div>
          <div v-else>
            <v-card></v-card>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="toast.show" top right color="black">
      {{ toast.msg }}
      <v-btn flat dark small @click.native="toast.show = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import loader from './loader.vue';

export default {
  components: {
    loader,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      productMethodRunning: false,
      showDiv: false,
      toast: {
        msg: '',
        show: false,
      },
    };
  },
  methods: {
    viewProductAnalytics(id) {
      this.axios
        .get(`product/${id}/analytics`)
        .then((res) => {
          this.productMethodRunning = true;
          console.log(res.data.data);
        })
        .catch((e) => {
          console.log(e.data.data);
          this.toast.msg = e.data.data.msg;
          this.toast.show = true;
        });
    },
  },
};
</script>
