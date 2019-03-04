<template>
  <v-app>
    <v-container fluid>
      <v-flex xs10 ml-4 mt-2>
        <h1>Create Product Category</h1>
        <v-flex mt-4>
          <v-card>
            <v-layout justify-center>
              <v-flex xs10>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="form.name"
                    :rules="requiredRules"
                    label="Name of Product Category"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.performance[0]['value']"
                    label="Value for performance in 1st year"
                    :rules="requiredRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.performance[1]['value']"
                    label="Value for performance in 2nd year"
                    :rules="requiredRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.performance[2]['value']"
                    label="Value for performance in 3rd year"
                    :rules="requiredRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.benefits"
                    :rules="requiredRules"
                    label="Benefits"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.interest_rate"
                    :rules="requiredRules"
                    label="Interest Rate"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.minimum_requirement"
                    :rules="requiredRules"
                    label="Minimum Requirement"
                    required
                  ></v-text-field>
                  <v-text-field v-model="form.tenor" :rules="requiredRules" label="Tenor" required></v-text-field>
                  <v-text-field
                    v-model="form.investement_approach_id"
                    :rules="requiredRules"
                    label="Tenor"
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
      requiredRules: [v => !!v || 'This Field is required'],
      form: {
        name: '',
        performance: [
          {
            data: 'year 1',
            value: 0,
          },
          {
            data: 'year 2',
            value: 0,
          },
          {
            data: 'year 3',
            value: 0,
          },
        ],
        benefits: '',
        interest_rate: 0,
        minimum_requirement: 0,
        tenor: 0,
        investment_approach_id: 0,
      },
      toast: {
        show: false,
        msg: '',
      },
    };
  },
  methods: {
    ...mapActions(['createAdmin']),
    validate() {
      if (this.$refs.form.validate()) {
        this.toast.msg = 'Creating ...';
        this.toast.show = true;
        this.createProductCategory({
          form: this.form,
          snackbar: this.snackbar,
          router: this.$router,
        });
      }
    },
  },
};
</script>
