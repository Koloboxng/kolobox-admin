<template>
  <v-app>
    <v-container fluid>
      <v-flex mt-2 ml-1>
        <h1>Endpoint for Paystack Integration</h1>
      </v-flex>
      <v-flex>
        <v-btn color="primary" @click="integrate">Integrate</v-btn>
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
      toast: {
        msg: '',
        show: true,
      },
    };
  },
  methods: {
    integrate() {
      this.toast.msg = 'Integrating...';
      this.toast.show = true;
      this.axios.post('paystack/events/callback').then((res) => {
        this.toast.msg = res.data.data.msg;
      });
    },
  },
};
</script>
