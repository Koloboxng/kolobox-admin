<template>
  <v-app>
    <v-flex xs11 ml-4 mt-4>
      <h1>All Products Managed By This Admin</h1>
      <v-data-table
        :headers="headers"
        :items="allSelfManagedProducts"
        class="elevation-1"
        v-if="allSelfManagedProducts"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.phone }}</td>
          <td>{{ props.item.firstname }} {{props.item.lastname}}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      headers: [
        {
          text: 'Email',
          value: 'email',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Phone Number',
          value: 'phone',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Name',
          value: 'firstname',
          align: 'left',
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['allSelfManagedProducts']),
  },
  methods: {
    ...mapActions(['getAllSelfManagedProducts']),
  },
  created() {
    this.getAllSelfManagedProducts();
  },
};
</script>
