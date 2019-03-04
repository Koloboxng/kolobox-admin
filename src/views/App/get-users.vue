<template>
  <v-app>
    <div v-if="!usersLoaded">
      <loader/>
    </div>
    <div v-else>
      <v-flex xs11 ml-4 mt-4>
        <h1>All Admins</h1>
        <v-data-table :headers="headers" :items="allUsers" class="elevation-1" v-if="allUsers">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.phone }}</td>
            <td>{{ props.item.firstname }} {{props.item.lastname}}</td>
            <td>
              <v-btn
                color="error"
                class="red --text"
                flat
                slot="activator"
                @click="deleteDialog = true;deleteItem = props.item"
              >Delete</v-btn>
            </td>
            <td>
              <v-btn
                :class="props.item.active ? 'blue --text' : 'green --text'"
                flat
                slot="activator"
                @click="enableDialog = true;enableItem = props.item"
              >{{props.item.active ? 'Disable' : 'Enable'}}</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </div>
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
    this.getAllUsers();
  },
};
</script>
