<template>
  <v-app>
    <v-flex ml-1 mt-2>
      <router-link class="link" to="/index/all-users">&lt; &lt; Back To Users</router-link>
      <v-layout justify-center>
        <v-flex xs9 mt-5>
          <v-card>
            <v-toolbar color="blue" dark>
              <v-toolbar-title>{{user.firstname.toUpperCase()}} {{user.lastname.toUpperCase()}}</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-list>
              <template>
                <v-divider></v-divider>

                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Active</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.active"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Email</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.email"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Occupation</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.banker"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Phone</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.phone"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Next of Kin</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.Next_Of_Kin | 'None'"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Amount of Subscriptions</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.subscriptions.length"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <div v-if="user.subscriptions.length > 0" class="products">
                  <h2>Subscription Details</h2>
                  <div
                    v-for="(item, index) in user.subscriptions"
                    :key="index"
                    class="particularItem"
                  >
                    <h3>[{{index + 1}}]</h3>
                    <h3>Amount -- {{item.deposit_amount | currency('₦',2) | commas}}</h3>
                    <h3>Last Pay Day -- {{item.last_pay_day.split('T')[0]}}</h3>
                    <h3>Next Pay Day -- {{item.next_pay_day.split('T')[0]}}</h3>
                    <h3>Saving Frequency -- {{item.saving_frequency}}</h3>
                    <h3>Auto Subscription -- {{item.auto_subscription}}</h3>
                  </div>
                </div>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Amount of Products</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.products.length"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <div v-if="user.products.length > 0" class="products">
                  <h2>Products Details</h2>
                  <div v-for="(item, index) in user.products" :key="index" class="particularItem">
                    <h3>[{{index + 1}}]</h3>
                    <h3>Product Name -- {{findProduct(item.product_id)}}</h3>
                    <h3>Amount -- {{item.deposit_amount | currency('₦',2) | commas}}</h3>
                    <h3>Verified -- {{item.verified}}</h3>
                    <h3>Canceled -- {{item.canceled}}</h3>
                  </div>
                </div>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Unlocked Funds</v-list-tile-title>
                    <v-list-tile-sub-title>{{user.account_balance | currency('₦',2) | commas}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Locked Funds</v-list-tile-title>
                    <v-list-tile-sub-title>{{user.book_balance | currency('₦',2) | commas}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
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
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      toast: {
        msg: '',
        show: false,
      },
      products: {
        '-L6QgDZ3yYb67PAxAfb_': 'KOLO-FLEX',
        '-L6QgDZ3yYb67PAxAfba': 'KOLO-TARGET',
        '-L6QgDZ3yYb67PAxAfbe': 'KOLO-GROUP',
        '-L6QgDZ3yYb67PAxAfbz': 'KOLO-FUNDS',
      },
    };
  },
  methods: {
    findProduct(productId) {
      const id = Object.keys(this.products).find(x => x === productId);
      return this.products[`${id}`];
    },
  },
};
</script>
<style scoped>
.link {
  color: black !important;
}
.products {
  margin-left: 15px;
  margin-bottom: 20px;
}
.products h3,
h2 {
  font-weight: normal;
  margin-top: 10px;
}
.particularItem {
  border: 1px solid rgb(0, 195, 255);
}
</style>
