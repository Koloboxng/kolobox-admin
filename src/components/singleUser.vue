<template>
  <v-app>
    <v-dialog v-model="walletDialog" persistent max-width="690" max-height="500" data-app>
      <v-layout row wrap>
        <v-flex xs10>
          <update-wallet :id="user.primary_id"/>
        </v-flex>
        <v-flex xs1>
          <v-btn color="error" @click="walletDialog = false">Close</v-btn>
        </v-flex>
      </v-layout>
    </v-dialog>
    <v-dialog v-model="createSubDialog" max-width="690" data-app>
      <v-card>
        <v-flex ml-2 xs10>
          <v-form ref="subForm" v-model="validateSubscriptionForm">
            <v-text-field label="Deposit Amount" v-model="subscriptionForm.deposit_amount" required></v-text-field>
            <v-select :items="frequency" v-model="subscriptionForm.saving_frequency" required></v-select>
            <v-select
              :items="transformProduct(getProducts)"
              item-text="text"
              item-value="value"
              v-model="subscriptionForm.product_id"
              required
              label="Product"
            ></v-select>
            <v-btn
              color="primary"
              :disabled="!validateSubscriptionForm"
              @click="createSubscription({form: subscriptionForm})"
            >CREATE</v-btn>
            <v-btn color="error" @click="clearForm(subscriptionForm);createSubDialog = false;">CLOSE</v-btn>
          </v-form>
        </v-flex>
      </v-card>
    </v-dialog>
    <v-dialog v-model="createProductDialog" max-width="690" data-app>
      <v-card>
        <v-flex ml-2 xs10>
          <v-form v-model="validateProductForm">
            <v-text-field label="Deposit Amount" v-model="productForm.deposit_amount" required></v-text-field>
            <v-select
              :items="binary"
              item-text="text"
              item-value="value"
              v-model="productForm.verified"
              label="Verified"
              required
            ></v-select>
            <v-select
              :items="binary"
              item-text="text"
              item-value="value"
              v-model="productForm.canceled"
              label="Canceled"
              required
            ></v-select>
            <v-select
              :items="transformProduct(getProducts)"
              item-text="text"
              item-value="value"
              v-model="productForm.product_id"
              required
              label="Product"
            ></v-select>
            <v-btn
              color="primary"
              :disabled="!validateProductForm"
              @click="createProduct({form: productForm})"
            >CREATE</v-btn>
            <v-btn color="error" @click="clearForm(productForm);createProductDialog = false;">CLOSE</v-btn>
          </v-form>
        </v-flex>
      </v-card>
    </v-dialog>
    <v-dialog v-model="updateProductDialog" max-width="690" data-app>
      <v-card>
        <v-flex xs10 ml-2>
          <v-form v-model="validateUpdateProductForm">
            <v-text-field label="Deposit Amount" v-model="updateProduct.deposit_amount" required></v-text-field>
            <v-select
              :items="binary"
              item-text="text"
              item-value="value"
              v-model="updateProduct.verified"
              label="Verified"
              required
            ></v-select>
            <v-select
              :items="binary"
              item-text="text"
              item-value="value"
              v-model="updateProduct.canceled"
              label="Canceled"
              required
            ></v-select>
            <v-select
              :items="transformProduct(getProducts)"
              item-text="text"
              item-value="value"
              v-model="updateProduct.product_id"
              required
              label="Product"
            ></v-select>
            <v-btn
              color="primary"
              :disabled="!validateUpdateProductForm"
              @click="updateOneProduct({form: updateProduct})"
            >UPDATE</v-btn>
            <v-btn
              color="error"
              @click="clearForm(updateProduct);updateProductDialog = false;"
            >CLOSE</v-btn>
          </v-form>
        </v-flex>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updateSubscriptionDialog" max-width="690" data-app>
      <v-card>
        <v-flex xs10 ml-1>
          <v-form v-model="validateUpdateSubscriptionForm">
            <v-text-field label="Deposit Amount" v-model="updateSub.deposit_amount" required></v-text-field>
            <v-select
              :items="binary"
              item-text="text"
              item-value="value"
              v-model="updateSub.auto_subscription"
              label="Auto Subsription"
              required
            ></v-select>
            <v-text-field v-model="updateSub.next_pay_day" label="Next Pay Day" required></v-text-field>
            <v-select
              :items="transformProduct(getProducts)"
              item-text="text"
              item-value="value"
              v-model="updateSub.product_id"
              required
              label="Product"
            ></v-select>
            <v-btn
              color="primary"
              :disabled="!validateUpdateSubscriptionForm"
              @click="updateOneSubscription({form: updateSub})"
            >UPDATE</v-btn>
            <v-btn
              color="error"
              @click="clearForm(updateSub);updateSubscriptionDialog = false;"
            >CLOSE</v-btn>
          </v-form>
        </v-flex>
      </v-card>
    </v-dialog>

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
                    <v-btn
                      color="primary"
                      @click="updateSingleSubscription(item)"
                    >Update Subscription</v-btn>
                  </div>
                  <v-btn color="success" @click="createNewSubscription()">Create Subscription</v-btn>
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
                    <v-btn color="primary" @click="updateSingleProduct(item)">Update Product</v-btn>
                  </div>
                  <v-btn color="success" @click="createNewProduct()">Add New Product</v-btn>
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
                <v-list-tile>
                  <v-list-tile-content>
                    <v-btn color="info" @click="walletDialog = true">UPDATE WALLET</v-btn>
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
import { mapGetters, mapActions } from 'vuex';
import updateWallet from './updateWallet.vue';
import productsMixin from '../mixins/products.mixin';
import randomMixin from '../mixins/random.generator.mixin';
import dateMixin from '../mixins/date.mixin';

