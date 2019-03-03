<template>
  <v-app>
    <v-container fluid>
      <v-flex xs10 ml-4 mt-2>
        <h1>Move All Users</h1>
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
                    required
                  ></v-select>
                  <v-select
                    label="To"
                    :items="getProducts"
                    item-value="id"
                    item-text="name"
                    v-model="form.new_product_id"
                    required
                  ></v-select>
                  <v-btn :disabled="!valid" color="primary" @click="validate">Move</v-btn>
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
      requiredRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid',
      ],
      form: {
        old_product_id: '',
        new_product_id: '',
      },
      toast: {
        show: false,
        msg: '',
      },
    };
  },
  methods: {
    ...mapActions(['moveUsers', 'getAllProducts']),
    validate() {
      if (this.$refs.form.validate()) {
        this.toast.msg = 'Moving ...';
        this.toast.show = true;
        this.moveUsers({
          form: this.form,
          snackbar: this.snackbar,
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
