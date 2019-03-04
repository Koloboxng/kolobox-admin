<template>
  <v-app>
    <v-container fluid>
      <v-flex xs10 ml-4 mt-2>
        <h1>Create Investment Approach</h1>
        <v-flex mt-4>
          <v-card>
            <v-layout justify-center>
              <v-flex xs10>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="form.name"
                    label="Name of Investment Approach"
                    rules="[v => !!v || 'This Field is required']"
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
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      form: {
        name: '',
        busy: false,
      },
      toast: {
        show: false,
        msg: '',
      },
    };
  },
  methods: {
    ...mapActions(['createInvestmentApproach']),
    validate() {
      if (this.$refs.form.validate()) {
        this.toast.msg = 'Creating ...';
        this.toast.show = true;
        this.createInvestmentApproach({
          form: this.form,
          snackbar: this.snackbar,
          router: this.$router,
        });
      }
    },
  },
};
</script>
