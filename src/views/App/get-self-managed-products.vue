<template>
  <v-app>
    <v-flex xs11 ml-4 mt-4>
      <h1>All Products Managed By This Admin</h1>
      <v-flex mt-3 v-if="getSelfManagedProducts">
        <v-data-table :headers="headers" :items="getSelfManagedProducts" class="elevation-1">
          <template v-slot:no-data>
            <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
          </template>
          <template slot="items" slot-scope="props">
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.phone }}</td>
            <td>{{ props.item.firstname }} {{props.item.lastname}}</td>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex v-else>
        <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
      </v-flex>
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
    ...mapGetters(['getSelfManagedProducts']),
  },
  methods: {
    ...mapActions(['selfManagedProducts']),
  },
  created() {
    this.selfManagedProducts();
  },
};
</script>
