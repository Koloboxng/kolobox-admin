
<template>
  <v-app>

    <v-dialog v-model="walletDialog" persistent max-width="690" max-height="500" data-app>
      <v-layout row wrap>
        <v-flex xs10>
          <update-wallet :id="user.id"/>
        </v-flex>
        <v-flex xs1>
          <v-btn color="error" @click="walletDialog = false">Close</v-btn>
        </v-flex>
      </v-layout>
    </v-dialog>

    <v-dialog v-model="createSubDialog" max-width="690" data-app>
      <v-card>
        <v-flex ml-2 xs10 v-if="getProducts">
          <v-form ref="subForm" v-model="validateSubscriptionForm">
            <v-text-field label="Deposit Amount" v-model="subscriptionForm.deposit_amount" required>
            </v-text-field>
            <v-select
              :items="frequency"
              label="Frequency"
              v-model="subscriptionForm.saving_frequency"
              required
            ></v-select>
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
              @click="createSubscription({form: subscriptionForm, snackbar: toast,
                dialog: createSubDialog})"
            >CREATE</v-btn>
            <v-btn color="error" @click="clearForm(subscriptionForm);
            createSubDialog = false;">CLOSE</v-btn>
          </v-form>
        </v-flex>
      </v-card>
    </v-dialog>

    <v-dialog v-model="createProductDialog" max-width="690" data-app>
      <v-card>
        <v-flex ml-2 xs10>
          <v-form v-model="validateProductForm" v-if="getProducts" >
            <v-text-field label="Deposit Amount" v-model="productForm.deposit_amount" required>
            </v-text-field>
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
              @click="createOneProduct({form: productForm,
                snackbar: toast, dialog: createProductDialog})"
            >CREATE</v-btn>
            <v-btn color="error" @click="clearForm(productForm);
            createProductDialog = false;">CLOSE</v-btn>
          </v-form>
        </v-flex>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updateProductDialog" max-width="690" data-app>
      <v-card>
        <v-flex xs10 ml-2>
          <v-form v-model="validateUpdateProductForm">
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
              @click="updateAProduct({form: updateProduct, snackbar: toast})"
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
            <v-text-field label="Deposit Amount" v-model="updateSub.deposit_amount" required>
            </v-text-field>
            <v-select
              :items="binary"
              item-text="text"
              item-value="value"
              v-model="updateSub.auto_subscription"
              label="Auto Subsription"
              required
            ></v-select>
            <v-text-field v-model="updateSub.next_pay_day" label="Next Pay Day" required>
            </v-text-field>
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
              @click="updateOneSubscription({form: updateSub,
                snackbar: toast, dialog: updateSubscriptionDialog})"
            >UPDATE</v-btn>
            <v-btn
              color="error"
              @click="clearForm(updateSub);updateSubscriptionDialog = false;"
            >CLOSE</v-btn>
          </v-form>
        </v-flex>
      </v-card>
    </v-dialog>

    <v-dialog v-model="rolloverDialog" width="500">
      <v-card>
        <v-card-title>Rollover Active Product</v-card-title>
        <v-card-text>Are you sure you want to rollover this product ?</v-card-text>
        <date-picker
            v-model="start_date"
            :default-value="new Date()"
            :disabled-date="disabledStartDate"
            type="date"
            class="pr-1 pl-1"
          ></date-picker>
        <v-card-actions>
          <v-btn
            flat
            @click="rolloverSingleProduct(rolloverItem.id);rolloverItem = null"
            class="green --text"
          >Rollover Product</v-btn>
          <v-btn class="red --text" flat @click="rolloverDialog = false;
          rolloverItem = null;">CANCEL</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="rolloverInactiveDialog" width="500">
      <v-card>
        <v-card-title>Rollover Inactive Product</v-card-title>
        <v-card-text>Are you sure you want to rollover this inactive product ?</v-card-text>
        <date-picker
            v-model="start_date"
            :default-value="new Date()"
            :disabled-date="disabledStartDate"
            type="date"
            class="pr-1 pl-1"
          ></date-picker>
          <v-text-field label="Rollover Amount" v-model="deposit_amount" @keypress="validateInput" required>
          </v-text-field>
        <v-card-actions>
          <v-btn
            flat
            @click="rolloverInactiveSingleProduct(rolloverInactiveItem.id);rolloverInactiveItem = null"
            class="green --text"
          >Rollover Inactive Product</v-btn>
          <v-btn class="red --text" flat @click="rolloverInactiveDialog = false;
          rolloverInactiveItem = null;">CANCEL</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-flex ml-1 mt-2>
      <router-link class="link" to="/index/all-users">&lt; &lt; Back To Users</router-link>
      <v-layout justify-center>
        <v-flex xs9 mt-5>
          <v-card>
            <v-toolbar color="blue" dark>
              <v-toolbar-title>
                {{user.firstname.toUpperCase()}} {{user.lastname.toUpperCase()}}
              </v-toolbar-title>

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
                    <v-list-tile-sub-title v-html="user.occupation"></v-list-tile-sub-title>
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
                    <v-list-tile-title>Kolobox ID</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.id"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Kolobox Number</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.number"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Next of Kin</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.Next_Of_Kin ? user.Next_Of_Kin : 'None'">
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Amount of Subscriptions</v-list-tile-title>
                    <v-list-tile-sub-title v-html="getSingleUserSubscriptions.length">
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <div v-if="getSingleUserSubscriptions.length > 0" class="products">
                  <h2>Subscription Details</h2>
                  <div
                    v-for="(item, index) in getSingleUserSubscriptions"
                    :key="index"
                    class="particularItem"
                  >
                    <h3>[{{index + 1}}]</h3>
                    <h3>Product Name -- {{item.name}}</h3>
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
                  <v-btn color="success" @click="createNewSubscription()">
                    Create Subscription</v-btn>
                </div>
                <div v-else class="products">
                  <v-btn color="success" @click="createNewSubscription()">
                    Create Subscription</v-btn>
                </div>

                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Amount of Products</v-list-tile-title>
                    <v-list-tile-sub-title v-html="getSingleUserEarnings.length">
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <div v-if="getSingleUserEarnings.length > 0" class="products">
                  <h2>Products Details</h2>
                  <div v-for="(item, index) in getSingleUserEarnings" :key="index"
                  class="particularItem">
                    <h3>[{{index + 1}}]</h3>
                    <h3>Product Name -- {{item.name}}</h3>
                    <h3>Start Date -- {{formatDate(item.start_date)}}</h3>
                    <h3>End Date --
                      {{
                        item.name !== "KOLO-FLEX"
                          ? formatDate(
                              getEndDate(item.start_date, Number(item.tenor))
                            ) || "00-00-00"
                          : "-"
                      }}
                    </h3>
                    <h3>Tenure -- {{item.name !== "KOLO-FLEX" ? item.tenor + " days" : "-"}}</h3>
                    <h3>Interest Rate -- {{item.interest_rate | percent(2)}}</h3>
                    <h3>Interest -- {{item.interest | currency("₦", 2)}}</h3>
                    <h3>Investment -- {{item.amount ? formatPrice(item.amount): "₦0.00"}}</h3>
                    <h3>Status -- {{ item.canceled ? "Canceled" : "Active" }}</h3>
                    <v-btn color="primary" @click="updateSingleProduct(item)">Update Product</v-btn>
                    <v-btn color="success" v-if="!item.canceled" @click="rolloverDialog = true;
                    rolloverItem=item">Rollover Product</v-btn>
                    <v-btn color="success" v-if="item.canceled" @click="rolloverInactiveDialog = true;
                    rolloverInactiveItem=item">Rollover Inactive Product</v-btn>
                    <!-- v-if="!item.canceled" -->
                  </div>
                  <v-btn color="success" @click="createNewProduct()">Add New Product</v-btn>
                </div>
                <div v-else class="products">
                  <v-btn color="success" @click="createNewProduct()">Add New Product</v-btn>
                </div>

                <v-list-tile v-if="getSingleUserDetails[0]">
                  <v-list-tile-content>
                    <v-list-tile-title>Unlocked Funds</v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{(getSingleUserDetails[0].account_balance) ?
                        formatPrice(getSingleUserDetails[0].account_balance) : "₦0.00"
                      }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="getSingleUserDetails[0]">
                  <v-list-tile-content>
                    <v-list-tile-title>Locked Funds</v-list-tile-title>
                    <v-list-tile-sub-title>{{(getSingleUserDetails[0].book_balance)
                      ? formatPrice(getSingleUserDetails[0].book_balance): "₦0.00"}}
                    </v-list-tile-sub-title>
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

          <v-card>
            <v-toolbar color="blue" dark>
              <v-toolbar-title>Bank Details</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list class="ml-3 mt-2 mb-2" v-if="getSingleUserDetails">
              <template>
                <div v-for="(item, index) in getSingleUserDetails" :key="index" class="mb-4">
                  <v-list-title>
                    <v-list-content>
                      <v-list-tile-title>Bank Name</v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.bank_name ?
                      item.bank_name : 'None'"></v-list-tile-sub-title>
                    </v-list-content>
                  </v-list-title>

                  <v-list-title>
                    <v-list-content>
                      <v-list-tile-title>Account Number</v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.account_number ?
                      item.account_number : 'None'"></v-list-tile-sub-title>
                    </v-list-content>
                  </v-list-title>

                  <v-list-title>
                    <v-list-content>
                      <v-list-tile-title>Account Name</v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.account_name ?
                       item.account_name : 'None'"></v-list-tile-sub-title>
                    </v-list-content>
                  </v-list-title>
                </div>

              </template>
            </v-list>

          </v-card>

          <v-card>
            <v-toolbar color="blue" dark>
              <v-toolbar-title>User Products</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>

            <v-card-title>
              Funded Products
            </v-card-title>
            <v-list class="ml-3 mt-2 mb-2" v-if="getAllFundedAndUnFundedProduct">
              <template>
                <div v-for="(item, index) in getAllFundedAndUnFundedProduct.fundedProduct"
                :key="index" class="mb-4">
                  <v-list-title>
                    <v-list-content>
                      <v-list-tile-sub-title v-html="item.name"></v-list-tile-sub-title>
                    </v-list-content>
                  </v-list-title>

                </div>

              </template>
            </v-list>

            <v-card-title>
              UnFunded Products
            </v-card-title>

            <v-list class="ml-3 mt-2 mb-2" v-if="getAllFundedAndUnFundedProduct">
              <template>
                <div v-for="(item, index) in getAllFundedAndUnFundedProduct.unFundedProduct"
                :key="index" class="mb-4">
                  <v-list-title>
                    <v-list-content>
                      <v-list-tile-sub-title v-html="item.name"></v-list-tile-sub-title>
                    </v-list-content>
                  </v-list-title>
                </div>

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
      rolloverDialog: false,
      rolloverInactiveDialog: false,
      product_id: null,
      subscriptionForm: {
        id: null,
        deposit_amount: null,
        saving_frequency: null,
        user_id: null,
        product_id: null,
        last_pay_day: null,
        next_pay_day: null,
        group_id: null,
        created_at: null,
        updated_at: null,
      },
      productForm: {
        id: null,
        deposit_amount: null,
        start_date: null,
        investment_goal: null,
        saving_frequency: null,
        user_id: null,
        product_id: null,
        created_at: null,
        updated_at: null,
        unit_price: null,
        units_purchased: null,
        verified: null,
        canceled: null,
      },
      updateSub: {
        deposit_amount: null,
        saving_frequency: null,
        next_pay_day: null,
        auto_subscription: null,
        product_id: null,
        id: null,
        user_id: null,
      },
      updateProduct: {
        id: null,
        verified: null,
        canceled: null,
        product_id: null,
        user_id: null,
      },
      frequency: ['daily', 'weekly', 'monthly'],
      binary: [{ text: 'true', value: true }, { text: 'false', value: false }],
      createProductDialog: false,
      updateSubscriptionDialog: false,
      updateProductDialog: false,
      validateProductForm: true,
      validateUpdateProductForm: true,
      validateUpdateSubscriptionForm: true,
      rolloverItem: null,
      rolloverInactiveItem: null,
      start_date: null,
      deposit_amount: null,
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => this.user.id,
      () => {
        this.getSingleUser({ id: this.$route.params.id });
        this.getSingleEarnings({ id: this.$route.params.id });
        this.getSingleUserSub({ id: this.$route.params.id });
        this.getFundedAndUnFundedProductById({ id: this.$route.params.id });
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true },
    );
    this.getAllProducts();
    this.getSingleUser({ id: this.$route.params.id });
    this.getSingleEarnings({ id: this.$route.params.id });
    this.getSingleUserSub({ id: this.$route.params.id });
    this.getFundedAndUnFundedProductById({ id: this.$route.params.id });
    this.getSingleUserEarnings();

    // console.log(this.$route.params.id)
  },
  methods: {
    ...mapActions([
      'getAllProducts',
      'createSubscription',
      'updateOneSubscription',
      'createOneProduct',
      'updateOneProduct',
      'getSingleUser',
      'getSingleUserSub',
      'getSingleEarnings',
      'getFundedAndUnFundedProductById',
      'rolloverProduct',
      'rolloverInactiveProduct',
    ]),
    disabledStartDate(date) {
      return (
        new Date(date).setHours(0, 0, 0, 0)
        > new Date(this.end).setHours(0, 0, 0, 0)
      );
    },
    disabledEndDate(date) {
      return (
        new Date(date).setHours(0, 0, 0, 0)
        < new Date(this.start).setHours(0, 0, 0, 0)
      );
    },
    findProduct(productId) {
      return this.getProducts.find(x => x.id === productId).name;
    },
    updateSingleSubscription(item) {
      this.updateSubscriptionDialog = true;
      this.updateSub.user_id = this.$route.params.id;
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
      if (item.name === this.getProducts[0].name) {
        this.product_id = this.getProducts[0].id;
      } else {
        this.product_id = this.getProducts.filter(
          x => x.name === item.name,
        )[0].id;
      }
      this.updateProductDialog = true;
      this.updateProduct.user_id = this.$route.params.id;
      this.updateProduct.product_id = this.product_id;
      this.updateProduct.verified = item.verified;
      this.updateProduct.canceled = item.canceled;
      this.updateProduct.id = item.id;
    },
    createNewSubscription() {
      this.createSubDialog = true;
      this.subscriptionForm.user_id = this.$route.params.id;
      this.subscriptionForm.id = this.generate(14);
      [this.subscriptionForm.last_pay_day] = new Date()
        .toISOString()
        .split('T');
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
      this.productForm.user_id = this.$route.params.id;
      this.productForm.created_at = new Date().toISOString();
      this.productForm.updated_at = new Date().toISOString();
      this.productForm.unit_price = null;
      this.productForm.units_purchased = null;
    },
    formatPrice(value) {
      /* let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") */
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(value);
    },
    rolloverSingleProduct(value) {
      this.toast.msg = 'Rolling product over...';
      this.toast.show = true;
      this.rolloverProduct({
        id: value,
        user_id: this.$route.params.id,
        start_date: this.start_date,
        snackbar: this.toast,
      }).then(() => {
        this.rolloverDialog = false;
      });
    },
    rolloverInactiveSingleProduct(value) {
      this.toast.msg = 'Rolling inactive product over...';
      this.toast.show = true;
      this.rolloverInactiveProduct({
        id: value,
        user_id: this.$route.params.id,
        start_date: this.start_date,
        amount: this.deposit_amount,
        snackbar: this.toast,
      }).then(() => {
        this.rolloverInactiveDialog = false;
      });
    },
    updateAProduct(value) {
      this.toast.msg = 'Rolling product over...';
      this.toast.show = true;
      this.updateOneProduct({
        form: value.form, snackbar: value.snackbar,
      }).then(() => {
        this.updateProductDialog = false;
      });
    },
    validateInput($event) {
      // this.deposit_amount = this.deposit_amount.replace(/[^0-9.]/g, "");
      
      // Get the current value of the input after the keydown event
      /* const inputValue = event.target.value;

      // Use a regular expression to test if the input matches the allowed pattern
      const allowedPattern = /^[0-9]*\.?[0-9]*$/;
      if (!allowedPattern.test(inputValue)) {
        // Prevent the default keydown behavior if input doesn't match the pattern
        event.preventDefault();
      } */

      // console.log($event.keyCode); //keyCodes value
     let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

      // only allow number and one dot
      if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || this.deposit_amount.indexOf('.') != -1)) { // 46 is dot
        $event.preventDefault();
      }

      // restrict to 2 decimal places
      if(this.deposit_amount!=null && this.deposit_amount.indexOf(".")>-1 && (this.deposit_amount.split('.')[1].length > 1)){
        $event.preventDefault();
      }
    },
  },
  computed: {
    ...mapGetters([
      'getProducts',
      'getSingleUserDetails',
      'getSingleUserSubscriptions',
      'getSingleUserEarnings',
      'getAllFundedAndUnFundedProduct',
    ]),
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
