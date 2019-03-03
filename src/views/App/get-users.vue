<template>
  <v-app>
    <div v-if="!usersLoaded">
      <loader/>
    </div>
    <div v-else></div>
  </v-app>
</template>

<script>
import loader from '@/components/loader.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    loader,
  },
  data() {
    return {
      usersLoaded: false,
    };
  },
  methods: {
    ...mapActions(['getAllUsers']),
  },
  computed: {
    ...mapGetters(['allUsers']),
  },
  created() {
    this.getAllUsers({ usersLoaded: this.usersLoaded });
  },
};
</script>
