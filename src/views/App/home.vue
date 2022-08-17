<template>
  <v-app>
    <div v-if="!loaded">
      <loader/>
    </div>
    <v-container fluid v-else>
      <v-layout row>
        <v-flex xs3 ml-5>
          <home-card
            :title="Titles[0].name"
            :number="account.paystackBalance | currency('₦',2) | commas"
          />
        </v-flex>
        <v-flex xs3 ml-5>
          <home-card :title="Titles[1].name" :number="account.userCount | commas"/>
        </v-flex>
        <v-flex xs3 ml-5>
          <home-card :title="Titles[3].name" :number="account.userDailyCount"/>
        </v-flex>
        <v-flex xs3 ml-5>
          <home-card :title="Titles[4].name" :number="account.userWeeklyCount"/>
        </v-flex>
        <v-flex xs3 ml-5>
          <home-card :title="Titles[5].name" :number="account.userMonthlyCount"/>
        </v-flex>
        <v-flex xs3 ml-5>
          <home-card :title="Titles[2].name" :number="account.transactionCount | commas"/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import loader from '@/components/loader.vue';
import homeCard from '@/components/homeCard.vue';

export default {
  name: 'Home',
  components: {
    loader,
    homeCard,
  },
  data() {
    return {
      Titles: [
        { name: 'Total Earnings' },
        { name: 'Total Users' },
        { name: 'Total Transactions' },
        { name: 'Total Daily Registered User' },
        { name: 'Total Weekly Registered User' },
        { name: 'Total Monthly Registered User' },
      ],
    };
  },
  computed: {
    ...mapGetters(['loaded', 'account']),
  },
  created() {
    this.getProfile();
  },
  methods: {
    ...mapActions(['getProfile']),
  },
};
</script>

<style scoped>
.grey.darken-2 {
  margin-top: 180px;
}
</style>
