export default {
  methods: {
    generate(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    getCurrencyFormatter() {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN', // Change this to your desired currency code
      });
    },
  },
};
