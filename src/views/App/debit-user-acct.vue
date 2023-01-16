<template>
  <v-app>
    <v-container fluid>
      <v-flex xs10 ml-4 mt-2>
        <h1>Debit User Account</h1>
        <v-flex mt-4>
          <v-card>
            <v-layout justify-center>
              <v-flex xs10>
                <v-form ref="form" v-model="valid" lazy-validation>

                  <v-select
                    v-if="allProduct"
                    v-model="form.product_id"
                    :items="transformProduct(allProduct)"
                    item-text="text"
                    item-value="value"
                    required
                    label="Select Product"
                    :rules="requiredRules"
                  ></v-select>

                  <v-text-field
                    v-model="form.user_email" :rules="emailRules" label="Email" required>
                  </v-text-field>

                  <v-text-field
                    v-model="form.amount"
                    :rules="amountRules"
                    label="Amount to Debit"
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
import { mapActions, mapGetters } from 'vuex';
import productMixin from '../../mixins/products.mixin';
import Vue from 'vue';

export default {
  mixins: [productMixin],
  data() {
    return {
      valid: true,
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid',
      ],
      requiredRules: [v => !!v || 'This Field is required'],
      amountRules: [v => !!v && v >= 1000 || 'This Field is required'],
      form: {
        product_id: '',
        user_email: '',
        amount: 0,
      },
      toast: {
        show: false,
        msg: '',
      },
    };
  },
  computed: {
    ...mapGetters(['allProduct']),
  },
  methods: {
    ...mapActions(['getAllProducts']),
    validate() {
      if (this.$refs.form.validate()) {
        this.toast.msg = `Debiting user with emal: ${this.form.user_email} ...`;
        this.toast.show = true;
        this.valid = false
        Vue.axios.post('admin/debit-user-acct', {
          product_id: this.form.product_id,
          user_email: this.form.user_email,
          amount: this.form.amount,
        }).then(res => {
          console.log({res});
          if(res.status) {
            this.toast.msg = res.data.data ? `Success: ${res.data.data}`: `Success: ${this.form.user_email} Account Debited` ;
            this.toast.show = true;
            this.valid = true
            window.location.reload();
          }
        }).catch(e => {
          console.log({e})
          this.toast.msg = `Error: ${e.data.message}`;
          this.toast.show = true;
          this.valid = true
        });

      }
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>
