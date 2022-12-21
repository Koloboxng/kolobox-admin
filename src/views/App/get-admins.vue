<template>
  <div v-if="!allAdmins">
    <!-- <loader/> -->
    {{ toast.msg }}
  </div>
  <v-app v-else>
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

    <v-dialog v-model="updateDialog" width="500">
      <v-card v-if="updateItem">
        <v-card-title>Update Admin Details</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="form.firstname" :rules="firstName" label="First Name" required></v-text-field>
            <v-text-field v-model="form.lastname" :rules="lastName" label="Last Name" required></v-text-field>
            <v-text-field v-model="form.email" :rules="emailRules" label="Email" required></v-text-field>
            <v-text-field v-model="form.phone" :rules="phoneRules" label="Phone" required></v-text-field>
            <v-select label="Role" v-model="form.role_id" :rules="requiredRule" :items="allRoles" item-text="name" item-value="id" required></v-select>
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

    <v-dialog v-model="passwordDialog" width="500">
      <v-card v-if="passwordItem">
        <v-card-title>Reset Admin Password</v-card-title>
        <v-card-text>
          <v-form ref="resetForm" v-model="valid" lazy-validation>
            <v-text-field v-model="resetForm.password" :rules="passwordRules" type="password" label="Password" required></v-text-field>
            <v-text-field v-model="resetForm.cpassword" :rules="cpasswordRules" type="password" label="Confirm Password" required></v-text-field>
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="validateResetPassword(passwordItem.id);passwordItem = null;"
            >Update</v-btn>
            <v-btn class="red --text" flat @click="passwordDialog = false;passwordItem = null;">CANCEL</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>


    <v-flex xs12 ml-2 mt-4>
      <h1>All Admins</h1>
      <v-data-table :headers="headers" :items="allAdmins" class="elevation-1" v-if="allAdmins">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.phone }}</td>
          <td>{{ props.item.firstname }} {{props.item.lastname}}</td>
          <td>
            <v-btn
              color="error"
              class="brown --text"
              flat
              slot="activator"
              @click="populateForm(props.item);updateDialog = true;updateItem = props.item"
            >Update</v-btn>
          </td>
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
          <td>
            <v-btn
              class="green --text"
              flat
              slot="activator"
              @click="passwordDialog = true;passwordItem = props.item"
            >Password</v-btn>
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
        {},
      ],
      deleteDialog: false,
      enableDialog: false,
      updateDialog: false,
      passwordDialog: false,
      deleteItem: null,
      enableItem: null,
      updateItem: null,
      passwordItem: null,
      form: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        role_id: '',
      },
      resetForm: {
        password: '',
        cpassword: '',
      },
      toast: {
        show: false,
        msg: '',
      },
      valid: true,
      firstName: [
        v => !!v || 'First Name is required',
        v => (v && v.length >= 3) || 'First Name must be greater than 2 characters',
      ],
      lastName: [
        v => !!v || 'Last Name is required',
        v => (v && v.length >= 3) || 'Last Name must be greater than 2 characters',
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid',
      ],
      phoneRules: [
        v => !!v || 'Phone Number is required',
        v => /^0([89][01]|70)\d{8}$/.test(v) || 'Phone Number must be valid',
        v => (v && v.length == 11) || 'Phone Number must be valid',
        // ^(0[789][01]\d{8})$
      ],
      requiredRule: [
        v => !!v || 'Role is required',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 6) || 'Password must be greater than 6 characters',
      ],
      cpasswordRules: [
        v => !!v || 'Please Confirm password',
        v => v === this.resetForm.password || 'Passwords dont match',
      ],
    };
  },
  computed: {
    ...mapGetters(['allAdmins', 'allRoles']),
  },
  methods: {
    ...mapActions(['getAllAdmins', 'deleteOne', 'toggleOne', 'updateAdmin', 'getAllRoles', 'resetAdminPassword']),
    deleteAdmin(adminId) {
      this.deleteDialog = false
      this.deleteItem = null
      this.toast.msg = 'Deleting...';
      this.toast.show = true;
      this.deleteOne({ id: adminId, snackbar: this.toast });
    },
    toggleAdmin(adminId) {
      this.toast.msg = 'Sending...';
      this.toast.show = true;
      this.enableDialog = false;
      this.enableItem = null;
      this.toggleOne({ id: adminId, snackbar: this.toast });
    },
    populateForm(item) {
      this.form.firstname = item.firstname;
      this.form.lastname = item.lastname;
      this.form.email = item.email;
      this.form.phone = item.phone;
      this.form.role_id = item.role_id ? this.selectedRole(item.role_id).id : ''

    },
    validate(id) {
      if (this.$refs.form.validate()) {
        if (this.form.firstname !== "" && this.form.lastname !== "" && this.form.email !== "" &&
          this.form.phone !== "" && this.form.role_id !== "") {
            this.updateDialog = false
            this.updateItem = null
            this.toast.msg = 'Updating...';
            this.toast.show = true;
            this.updateAdmin({
              form: this.form,
              snackbar: this.toast,
              id,
            });
        } else {
          return
        }
      }
    },
    validateResetPassword(id) {
      if (this.$refs.resetForm.validate()) {
        if (this.resetForm.password !== "" && this.resetForm.cpassword !== "" &&
          this.resetForm.password === this.resetForm.cpassword) {
            this.passwordDialog = false
            this.passwordItem = null
            this.toast.msg = 'Resetting Admin User Password...';
            this.toast.show = true;
            this.resetAdminPassword({
              form: this.resetForm,
              snackbar: this.toast,
              id,
            });
        } else {
          return
        }
      }
    },
    selectedRole(role) {
      return this.allRoles.find(x => x.id === role);
    }
  },
  created() {
    this.getAllAdmins({snackbar: this.toast});
    this.getAllRoles({snackbar: this.toast});
  },
};
</script>
