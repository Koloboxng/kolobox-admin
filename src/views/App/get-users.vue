<template>
  <v-app>
    <v-dialog v-model="updateDialog" width="500">
      <v-card v-if="updateItem">
        <v-card-title>Update User Details</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="form.firstname" label="First Name" required></v-text-field>
            <v-text-field v-model="form.lastname" label="Last Name" required></v-text-field>
            <v-text-field v-model="form.email" :rules="emailRules" label="Email" required></v-text-field>
            <v-text-field v-model="form.phone" :rules="phoneRules" label="Phone" required></v-text-field>
            <v-text-field v-model="form.dob" label="Date of birth" required></v-text-field>
            <v-text-field v-model="form.occupation" label="Occupation" required></v-text-field>
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
    <v-dialog v-model="toggleDialog" width="500">
      <v-card v-if="toggleItem">
        <v-card-title>Toggle User Activeness</v-card-title>
        <v-card-text>Are you sure you want to {{toggleItem.active ? 'disable' : 'enable'}} this account ?</v-card-text>
        <v-card-actions>
          <v-btn
            flat
            @click="toggleSingleUser(toggleItem.id);toggleItem = null"
            class="green --text"
          >{{toggleItem.active ? 'Disable' : 'Enable'}}</v-btn>
          <v-btn class="red --text" flat @click="toggleDialog = false;toggleItem = null;">CANCEL</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="!getUsers">
      <loader/>
    </div>
    <div v-else>
      <v-flex xs12 ml-4 mt-4>
        <h1>All Users</h1>
        <v-flex mt-2>
          <v-card>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="getUsers"
              :search="search"
              class="elevation-1"
              v-if="getUsers"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.phone }}</td>
                <td>{{ props.item.firstname }} {{props.item.lastname}}</td>
                <td>
                  <v-btn
                    class="brown --text"
                    flat
                    slot="activator"
                    @click="populateForm(props.item);updateDialog = true;updateItem = props.item"
                  >UPDATE</v-btn>
                </td>
                <td>
                  <v-btn
                    color="error"
                    class="blue --text"
                    flat
                    slot="activator"
                    @click="viewDetails(props.item)"
                  >VIEW DETAILS</v-btn>
                </td>
                <td>
                  <v-btn
                    :class="props.item.active ? 'red --text' : 'green --text'"
                    flat
                    slot="activator"
                    @click="toggleDialog = true;toggleItem = props.item"
                  >{{props.item.active ? 'Disable' : 'Enable'}}</v-btn>
                </td>
              </template>
              <v-alert
                v-slot:no-results
                :value="true"
                color="error"
                icon="warning"
              >Your search for "{{search}}" found no results.</v-alert>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-flex>
    </div>
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
      toast: {
        msg: '',
        show: true,
      },
      search: '',
      valid: true,
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid',
      ],
      phoneRules: [
        v => !!v || 'Phone is required',
        v => v.length === 11 || 'Invalid Phone number',
      ],
      toggleDialog: false,
      form: {
        firstname: '',
        lastname: '',
        email: '',
        dob: '',
        occupation: '',
        phone: '',
      },
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
      toggleItem: null,
      updateItem: null,
      updateDialog: false,
    };
  },
  methods: {
    ...mapActions(['getAllUsers', 'toggleUser', 'updateUser']),
    populateForm(item) {
      this.form = item;
    },
    viewDetails(item) {
      this.$router.push({
        name: 'GetSingleUser',
        params: { id: item.id, user: item },
      });
    },
    toggleSingleUser(id) {
      this.toast.msg = 'Sending...';
      this.toast.show = true;
      this.toggleUser({ id, snackbar: this.toast });
    },
    validate(id) {
      if (this.$refs.form.validate()) {
        this.toast.msg = 'Updating...';
        this.toast.show = true;
        this.updateUser({
          form: this.form,
          snackbar: this.toast,
          id,
        });
      }
    },
  },
  computed: {
    ...mapGetters(['getUsers']),
  },
  created() {
    this.getAllUsers();
  },
};
</script>

<style>
.v-datatable__actions {
  background-color: rgb(124, 119, 119) !important;
  color: white !important;
}
</style>
