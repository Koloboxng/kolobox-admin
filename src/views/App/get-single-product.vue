<template>
  <single-product :product="product"/>
</template>

<script>
import singleProduct from '@/components/singleProduct.vue';

export default {
  components: {
    singleProduct,
  },
  data() {
    return {
      product: null,
    };
  },
  created() {
    if (this.$route.params.product) this.product = this.$route.params.product;
  },
};
</script>
