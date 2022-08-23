<template>
  <v-app>
    <div v-if="!loaded">
      <loader/>
    </div>
    <v-container fluid v-else>
      <div id="datePicker">
        <date-picker
          v-model="start"
          :get-classes="getRangeClasses"
          :default-value="end || new Date()"
          :disabled-date="disabledStartDate"
          :disabled-time="disabledStartTime"
          type="date"
        ></date-picker>
        <date-picker
          v-model="end"
          :get-classes="getRangeClasses"
          :default-value="start || new Date()"
          :disabled-date="disabledEndDate"
          :disabled-time="disabledEndTime"
          type="date"
        ></date-picker>
        <v-btn :disabled="!valid" color="primary" @click="validate">Search</v-btn>
        <v-flex xs3 ml-5>
          <home-card
            :title="title"
            :number="result"
          />
        </v-flex>
      </div>
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
import Vue from 'vue';

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
      ],
      valid: true,
      start: null,
      end: null,
      result: 0,
      title: '',
      toast: {
        show: false,
        msg: '',
      },
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
    getRangeClasses(cellDate, currentDates, classnames) {
      const classes = [];
      const start = this.start && new Date(this.start).setHours(0, 0, 0, 0);
      const end = this.end && new Date(this.end).setHours(0, 0, 0, 0);
      if (
      !/disabled|active|not-current-month/.test(classnames) &&
      start &&
      end &&
      cellDate.getTime() >= start &&
      cellDate.getTime() <= end
      ) {
      classes.push("in-range");
      }
      return classes;
    },
    disabledStartDate(date) {
      return (
      this.end &&
      new Date(date).setHours(0, 0, 0, 0) >
          new Date(this.end).setHours(0, 0, 0, 0)
      );
    },
    disabledEndDate(date) {
      return (
      this.start &&
      new Date(date).setHours(0, 0, 0, 0) <
          new Date(this.start).setHours(0, 0, 0, 0)
      );
    },
    disabledStartTime(date) {
      return this.end && date > this.end;
    },
    disabledEndTime(date) {
      return this.start && date < this.start;
    },
    validate() {

      if(this.start === '' && this.end === '') {
        this.valid = true;
        return;
      }

      if(this.start === '') {
        this.valid = true;
        return;
      }

      if(this.end === '') {
        this.valid = true;
        return;
      }

      this.toast.msg = 'Validating ...';
      this.toast.show = true;

      if(this.start !== '' && this.end !== '') {
        this.valid = false;
        Vue.axios.post('admin/user-by-date', {
          'start': this.start,
          'end': this.end
        })
        .then((res) => {
          this.result = res.data.data.count;
          this.toast.show = true;
          this.toast.msg = 'Result fetched successully';
          this.valid = true;
        })
        .catch((e) => {
          this.toast.show = true;
          this.toast.msg = e.body.message;
        });
      }
      
    }
  },
};
</script>

<style scoped>
.grey.darken-2 {
  margin-top: 160px;
}
.mx-datepicker-main {
    top: 123.5px !important;
    left: 202px !important;
}
input.mx-input{
  border: 1px solid;
}

#datePicker {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  margin-top: 60px;
}
.active1 {
  background: #ff0000;
}
.in-range1 {
  background: #ffaaaa;
}
.active2 {
  background: #00ff00;
}
.in-range2 {
  background: #aaffaa;
}
</style>
