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
              :items="getUsers"
              :search="search"
              class="elevation-1"
              v-if="getUsers"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.phone }}</td>
                <td>{{ props.item.firstname }} {{props.item.lastname}}</td>
                <td></td>
                <td></td>
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
          text: 'Phone Number',
          value: 'phone',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Name',
          value: 'firstname',
          align: 'left',
          sortable: true,
        },
        {},
        {},
        {},
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
