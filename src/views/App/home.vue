<template>
  <v-app>
    <div v-if="!loaded">
      <loader/>
    </div>
    <v-container fluid v-else>
      <div id="datePicker">
        <v-row>
          <v-col
            class="d-flex pr-1"
            cols="6"
            sm="6"
          >
          <date-picker
            v-model="start"
            :get-classes="getRangeClasses"
            :default-value="end || new Date()"
            :disabled-date="disabledStartDate"
            :disabled-time="disabledStartTime"
            type="date"
            class="pr-1 pl-1"
          ></date-picker>
          <date-picker
            v-model="end"
            :get-classes="getRangeClasses"
            :default-value="start || new Date()"
            :disabled-date="disabledEndDate"
            :disabled-time="disabledEndTime"
            type="date"
            class="pr-1"
          ></date-picker>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            class="d-flex pr-1"
            cols="3"
          >
          <v-select
            v-model="option"
            :items="options"
            item-text="text"
            item-value="value"
            label="Select Option"
            class="pr-1"
            @change="onChange($event)"
          ></v-select>
          </v-col>
        </v-row>

        <v-row v-if="option === 'Payment'">
          <v-col
            class="d-flex"
            cols="3"
          >
          <v-select
            v-model="payments"
            :items="paymentOptions"
            item-text="text"
            item-value="value"
            label="Payments Options"
          ></v-select>
          </v-col>
        </v-row>

        <v-row v-if="option === 'Product'">
          <v-col
            class="d-flex"
            cols="12"
            sm="6"
          >
          <v-select
            v-if="allProduct"
            v-model="product_id"
            :items="transformProduct(allProduct)"
            item-text="text"
            item-value="value"
            label="Select Product"
            class="pr-1"
          ></v-select>
          <v-select
            v-model="freq"
            :items="items"
            item-text="text"
            item-value="value"
            label="Frequently"
          ></v-select>
          </v-col>
        </v-row>

        <v-row v-if="option === 'Bank'">
          <v-col
            class="d-flex"
            cols="12"
            sm="6"
          >
          <v-select
            v-model="accounts"
            :items="accountOptions"
            item-text="text"
            item-value="value"
            label="Bank Account"
          ></v-select>
          </v-col>
        </v-row>
        <v-btn :disabled="!valid" color="primary" @click="validate">Search</v-btn>
      </div>

      <v-layout row justify-center>
        <v-flex xs3 ml-5>
          <home-card
              :title="title"
              :number="result"
              style="margin-top: 0px;"
            />
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs3 ml-5>
          <home-card
            :title="Titles[0].name"
            :number="account.paystackBalance | currency('₦',2) | commas"
          />
        </v-flex>
        <v-flex xs3 ml-5>
          <home-card :title="Titles[1].name" :number="account.userCount | commas"/>
        </v-flex>
        <v-flex xs3 ml-5>
          <home-card :title="Titles[3].name" :number="account.userDailyCount"/>
        </v-flex>
        <v-flex xs3 ml-5>
          <home-card :title="Titles[4].name" :number="account.userWeeklyCount"/>
        </v-flex>
        <v-flex xs3 ml-5>
          <home-card :title="Titles[5].name" :number="account.userMonthlyCount"/>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs3 ml-5>
          <home-card :title="Titles[2].name" :number="account.transactionCount | commas"/>
        </v-flex>
        <v-flex xs3 ml-5>
          <home-card :title="Titles[6].name" :number="account.userFundedCount | commas"/>
        </v-flex>
        <v-flex xs3 ml-5>
          <home-card :title="Titles[7].name" :number="account.userUnFundedCount | commas"/>
        </v-flex>
        <v-flex xs3 ml-5>
          <home-card :title="Titles[8].name" :number="account.allAccountBalance | currency('₦',2) | commas"/>
        </v-flex>
        <v-flex xs3 ml-5>
          <home-card :title="Titles[9].name" :number="account.allLockedBalance | currency('₦',2) | commas"/>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-container mt-3>
          <v-row justify="space-around">
            <v-card>
              <v-card-title>Product Earnings</v-card-title>
              <v-card-text>
                <table class="table table-striped table-responsive" style="width: 100%;">
                  <thead>
                    <tr>
                      <th class="col">Product Name</th>
                      <th class="col">Total Investment</th>
                      <th class="col">Total Interest</th>
                      <th class="col">Interest Rate</th>
                    </tr>
                  </thead>
                  <tbody v-if="allProductBalances.length > 0">
                    <tr v-for="(item, index) in allProductBalances" :key="index">
                      <td data-label="Product Name">
                        <span>{{ item.name }}</span>
                      </td>
                      <td data-label="Total Investment">
                        <span>{{ formatCurrency(item.amount) }}</span>
                      </td>
                      <td data-label="Total Interest">
                        <span>{{ formatCurrency(item.interest) }}</span>
                      </td>
                      <td data-label="Interest Rate">
                        <span>{{ item.interest_rate | percent(2) }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </v-card-text>
            </v-card>
          </v-row>
        </v-container>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import loader from '@/components/loader.vue';
import homeCard from '@/components/homeCard.vue';
import productMixin from '../../mixins/products.mixin';
import Vue from 'vue';

export default {
  name: 'Home',
  components: {
    loader,
    homeCard,
  },
  mixins: [productMixin],
  data() {
    return {
      Titles: [
        { name: 'Total Earnings' },
        { name: 'Total Users' },
        { name: 'Total Transactions' },
        { name: 'Total Daily Registered User' },
        { name: 'Total Weekly Registered User' },
        { name: 'Total Monthly Registered User' },
        { name: 'Funded Users' },
        { name: 'Unfunded Users' },
        { name: 'Total Account Balance' },
        { name: 'Total Locked Balance' },
        {name: 'Product Balances' },
      ],
      headers: [
        { text: 'Product Name', value: 'name' },
        { text: 'Total Investment (Amount)', value: 'amount' },
        { text: 'Total Interest', value: 'interest' },
        { text: 'Interest Rate', value: 'interest_rate' },
      ],
      valid: true,
      start: null,
      end: null,
      product_id: null,
      freq: null,
      option: null,
      payments: null,
      accounts: null,
      result: 0,
      title: '',
      toast: {
        show: false,
        msg: '',
      },
      items: [null, 'Daily', 'Weekly', 'Monthly'],
      options: [null,'Payment','Product', 'Bank'],
      paymentOptions: ['Yes', 'No'],
      accountOptions: ['Yes', 'No'],
    };
  },
  computed: {
    ...mapGetters(['loaded', 'account', 'allProduct', 'allProductBalances']),
  },
  created() {
    this.getProfile();
    this.getAllProducts();
    this.getAllProductBalances()
  },
  methods: {
    ...mapActions(['getProfile', 'getAllProducts', 'getAllProductBalances']),
    getRangeClasses(cellDate, currentDates, classnames) {
      const classes = [];
      const start = this.start && new Date(this.start).setHours(0, 0, 0, 0);
      const end = this.end && new Date(this.end).setHours(0, 0, 0, 0);
      if (
      !/disabled|active|not-current-month/.test(classnames) &&
      start &&
      end &&
      cellDate.getTime() >= start &&
      cellDate.getTime() <= end
      ) {
      classes.push("in-range");
      }
      return classes;
    },
    disabledStartDate(date) {
      return (
      this.end &&
      new Date(date).setHours(0, 0, 0, 0) >
          new Date(this.end).setHours(0, 0, 0, 0)
      );
    },
    disabledEndDate(date) {
      return (
      this.start &&
      new Date(date).setHours(0, 0, 0, 0) <
          new Date(this.start).setHours(0, 0, 0, 0)
      );
    },
    disabledStartTime(date) {
      return this.end && date > this.end;
    },
    disabledEndTime(date) {
      return this.start && date < this.start;
    },
    validate() {

      if(this.start === null && this.end === null) {
        this.valid = true;
        return;
      }

      if(this.start === null) {
        this.valid = true;
        return;
      }

      if(this.end === null) {
        this.valid = true;
        return;
      }

      if(this.product_id === null && this.freq) {
        this.valid = true;
        return;
      }

      this.toast.msg = 'Validating ...';
      this.toast.show = true;

      if(this.start !== null && this.end !== null) {
        this.valid = false;
        Vue.axios.post('admin/user-by-date', {
          'start': this.start,
          'end': this.end,
          'product_id': this.product_id,
          "freq": this.freq,
          "payment": this.payments,
          "account": this.accounts,
          "option": this.option
        })
        .then((res) => {
          this.result = res.data.data.count;
          this.toast.show = true;
          this.toast.msg = 'Result fetched successully';
          this.valid = true;
        })
        .catch((e) => {
          this.toast.show = true;
          this.toast.msg = e.body.message;
        });
      }
      
    },
    onChange(event) {
      
    },
    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', // Change this to your desired currency code
      });
      return formatter.format(amount);
    },
  },
};
</script>

<style scoped>
.grey.darken-2 {
  margin-top: 180px;
}
.mx-datepicker-main {
    top: 123.5px !important;
    left: 202px !important;
}
input.mx-input{
  border: 1px solid;
}

#datePicker {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  margin-top: 60px;
}
.active1 {
  background: #ff0000;
}
.in-range1 {
  background: #ffaaaa;
}
.active2 {
  background: #00ff00;
}
.in-range2 {
  background: #aaffaa;
}
</style>
