<template>
  <div v-if="!allSubscriptions">
    <loader/>
  </div>
  <v-app v-else>
    <v-flex xs11 ml-4 mt-4>
      <h1>All Subscriptions</h1>
      <h3>Number of Subscriptions: {{allSubscriptions.length}}</h3>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="allSubscriptions"
        class="elevation-1"
        v-if="allSubscriptions"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.deposit_amount | currency('₦',2) | commas }}</td>
          <td>{{ props.item.saving_frequency }}</td>
          <td>{{props.item.auto_subscription}}</td>
          <td>{{props.item.last_pay_day.split('T')[0]}}</td>
          <td>{{props.item.next_pay_day.split('T')[0]}}</td>
          <td>{{getActualProduct(props.item.product_id)}}</td>
        </template>
        <v-alert
          v-slot:no-results
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{search}}" found no results.</v-alert>
      </v-data-table>
    </v-flex>
    <v-snackbar v-model="toast.show" top right color="black">
      {{ toast.msg }}
      <v-btn flat dark small @click.native="toast.show = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import loader from '@/components/loader.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    loader,
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Email',
          value: 'email',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Amount',
          value: 'deposit_amount',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Frequency',
          value: 'saving_frequency',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Auto Sub',
          value: 'auto_subscription',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Last Pay Day',
          value: 'last_pay_day',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Next Pay Day',
          value: 'next_pay_day',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Product',
          value: 'product_id',
          align: 'left',
          sortable: true,
        },
      ],
      toast: {
        show: false,
        msg: '',
      },
    };
  },
  computed: {
    ...mapGetters(['allSubscriptions', 'getProducts']),
  },
  methods: {
    ...mapActions(['getAllSubscriptions', 'getAllProducts']),
    getActualProduct(item) {
      return this.getProducts.find(x => x.id === item).name;
    },
  },
  created() {
    this.getAllSubscriptions({ snackbar: this.toast });
    this.getAllProducts();
  },
};
</script>
