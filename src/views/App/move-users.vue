<template>
  <v-app>
    <v-container fluid>
      <v-flex xs10 ml-4 mt-2>
        <!-- <h1>Move All Users</h1>
        <v-flex mt-4>
          <v-card v-if="getProducts">
            <v-layout justify-center>
              <v-flex xs10>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-select
                    label="Move Users From"
                    :items="getProducts"
                    item-value="id"
                    item-text="name"
                    v-model="form.old_product_id"
                    :rules="requiredRules"
                    required
                  ></v-select>
                  <v-select
                    label="To"
                    :items="getProducts"
                    item-value="id"
                    item-text="name"
                    v-model="form.new_product_id"
                    :rules="requiredRules"
                    required
                  ></v-select>
                  <v-btn :disabled="!valid" color="primary" @click="validate">Move</v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex> -->


        <h1>Move User Product</h1>
        <v-flex mt-4>
          <v-card v-if="getProducts">
            <v-layout justify-center>
              <v-flex xs10>
                <v-form ref="formSMP" v-model="valid" lazy-validation>
                  <v-select
                    label="Move Users From"
                    :items="getProducts"
                    item-value="id"
                    item-text="name"
                    v-model="formSMP.old_product_id"
                    :rules="requiredRules"
                    required
                  ></v-select>
                  <v-select
                    label="To"
                    :items="getProducts"
                    item-value="id"
                    item-text="name"
                    v-model="formSMP.new_product_id"
                    :rules="requiredRules"
                    required
                  ></v-select>
                  <v-text-field 
                    v-model="formSMP.user_email" :rules="emailRules" label="Email" required>
                  </v-text-field>
                  <v-btn :disabled="!validForm" color="primary" @click="validateForm">Move</v-btn>
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
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      validForm: true,
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid',
      ],
      requiredRules: [v => !!v || 'This Field is required'],
      form: {
        old_product_id: '',
        new_product_id: '',
      },
      formSMP: {
        old_product_id: '',
        new_product_id: '',
        user_email: ''
      },
      toast: {
        show: false,
        msg: '',
      },
    };
  },
  methods: {
    ...mapActions(['moveUsers', 'getAllProducts', 'moveSingleUserProduct']),
    validate() {
      if (this.$refs.form.validate()) {
        this.toast.msg = 'Moving ...';
        this.toast.show = true;
        this.moveUsers({
          form: this.form,
          snackbar: this.toast,
        });
      }
    },
    validateForm() {
      if (this.$refs.formSMP.validate()) {
        this.toast.msg = 'Moving ...';
        this.toast.show = true;
        this.moveSingleUserProduct({
          form: this.formSMP,
          snackbar: this.toast,
        }).then(res => {
          setTimeout(() => {
            location.reload();
          }, 7000);
        });
      }
    },
  },
  computed: {
    ...mapGetters(['getProducts']),
  },
  created() {
    this.getAllProducts();
  },
};
</script>
