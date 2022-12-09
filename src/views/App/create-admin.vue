<template>
  <v-app>
    <v-container fluid>
      <v-flex xs10 ml-4 mt-2>
        <h1>Create Admin</h1>
        <v-flex mt-4>
          <v-card>
            <v-layout justify-center>
              <v-flex xs10>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="form.firstname" label="First Name" :rules="firstName" required></v-text-field>
                  <v-text-field v-model="form.lastname" label="Last Name" :rules="lastName" required></v-text-field>
                  <v-text-field v-model="form.email" :rules="emailRules" label="Email" required></v-text-field>
                  <v-text-field v-model="form.phone" :rules="phoneRules" label="Phone" required></v-text-field>
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

                  <v-select label="Role" v-model="form.role" :items="allRoles" item-text="name" item-value="id"></v-select>
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

export default {
  data() {
    return {
      valid: true,
      firstName: [
        v => !!v || 'First Name is required',
        v => (v && v.length >= 3) || 'First Name must be greater than 2 characters',
      ],
      lastName: [
        v => !!v || 'Last Name is required',
        v => (v && v.length >= 3) || 'Last Name must be greater than 2 characters',
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid',
      ],
      phoneRules: [
        v => !!v || 'Phone Number is required',
        v => /^0([89][01]|70)\d{8}$/.test(v) || 'Phone Number must be valid',
        v => (v && v.length == 11) || 'Phone Number must be valid',
        // ^(0[789][01]\d{8})$
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
        cpassword: '',
        phone: '',
        password: '',
        role: '',
      },
      toast: {
        show: false,
        msg: '',
      },
    };
  },
  computed: {
    ...mapGetters(['allRoles']),
  },
  methods: {
    ...mapActions(['createAdmin', 'getAllRoles']),
    validate() {
      if (this.$refs.form.validate()) {
        this.toast.msg = 'Creating ...';
        this.toast.show = true;
        this.createAdmin({
          form: this.form,
          toast: this.toast,
          router: this.$router,
        });
      }
    },
  },
  created() {
    this.getAllRoles();
  },
};
</script>
