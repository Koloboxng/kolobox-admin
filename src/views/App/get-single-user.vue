<template>
  <single-user :user="user"/>
</template>

<script>
import singleUser from '@/components/singleUser.vue';

export default {
  components: {
    singleUser,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    if (this.$route.params.user) this.user = this.$route.params.user;
  },
};
</script>
