<template>
  <v-app>
    <v-container fluid>
      <v-flex xs10 ml-4 mt-2>
        <h1>Register</h1>
        <v-flex mt-4>
          <v-card>
            <v-layout justify-center>
              <v-flex xs10>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="form.firstname" label="First Name" required></v-text-field>
                  <v-text-field v-model="form.lastname" label="Last Name" required></v-text-field>
                  <v-text-field v-model="form.email" :rules="emailRules" label="Email" required></v-text-field>
                  <v-text-field v-model="form.phone" label="Phone" required></v-text-field>
                  <v-text-field
                    v-model="form.password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.cpassword"
                    :rules="cpasswordRules"
                    label="Confirm Password"
                    type="password"
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
import Vue from 'vue';

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
      cpasswordRules: [
        v => !!v || 'Please Confirm password',
        v => v === this.form.password || 'Passwords dont match',
      ],
      form: {
        firstname: '',
        lastname: '',
        email: '',
        cpassword: '',
        phone: '',
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
        this.toast.msg = 'Creating ...';
        this.toast.show = true;
        Vue.axios.post('auth/admin/create', {
          "firstname": this.form.firstname,
          "lastname": this.form.lastname,
          "email": this.form.email,
          "cpassword": this.form.cpassword,
          "phone": this.form.phone,
          "password": this.form.password
        })
        .then((res) => {
          if(res.data) {
            this.toast.show = true;
            this.toast.msg = "Account created successully";
            setTimeout(
              window.location.href = '/'
              , 3000
            );
          }
          /* this.toast.show = true;
          this.toast.msg = res.data.data.msg; */
        })
        .catch((e) => {
          this.toast.show = true;
          this.toast.msg = e.data.message;
        })
      }
    },
  },
};
</script>
