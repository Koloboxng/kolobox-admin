<template>
  <v-app>
    <div v-if="!getAllTransactions">
      <loader/>
    </div>
    <div v-else>
      <v-flex xs11 ml-4 mt-4>
        <h1>All Transactions</h1>
        <v-flex mt-2>
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
            <v-data-table
              :headers="headers"
              :items="getAllTransactions"
              :search="search"
              class="elevation-1"
              v-if="getAllTransactions"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.user_email }}</td>
                <td>{{ props.item.user_firstname }} {{props.item.user_lastname}}</td>
                <td>{{ props.item.product_name }}</td>
                <td>{{props.item.transaction_deposit_amount | currency('₦',2) | commas}}</td>
                <td>{{props.item.product_start_date ? props.item.product_start_date.split('T')[0] : 0}}</td>
                <td></td>
              </template>
              <v-alert
                v-slot:no-results
                :value="true"
                color="error"
                icon="warning"
              >Your search for "{{search}}" found no results.</v-alert>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-flex>
    </div>
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
      valid: true,
      headers: [
        {
          text: 'Email',
          value: 'email',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Full Name',
          value: 'firstname',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Product Name',
          value: 'product_name',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Deposit Amount',
          value: 'transaction_deposit_amount',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Start Date',
          value: 'product_start_date',
          align: 'left',
          sortable: true,
        },
      ],
    };
  },
  methods: {
    ...mapActions(['allTransactions']),
  },
  computed: {
    ...mapGetters(['getAllTransactions']),
  },
  created() {
    this.allTransactions();
  },
};
</script>

<style>
.v-datatable__actions {
  background-color: rgb(124, 119, 119) !important;
  color: white !important;
}
</style>
