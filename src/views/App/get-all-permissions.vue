<template>
  <div v-if="!allPermissions">
    <loader/>
  </div>
  <v-app v-else>
    <v-dialog v-model="updateDialog" width="500">
      <v-card v-if="updateItem">
        <v-card-title>Update Permission Details</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="form.name" :rules="name" label="Role Name" required></v-text-field>
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="validate(updateItem.id);updateItem = null;"
            >Update</v-btn>
            <v-btn class="red --text" flat @click="updateDialog = false;updateItem = null;">CANCEL</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" width="500">
      <v-card v-if="deleteItem">
        <v-card-title>Delete Role</v-card-title>
        <v-card-text>Are you sure you want to delete permission {{deleteItem.name}} ?</v-card-text>
        <v-card-actions>
          <v-btn
            class="green --text"
            flat
            @click="permissionDeletion(deleteItem.id);deleteItem = null;"
          >YES</v-btn>
          <v-btn class="red --text" flat @click="deleteDialog = false;deleteItem = null;">NO</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex xs11 ml-4 mt-4>
      <h1>All Permissions</h1>
      <v-data-table :headers="headers" :items="allPermissions" class="elevation-1" v-if="allPermissions">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
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
              class="brown --text"
              flat
              slot="activator"
              @click="populateForm(props.item);updateDialog = true;updateItem = props.item"
            >UPDATE</v-btn>
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
import loader from '@/components/loader.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    loader,
  },
  data() {
    return {
      name: [
        v => !!v || 'Permission Name is required',
        v => (v && v.length >= 3) || 'Permission Name must be greater than 2 characters',
      ],
      form: {
        name: '',
      },
      valid: true,
      headers: [
        {
          text: 'Name',
          value: 'name',
          align: 'left',
          sortable: true,
        },
        {},
        {},
      ],
      deleteDialog: false,
      updateDialog: false,
      deleteItem: null,
      updateItem: null,
      toast: {
        show: false,
        msg: '',
      },
    };
  },
  computed: {
    ...mapGetters(['allPermissions']),
  },
  methods: {
    ...mapActions(['getAllPermissions', 'deletePermission', 'updateRole']),
    permissionDeletion(permissionId) {
      this.toast.msg = 'Deleting...';
      this.toast.show = true;
      this.deletePermission({ id: permissionId, snackbar: this.toast });
    },
    validate(id) {
      if (this.$refs.form.validate()) {
        this.toast.msg = 'Updating...';
        this.toast.show = true;
        this.updateRole({
          form: this.form,
          snackbar: this.toast,
          id,
        });
      }
    },
    populateForm(item) {
      this.form = item;
    },
  },
  created() {
    this.getAllPermissions();
  },
};
</script>
