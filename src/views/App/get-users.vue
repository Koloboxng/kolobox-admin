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

    <v-dialog v-model="updatePasswordDialog" width="500">
      <v-card v-if="updatePasswordReset">
        <v-card-title>Reset User Password</v-card-title>
        <v-card-text>
          <v-form v-if="resetForm" ref="resetForm" v-model="resetPasswordvalid" lazy-validation>
            <v-text-field v-model="resetForm.new_password" :rules="passwordRules" label="Password" required type="password"></v-text-field>
            <v-text-field v-model="resetForm.new_cpassword" :rules="cpasswordRules" label="Confirm Password" required type="password"></v-text-field>
            <v-btn
              :disabled="!resetPasswordvalid"
              color="primary"
              @click="validateResetPassword(updatePasswordReset.id);"
            >Update</v-btn>
            <v-btn class="red --text" flat @click="updatePasswordDialog = false;updatePasswordReset = null;">CANCEL</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div v-if="!cachedUsers">
      <loader/>
    </div>
    <v-container fluid v-else>
      <div id="datePicker">
        <v-row>
          <v-col
            class="d-flex pr-1"
            cols="6"
            sm="6"
          >
          <v-select
            v-model="notification"
            :items="items"
            item-text="text"
            item-value="value"
            label="Email Subscription"
          ></v-select>

          </v-col>
        </v-row>

        <v-btn :disabled="!validNotification" color="primary" @click="validateNotification">Search</v-btn>
      </div>

      <v-flex xs12 mt-4>
        <h1>All Users</h1>
        <h3>Number of Users: {{getUsers.total_user_count}}</h3>
        <v-flex ml-2 mt-3>

          <v-card max-width="690px" style="border-radius: 20px;">
            <v-form ref="findUserForm" v-model="formToFind">
              <v-layout row wrap>
                <v-text-field v-model="useremail" label="Find Any User(Email)" :rules="emailRules" required></v-text-field>
                <v-btn @click="findUser()" color="primary" :disabled="!formToFind">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-layout>
            </v-form>
          </v-card>

        </v-flex>

        <v-flex mt-2>
          <v-card>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search for users on this page"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="getUsers.users"
              :search="search"
              class="elevation-1"
              v-if="getUsers.users"
              hide-actions
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.email.toUpperCase() }}</td>
                <td>{{ props.item.phone }}</td>
                <td>{{ props.item.firstname.toUpperCase() }} {{props.item.lastname.toUpperCase()}}</td>
                <td>
                  <v-btn
                    class="green --text"
                    flat
                    slot="activator"
                    @click="updatePasswordDialog = true;updatePasswordReset = props.item"
                  >Password Reset</v-btn>
                </td>
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
      <paginate
        :page-count="pageCount"
        :click-handler="fetchNext"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
      />
    <v-snackbar v-model="toast.show" top right color="black">
      {{ toast.msg }}
      <v-btn flat dark small @click.native="toast.show = false">Close</v-btn>
    </v-snackbar>

    </v-container>
  </v-app>
</template>

<script>
import loader from '@/components/loader.vue';
import { mapActions, mapGetters } from 'vuex';

