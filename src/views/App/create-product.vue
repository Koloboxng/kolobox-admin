<template>
  <v-app>
    <v-container fluid>
      <v-flex xs10 ml-4 mt-2>
        <h1>Create Product</h1>
        <v-flex mt-4>
          <v-card>
            <v-layout justify-center>
              <v-flex xs10>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="form.name" label="First Name" required></v-text-field>
                  <v-select
                    v-model="form.product_type"
                    :items="productItems"
                    :rules="requiredRules"
                    label="Product Type"
                  ></v-select>
                  <v-text-field
                    v-model="form.terms_conditions"
                    label="Terms And Conditions"
                    :rules="requiredRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.eligibility"
                    :rules="requiredRules"
                    label="Eligibility"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.benefits"
                    :rules="requiredRules"
                    label="Benefits"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.details"
                    :rules="requiredRules"
                    label="Details"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.performance"
                    :rules="requiredRules"
                    label="Performance"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.start_date"
                    :rules="requiredRules"
                    label="Start Date(eg 2017-09-12)"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.business_partner_name"
                    :rules="requiredRules"
                    label="Business Partner Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.bank_account_number"
                    :rules="requiredRules"
                    label="Bank Account Number"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.bank_account_name"
                    :rules="requiredRules"
                    label="Bank Account Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.bank_name"
                    :rules="requiredRules"
                    label="Bank Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.minimum_amount"
                    :rules="requiredRules"
                    label="Minimum Amount"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.penalty_charge"
                    :rules="requiredRules"
                    label="Penalty Charge"
                    required
                  ></v-text-field>
                  <v-text-field v-model="form.fee" :rules="requiredRules" label="Fee" required></v-text-field>
                  <v-text-field
                    v-model="form.performance_fee"
                    :rules="requiredRules"
                    label="Performance Fee"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.fee_charge_date"
                    :rules="requiredRules"
                    label="Fee Charge Date(eg 30)"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.tenor"
                    :rules="requiredRules"
                    label="Tenor(days)"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.withdrawal_minimum"
                    :rules="requiredRules"
                    label="Withdrawal Minimum"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.withdrawal_charges"
                    :rules="requiredRules"
                    label="Withdrawal Charges"
                    required
                  ></v-text-field>
                  <v-select
                    v-model="form.product_type"
                    :items="interestRateItems"
                    :rules="requiredRules"
                    label="Interest Rate Computation - Only needed for an Interest generating Product"
                  ></v-select>
                  <v-text-field
                    v-model="form.interest_rate"
                    :rules="requiredRules"
                    label="Interest Rate(eg 0.25) - Only needed for an Interest generating Product"
                  ></v-text-field>
                  <v-text-field
                    v-model="form.fallback_interest"
                    :rules="requiredRules"
                    label="Fallback Interest"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.unit_price"
                    :rules="requiredRules"
                    label="Unit Price"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.unit_price_computation"
                    :rules="requiredRules"
                    label="Unit Price Computation"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.product_category_id"
                    :rules="requiredRules"
                    label="Product Category Id"
                    required
                  ></v-text-field>
                  <v-btn :disabled="!valid" color="primary" @click="validate">Create</v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-flex>
    </v-container>
    <v-snackbar v-model="toast.show" top right color="black">
      {{ toast.msg }}
      <v-btn flat dark small @click.native="toast.show = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      requiredRules: [v => !!v || 'This field is required'],
      form: {
        name: '',
        product_type: '',
        terms_conditions: '',
        eligibility: '',
        benefits: '',
        details: '',
        performance: '',
        start_date: '',
        business_partner_name: '',
        bank_account_number: '',
        bank_account_name: '',
        minimum_amount: '',
        penalty_charge: '',
        fee: '',
        performance_fee: '',
        fee_charge_date: '',
        tenor: '',
        withdrawal_minimum: '',
        withdrawal_charges: '',
        interest_rate: '',
        interest_rate_computation: '',
        fallback_interest: '',
        unit_price: '',
        unit_price_computation: '',
        product_category_id: '',
        busy: false,
      },
      toast: {
        show: false,
        msg: '',
      },
      productItems: ['savings', 'fixed', 'money_market'],
      interestRateItems: ['daily', 'weekly', 'monthly'],
    };
  },
  methods: {
    ...mapActions(['createAdmin']),
    validate() {
      if (this.$refs.form.validate()) {
        this.toast.msg = 'Creating ...';
        this.toast.show = true;
        this.createProduct({
          form: this.form,
          snackbar: this.snackbar,
          router: this.$router,
        });
      }
    },
  },
};
</script>
