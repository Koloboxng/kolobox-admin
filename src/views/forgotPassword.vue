<template>
  <v-app>
    <v-layout justify-center>
      <v-flex xs12 sm6 ma-auto>
        <v-card>
          <v-layout justify-center>
            <v-flex xs10>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="form.emailPhone" :rules="emailRules" label="Email" required></v-text-field>
                <v-btn :disabled="!valid" color="primary" @click="validate">Submit</v-btn>
                <router-link class="link mt-3" to="/">Login</router-link>
              </v-form>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
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
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid',
      ],
      form: {
        emailPhone: '',
      },
      toast: {
        show: false,
        msg: '',
      },
    };
  },
  methods: {
    ...mapActions(['forgotPassword']),
    validate() {
      if (this.$refs.form.validate()) {
        this.toast.msg = 'Submitting ...';
        this.toast.show = true;
        const { form, toast } = this;
        this.forgotPassword({ form, toast });
      }
    },
  },
};
</script>
