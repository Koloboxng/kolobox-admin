<template>
  <v-app>
    <v-container fluid>
      <v-flex xs10 ml-4 mt-2>
        <h1>Update User Wallet</h1>
        <v-flex mt-4>
          <v-card max-height="300px">
            <v-layout justify-center>
              <v-flex xs10>
                <v-form ref="form" v-model="validDialog" lazy-validation>
                  <v-text-field
                    prepend-icon="map"
                    v-model="form.amount"
                    label="Amount To Add"
                    required
                  ></v-text-field>
                  <v-select
                    v-if="getProducts"
                    v-model="form.product_id"
                    :items="transformProduct(getProducts)"
                    item-text="text"
                    item-value="value"
                    required
                    label="Select Product"
                  ></v-select>
                  <v-btn
                    :disabled="!validDialog"
                    color="primary"
                    @click="validate"
                  >{{running ? 'UPDATING...' : 'UPDATE AND TRIGGER RECEIPT'}}</v-btn>
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
import productMixin from '../mixins/products.mixin';

export default {
  mixins: [productMixin],
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      valid: true,
      form: {
        product_id: '',
        user_id: this.id || '',
        amount: '',
      },
      toast: {
        show: false,
        msg: '',
      },
      validDialog: true,
      running: false,
    };
  },
  created() {
    this.getAllProducts();
  },
  methods: {
    ...mapActions(['getAllProducts']),
    validate() {
      if (this.$refs.form.validate()) {
        this.running = true;
        const { form } = this;
        this.$http
          .post('admin/user/wallet', form)
          .then((res) => {
            alert('Successfully Updated!');
            this.running = false;
            this.validDialog = false;
            this.$store.dispatch('getSingleUser', {id: this.id})
          })
          .catch((e) => {
            this.toast.msg = e.data.data.msg;
            this.toast.show = true;
          });
      }
    },
  },
  computed: {
    ...mapGetters(['getProducts']),
  },
};
</script>
