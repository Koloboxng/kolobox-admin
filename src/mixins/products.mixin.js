export default {
  methods: {
    transformProduct(products) {
      const solution = [];
      products.forEach((product) => {
        solution.push({
          text: product.name,
          value: product.id,
        });
      });
      return solution;
    },
  },
};
