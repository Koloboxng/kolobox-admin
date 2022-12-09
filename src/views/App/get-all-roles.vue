<template>
  <div v-if="!allRoles">
    <!-- <loader/> -->
    {{ toast.msg }}
  </div>
  <v-app v-else>
    <v-dialog v-model="updateDialog" width="500">
      <v-card v-if="updateItem">
        <v-card-title>Update Role Details</v-card-title>
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
        <v-card-text>Are you sure you want to delete role {{deleteItem.name}} ?</v-card-text>
        <v-card-actions>
          <v-btn
            class="green --text"
            flat
            @click="roleDeletion(deleteItem.id);deleteItem = null;"
          >YES</v-btn>
          <v-btn class="red --text" flat @click="deleteDialog = false;deleteItem = null;">NO</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex xs11 ml-4 mt-4>
      <h1>All Roles</h1>
      <v-data-table :headers="headers" :items="allRoles" class="elevation-1" v-if="allRoles">
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
              class="green --text"
              flat
              slot="activator"
              @click="viewRoleDetails(props.item)"
            >VIEW</v-btn>
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
        v => !!v || 'Role Name is required',
        v => (v && v.length >= 3) || 'Role Name must be greater than 2 characters',
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
    ...mapGetters(['allRoles']),
  },
  methods: {
    ...mapActions(['getAllRoles', 'deleteRole', 'updateRole']),
    roleDeletion(roleId) {
      this.toast.msg = 'Deleting...';
      this.toast.show = true;
      this.deleteRole({ id: roleId, snackbar: this.toast });
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
    viewRoleDetails(item) {
      this.$router.push({
        name: 'GetSingleRoleDetails',
        params: { id: item.id, role: item },
      });
    }
  },
  created() {
    this.getAllRoles({snackbar: this.toast});
  },
};
</script>
