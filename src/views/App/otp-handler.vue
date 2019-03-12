<template>
  <v-app>
    <v-dialog v-model="finalizeDialog" width="500">
      <v-card>
        <v-card-title>Finalize OTP</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="form.otp" label="Enter OTP sent to phone" required></v-text-field>
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="validate();finalizeDialog = false;"
            >Finalize</v-btn>
            <v-btn class="red --text" flat @click="finalizeDialog = false;">CANCEL</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="disableDialog" width="500">
      <v-card>
        <v-card-title>Disable OTP</v-card-title>
        <v-card-text>
          This endpoint should be called on app set-up, failure to call
          this endpoint, no user of the application will not be able to cash out
          after calling this endpoint you should get an otp in the
          official phone number used in creating account on paystack
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click="disableOtp();disableDialog = false;" class="green --text">Disable</v-btn>
          <v-btn class="red --text" flat @click="disableDialog = false;">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="enableDialog" width="500">
      <v-card>
        <v-card-title>Enable OTP</v-card-title>
        <v-card-text>
          In the event that a admin wants to stop being able to complete transfers without OTP,
          this is useful if we dont want any user to be to transfer out of the application
          this endpoint helps turn OTP requirement back on. No arguments required.
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click="enableOtp();enableDialog = false;" class="green --text">Enable</v-btn>
          <v-btn class="red --text" flat @click="enableDialog = false;">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container fluid>
      <v-flex mt-2>
        <h1>Handle OTP</h1>
        <v-flex mt2>
          <v-data-table :headers="headers" :items="Otp" class="elevation-1">
            <template slot="items">
              <td>
                <v-btn
                  color="error"
                  class="red --text"
                  flat
                  slot="activator"
                  @click="disableDialog = true;"
                >Disable OTP</v-btn>
              </td>
              <td>
                <v-btn
                  class="green --text"
                  flat
                  slot="activator"
                  @click="enableDialog = true;"
                >Enable OTP</v-btn>
              </td>
              <td>
                <v-btn
                  class="blue --text"
                  flat
                  slot="activator"
                  @click="finalizeDialog = true;"
                >Finalize OTP</v-btn>
              </td>
            </template>
          </v-data-table>
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
  name: 'OtpHandler',
  data() {
    return {
      Otp: ['Handle OTP'],
      form: {
        otp: '',
      },
      toast: {
        msg: '',
        show: false,
      },
      disableDialog: false,
      enableDialog: false,
      finalizeDialog: false,
      valid: true,
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.finalizeOtp();
      }
    },
    finalizeOtp() {
      this.toast.msg = 'Finalizing...';
      this.toast.show = true;
      this.axios
        .post('payment/disable/otp/finalize', { otp: this.form.otp })
        .then((res) => {
          this.toast.msg = res.data.data.msg;
        })
        .catch((e) => {
          this.toast.msg = e.data.data.msg;
        })
        .finally((this.toast.show = true));
    },
    enableOtp() {
      this.toast.msg = 'Enabling...';
      this.toast.show = true;
      this.axios
        .post('payment/enable/otp')
        .then((res) => {
          this.toast.msg = res.data.data.msg;
        })
        .catch((e) => {
          this.toast.msg = e.data.data.msg;
        })
        .finally((this.toast.show = true));
    },
    disableOtp() {
      this.toast.msg = 'Disabling...';
      this.toast.show = true;
      this.axios
        .post('payment/disable.otp')
        .then((res) => {
          this.toast.msg = res.data.data.msg;
        })
        .catch((e) => {
          this.toast.msg = e.data.data.msg;
        })
        .finally((this.toast.show = true));
    },
  },
};
</script>

<style scoped>
.grey.darken-2 {
  margin-top: 160px;
}
</style>
