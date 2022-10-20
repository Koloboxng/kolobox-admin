<template>
  <user-group-details :group="group"/>
</template>

<script>
import userGroupDetails from '@/components/userGroupDetails.vue';

export default {
  components: {
    userGroupDetails,
  },
  data() {
    return {
      group: null,
    };
  },
  created() {
    if (this.$route.params.group) {
      this.group = this.$route.params.group
    };
  },
};
</script>
