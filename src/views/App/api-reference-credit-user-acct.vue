<template>
  <v-app>
    <v-container fluid>
      <v-flex xs10 ml-4 mt-2>
        <h1>API Reference Credit User Account</h1>
        <v-flex mt-4>
          <v-card>
            <v-layout justify-center>
              <v-flex xs10>
                <v-form ref="form" v-model="valid" lazy-validation>

                  <v-text-field
                    v-model="form.reference"
                    :rules="requiredRules"
                    label="Reference Id"
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
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import productMixin from '../../mixins/products.mixin';

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
      form: {
        reference: '',
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
        this.toast.msg = `Crediting user with payment reference id: ${this.form.reference} ...`;
        this.toast.show = true;
        this.valid = false;
        Vue.axios.post('admin/api-reference-credit', {
          reference: this.form.reference,
        }).then(( res ) => {
          if (res.status) {
            this.toast.msg = `Success: ${res.data.data}`;
            this.toast.show = true;
            this.valid = true;
            // router.push('/index/credit-account'); all-transactions
            window.location.reload();
          }
        }).catch(( e ) => {
          this.toast.msg = `Error: ${e.data.message}`;
          this.toast.show = true;
          this.valid = true;
        });

      }
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>
