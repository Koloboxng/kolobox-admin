export default {
  methods: {
    getEndDate(start, days) {
      start = new Date(start);
      start.setDate(start.getDate() + days);
      console.log(new Date(start).toISOString());
      return new Date(start).toISOString().split('T')[0];
    },
  },
};
