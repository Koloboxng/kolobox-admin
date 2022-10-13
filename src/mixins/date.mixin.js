import moment from "moment-business-days";

export default {
  methods: {
    formatDate(date) {
      return moment(date, "YYYY-MM-DD").format("Do MMM YY");
      // return new Date(date).toISOString().split('T');
    },
    getEndDate(start, days) {
      /* console.log(`start date is: ${start}`)
      console.log(`added date is: ${days}`) */
      start = new Date(start);
      start.setDate(start.getDate() + days);
      return start.toISOString().split('T')[0];
    },
    getBusinessEndDate(days) {
      const start = moment().format("DD-MM-YYYY");
      return moment(`${start}`, "DD-MM-YYYY").businessAdd(days)._d;
    }
  }
};

/* getEndDate(start, days) {
      start = new Date(start);
      start.setDate(start.getDate() + days);
      console.log(new Date(start).toISOString());
      return new Date(start).toISOString().split('T')[0];
    }, */
