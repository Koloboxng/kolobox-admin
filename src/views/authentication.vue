<template>
  <v-app>
    <v-layout justify-center>
      <v-flex xs12 sm6 ma-auto>
        <v-img :src="require('../assets/kolobox-logo.jpeg')" alt="Kolobox-logo" aspect-ratio="2"></v-img>
        <v-card>
          <v-layout justify-center>
            <v-flex xs10>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="form.username" :rules="emailRules" label="Email" required></v-text-field>
                <v-text-field
                  v-model="form.password"
                  :rules="passwordRules"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
                <v-btn :disabled="!valid" color="primary" @click="validate">Login</v-btn>
                <router-link class="link mt-3" to="/forgot-password">Forgot password?</router-link>
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
export default {
  data() {
    return {
      valid: true,
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 6) || 'Password must be greater than 6 characters',
      ],
      form: {
        username: '',
        password: '',
        busy: false,
      },
      toast: {
        show: false,
        msg: '',
      },
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.toast.msg = 'Validating ...';
        this.toast.show = true;
        this.$auth.login(this, this.form, '/index/home', (errors) => {
          this.toast.msg = errors.data.message;
        });
      }
    },
  },
};
</script>

<style>
.link {
  float: right !important;
}
</style>
