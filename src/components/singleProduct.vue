<template>
  <v-app>
    <v-flex ml-2 mt-3>
      <router-link color="black --text" to="/index/get-products">&lt; &lt; Back To Products</router-link>
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
                    <v-list-tile-sub-title>{{product.Minimum_amount || 0 | currency("₦", 2)}}</v-list-tile-sub-title>
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
                    <v-list-tile-sub-title>{{product.tenor}} days</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Withdrawal Charges</v-list-tile-title>
                    <v-list-tile-sub-title>{{product.withdrawal_charges | currency("₦", 2)}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Interest Rate</v-list-tile-title>
                    <v-list-tile-sub-title>{{product.interest_rate | percent(2)}}</v-list-tile-sub-title>
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
          <div v-if="showDiv">
            <div v-if="!productMethodRunning">
              <loader/>
            </div>
            <div v-else>
              <v-card>
                <v-card-title>Total Deposit Amount For this Product: {{results.total_deposit_amount | currency("₦", 2)}}</v-card-title>
                <v-card-text>
                  <v-data-table :headers="headers" :items="results.data" class="elevation-1">
                    <template v-slot:no-data>
                      <v-alert
                        :value="true"
                        color="error"
                        icon="warning"
                      >Sorry, nothing to display here :(</v-alert>
                    </template>
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.first_name }} {{props.item.last_name}}</td>
                      <td>{{ props.item.deposit_amount | currency("₦", 2)}}</td>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-snackbar v-model="toast.show" top right color="black">
        {{ toast.msg }}
        <v-btn flat dark small @click.native="toast.show = false">Close</v-btn>
      </v-snackbar>
    </v-flex>
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
      results: null,
      headers: [
        {
          text: 'Full Name',
          value: 'firstname',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Amount Deposited',
          value: 'deposit_amount',
          align: 'left',
          sortable: true,
        },
      ],
    };
  },
  methods: {
    viewProductAnalytics(id) {
      this.toast.msg = 'Loading...';
      this.toast.show = true;
      this.axios
        .get(`product/${id}/analytics`)
        .then((res) => {
          this.productMethodRunning = true;
          console.log(res.data.data);
          this.results = res.data.data;
          this.toast.msg = 'Loaded. OK';
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

<style scoped>
.link {
  color: black !important;
}
</style>