// eslint-disable-next-line no-unused-vars

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
      useremail: '',
      search: '',
      valid: true,
      resetPasswordvalid: true,
      validNotification: true,
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid',
      ],
      phoneRules: [
        v => !!v || 'Phone is required',
        v => v.length === 11 || 'Invalid Phone number',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 6) || 'Password must be greater than 6 characters',
      ],
      cpasswordRules: [
        v => !!v || 'Please Confirm password',
        v => v === this.resetForm.new_password || 'Passwords dont match',
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
      resetForm: {
        new_password: '',
        new_cpassword: ''
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
        {},
      ],
      pagination: {
        rowsPerPage: -1,
      },
      toggleItem: null,
      updateItem: null,
      updatePasswordReset: null,
      updateDialog: false,
      updatePasswordDialog: false,
      formToFind: true,
      notification: null,
      items: ['subscribed', 'unsubscribed'],
    };
  },
  methods: {
    ...mapActions([
      'getAllUsers',
      'toggleUser',
      'updateUser',
      'findSingleUser',
      'resetUserPassword',
    ]),
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
    validateResetPassword(id) {
      if (this.$refs.resetForm.validate()) {
        if (this.resetForm.new_password !== '' && this.resetForm.new_cpassword !== '') {
          this.toast.msg = 'Resetting Password...';
          this.toast.show = true;
          this.updatePasswordReset = null;

          this.resetUserPassword({
            form: this.resetForm,
            snackbar: this.toast,
            id,
          })
          .then(() => {
            this.resetForm = {
              new_password: '',
              new_cpassword: ''
            }
            this.updatePasswordDialog = false;
          })

        }
        return
      }
    },
    fetchNext(event) {
      this.getAllUsers({
        pageNumber: event,
        snackbar: this.toast,
        notification: this.notification,
        email: this.useremail,
        pouch: this.$pouch,
      });
      /* this.$pouch
        .get(`${event}`)
        .then((doc) => {
          this.cachedUsers = doc.users;
        })
        .catch((e) => {
          console.log({ e });
          if (e.name === 'not_found') {
            return this.getAllUsers({
              pageNumber: event,
              snackbar: this.toast,
              notification: this.notification,
              email: this.useremail,
              pouch: this.$pouch,
            });
          }
          this.toast.msg = e;
          this.toast.show = true;
        }); */
    },
    findUser() {
      if (this.$refs.findUserForm.validate()) {
        if (this.useremail === '') {
          this.formToFind = true;
          return
        }
        this.toast.msg = 'Searching...';
        this.toast.show = true;

        if (this.useremail !== '') {
          this.getAllUsers({
            pageNumber: 1,
            snackbar: this.toast,
            notification: this.notification,
            email: this.useremail,
            pouch: this.$pouch,
          });
        }
        /* this.findSingleUser({
          useremail: this.useremail.toLowerCase().trim(),
          router: this.$router,
          snackbar: this.toast,
        }); */
      }
    },
    validateNotification(){
      if (this.notification === null) {
        this.validNotification = true;
        return;
      }

      this.toast.msg = 'Validating ...';
      this.toast.show = true;

      if (this.notification !== null) {
        this.getAllUsers({
          pageNumber: 1,
          snackbar: this.toast,
          notification: this.notification,
          email: this.useremail,
          pouch: this.$pouch,
        });
      }
    },
  },
  computed: {
    ...mapGetters(['getUsers']),
    pageCount() {
      const { total_user_count, users } = this.cachedUsers;
      const numberOfPages = (Number(total_user_count) / users.length).toFixed(1);

      return Number(numberOfPages.split('.')[1]) > 0
        ? Math.round(Number(numberOfPages)) + 1
        : Math.round(Number(numberOfPages));
    },
    cachedUsers: {
      get() {
        return this.getUsers;
      },
      set(newValue) {
        this.getUsers.users = newValue;
      },
    },
  },
  created() {
    this.getAllUsers({
      pageNumber: 1,
      snackbar: this.toast,
      notification: this.notification,
      email: this.useremail,
      pouch: this.$pouch,
    });
  },
};
</script>

<style>
#datePicker {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  margin-top: 60px;
}
.v-datatable__actions {
  background-color: rgb(124, 119, 119) !important;
  color: white !important;
}
.pagination li {
  border: 1px rgb(56, 191, 245) solid;
  display: inline;
  padding: 20px;
  background-color: #424242;
}
.pagination ul {
  list-style: none;
  min-width: 696px;
}
.pagination {
  margin: 50px 0px 50px 0px;
}
.pagination li a {
  color: white;
}

.pagination li.active {
  background-color: #007bff;
}
</style>
