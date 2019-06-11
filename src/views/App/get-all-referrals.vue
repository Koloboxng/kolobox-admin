<template>
  <div v-if="!allReferrals">
    <loader/>
  </div>
  <v-app v-else>
    <v-flex xs11 ml-4 mt-4>
      <h1>All Referrals</h1>
      <h3>Number of Referrals: {{allReferrals.length}}</h3>
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
        :items="allReferrals"
        class="elevation-1"
        v-if="allReferrals"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.firstname }} {{props.item.lastname}}</td>
          <td>{{ props.item.referred_email }}</td>
          <td>{{ props.item.referrer }}</td>
          <td>{{ props.item.amount | currency('₦',2) | commas }}</td>
          <td>{{ props.item.credited }}</td>
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
          text: 'User',
          value: 'firstname',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Email',
          value: 'email',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Referred By',
          value: 'email',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Amount',
          value: 'amount',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Credited',
          value: 'credited',
          align: 'left',
          sortable: true,
        },
        {},
      ],
      toast: {
        show: false,
        msg: '',
      },
    };
  },
  computed: {
    ...mapGetters(['allReferrals']),
  },
  methods: {
    ...mapActions(['getAllReferrals']),
  },
  created() {
    this.getAllReferrals({ snackbar: this.toast });
  },
};
</script>
