<template>
  <single-role :role="role"/>
</template>

<script>
import singleRole from '@/components/singleRoleDetails';

export default {
  components: {
    singleRole,
  },
  data() {
    return {
      role: null,
    };
  },
  created() {
    if (this.$route.params.role) {
      this.role = this.$route.params.role
    };
  },
};
</script>
