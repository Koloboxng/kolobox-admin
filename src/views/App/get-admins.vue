<template>
  <v-app>
    <v-dialog v-model="enableDialog" width="500">
      <v-card v-if="enableItem">
        <v-card-title>Toggle Admin Activeness</v-card-title>
        <v-card-text>Are you sure you want to {{enableItem.active ? 'disable' : 'enable'}} this account ?</v-card-text>
        <v-card-actions>
          <v-btn
            flat
            @click="toggleAdmin(enableItem.id);enableItem = null"
            class="green --text"
          >{{enableItem.active ? 'Disable' : 'Enable'}}</v-btn>
          <v-btn
            color="error"
            class="red --text"
            flat
            @click="enableDialog = false;enableItem = null;"
          >CANCEL</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" width="500">
      <v-card v-if="deleteItem">
        <v-card-title>Delete Admin</v-card-title>
        <v-card-text>Are you sure you want to delete the {{deleteItem.email}} account ?</v-card-text>
        <v-card-actions>
          <v-btn
            class="green --text"
            flat
            @click="deleteAdmin(deleteItem.id);deleteItem = null;"
          >YES</v-btn>
          <v-btn class="red --text" flat @click="deleteDialog = false;deleteItem = null;">NO</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex xs11 ml-4 mt-4>
      <h1>All Admins</h1>
      <v-data-table :headers="headers" :items="allAdmins" class="elevation-1" v-if="allAdmins">
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
    <v-snackbar v-model="toast.show" top right color="black">
      {{ toast.msg }}
      <v-btn flat dark small @click.native="toast.show = false">Close</v-btn>
    </v-snackbar>
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
        {},
        {},
      ],
      deleteDialog: false,
      enableDialog: false,
      deleteItem: null,
      enableItem: null,
      toast: {
        show: false,
        msg: '',
      },
    };
  },
  computed: {
    ...mapGetters(['allAdmins']),
  },
  methods: {
    ...mapActions(['getAllAdmins', 'deleteOne', 'toggleOne']),
    deleteAdmin(adminId) {
      this.toast.msg = 'Deleting...';
      this.toast.show = true;
      this.deleteOne({ id: adminId, snackbar: this.toast });
    },
    toggleAdmin(adminId) {
      this.toast.msg = 'Sending...';
      this.toast.show = true;
      this.toggleOne({ id: adminId, snackbar: this.toast });
    },
  },
  created() {
    this.getAllAdmins();
  },
};
</script>
