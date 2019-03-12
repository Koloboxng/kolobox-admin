<template>
  <v-app>
    <v-container fluid>
      <v-flex xs10 ml-4 mt-2>
        <h1>Update Password</h1>
        <v-flex mt-4>
          <v-card>
            <v-layout justify-center>
              <v-flex xs10>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="form.new_password"
                    :rules="passwordRules"
                    label="New Password"
                    type="password"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.new_cpassword"
                    :rules="cpasswordRules"
                    label="Confirm Password"
                    type="password"
                    required
                  ></v-text-field>
                  <v-btn :disabled="!valid" color="primary" @click="validate">Update</v-btn>
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
export default {
  data() {
    return {
      valid: true,
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 6) || 'Password must be greater than 6 characters',
      ],
      cpasswordRules: [
        v => !!v || 'Please Confirm password',
        v => v === this.form.new_password || 'Passwords dont match',
      ],
      form: {
        new_cpassword: '',
        new_password: '',
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
        this.toast.msg = 'Updating ...';
        this.toast.show = true;
        this.axios
          .post('auth/admin/password_reset/change_password', {
            form: this.form,
          })
          .then((res) => {
            this.toast.msg = res.data.data.msg;
          })
          .catch((e) => {
            this.toast.msg = e.data.data.msg;
          })
          .finally((this.toast.show = true));
      }
    },
  },
};
</script>