export default {
  mixins: [productsMixin, randomMixin, dateMixin],
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    updateWallet,
  },
  data() {
    return {
      toast: {
        msg: '',
        show: false,
      },
      validateSubscriptionForm: true,
      createSubDialog: false,
      walletDialog: false,
      subscriptionForm: {
        id: '',
        deposit_amount: '',
        saving_frequency: '',
        user_id: '',
        product_id: '',
        last_pay_day: '',
        next_pay_day: '',
        group_id: '',
        created_at: '',
        updated_at: '',
      },
      productForm: {
        id: '',
        deposit_amount: '',
        start_date: '',
        investment_goal: '',
        saving_frequency: '',
        user_id: '',
        product_id: '',
        created_at: '',
        unit_price: '',
        units_purchased: '',
        verified: '',
        canceled: '',
      },
      updateSub: {
        deposit_amount: '',
        saving_frequency: '',
        next_pay_day: '',
        auto_subscription: '',
        product_id: '',
        id: '',
        user_id: '',
      },
      updateProduct: {
        verified: '',
        canceled: '',
        product_id: '',
        user_id: '',
      },
      frequency: ['daily', 'weekly', 'momthly'],
      binary: [{ text: 'true', value: true }, { text: 'false', value: false }],
      createProductDialog: false,
      updateSubscriptionDialog: false,
      updateProductDialog: false,
      validateProductForm: true,
      validateUpdateProductForm: true,
      validateUpdateSubscriptionForm: true,
    };
  },
  created() {
    this.getAllProducts();
  },
  methods: {
    ...mapActions([
      'getAllProducts',
      'createSubscription',
      'updateSubscription',
      'createProduct',
      'updateOneProduct',
    ]),
    findProduct(productId) {
      return this.getProducts.find(x => x.id === productId).name;
    },
    clearSub() {
      this.createSubDialog = false;
      this.subscriptionForm.user_id = '';
      this.subscriptionForm.id = '';
      this.subscriptionForm.last_pay_day = '';
      this.subscriptionForm.next_pay_day = '';
      this.subscriptionForm.created_at = '';
      this.subscriptionForm.updated_at = '';
    },
    updateSingleSubscription(item) {
      this.updateSubscriptionDialog = true;
      this.updateSub.user_id = this.user.primary_id;
      this.updateSub.id = item.id;
      this.updateSub.auto_subscription = item.auto_subscription;
      this.updateSub.next_pay_day = item.next_pay_day;
      this.updateSub.deposit_amount = item.deposit_amount;
      this.updateSub.product_id = item.product_id;
    },
    clearForm(form) {
      Object.keys(form).forEach((x) => {
        // eslint-disable-next-line no-param-reassign
        form[x] = '';
      });
    },
    updateSingleProduct(item) {
      this.updateProductDialog = true;
      this.updateProduct.user_id = this.user.primary_id;
      this.updateProduct.product_id = item.id;
    },
    createNewSubscription() {
      this.createSubDialog = true;
      this.subscriptionForm.user_id = this.user.primary_id;
      this.subscriptionForm.id = this.generate(11);
      [this.subscriptionForm.last_pay_day] = new Date()
        .toISOString()
        .split('T');

      let numberOfDays = 0;
      if (this.subscriptionForm.saving_frequency === 'daily') numberOfDays = 1;
      if (this.subscriptionForm.saving_frequency === 'weekly') numberOfDays = 7;
      if (this.subscriptionForm.saving_frequency === 'monthly') {
        numberOfDays = 30;
      }
      this.subscriptionForm.next_pay_day = this.getDate(
        this.subscriptionForm.last_pay_day,
        numberOfDays,
      );
      this.subscriptionForm.group_id = null;
      this.subscriptionForm.created_at = new Date().toISOString();
      this.subscriptionForm.updated_at = new Date().toISOString();
    },
    createNewProduct() {
      this.createProductDialog = true;
      this.productForm.id = this.generate(11);
      [this.productForm.start_date] = new Date().toISOString().split('T');
      this.productForm.investment_goal = null;
      this.productForm.saving_frequency = null;
      this.productForm.user_id = this.user.primary_id;
      this.productForm.created_at = new Date().toISOString();
      this.productForm.unit_price = null;
      this.productForm.units_purchased = null;
    },
    clearProduct() {
      this.createProductDialog = false;
      this.productForm.start_date = '';
      this.productForm.saving_frequency = '';
      this.productForm.investment_goal = '';
      this.productForm.user_id = '';
      this.productForm.created_at = '';
      this.productForm.unit_price = '';
      this.productForm.units_purchased = '';
    },
  },
  computed: {
    ...mapGetters(['getProducts']),
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
