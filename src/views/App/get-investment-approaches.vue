<template>
  <v-app>
    <v-dialog v-model="updateDialog" width="500">
      <v-card v-if="updateItem">
        <v-card-title>Update Approach</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="form.name" label="First Name" required></v-text-field>
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
        <v-card-title>Delete Approach</v-card-title>
        <v-card-text>Are you sure you want to delete the {{deleteItem.name}} approach ?</v-card-text>
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
      <h1>All Investment Approaches</h1>
      <v-data-table
        :headers="headers"
        :items="getAllInvestmentApproaches"
        class="elevation-1"
        v-if="getAllInvestmentApproaches"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.created_at.split('T')[0] }}</td>
          <td>{{ props.item.updated_at.split('T')[0] }}</td>
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
              class="blue --text"
              flat
              slot="activator"
              @click="populateForm(props.item);updateDialog = true;updateItem = props.item"
            >Update</v-btn>
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
          text: 'Name',
          value: 'name',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Created At',
          value: 'created_at',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Updated At',
          value: 'updated_at',
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
      form: {
        name: '',
      },
    };
  },
  computed: {
    ...mapGetters(['getAllInvestmentApproaches']),
  },
  methods: {
    ...mapActions([
      'getInvestmentApproaches',
      'updateInvestmentApproach',
      'deleteInvestmentApproach',
    ]),
    deleteApproach(approachId) {
      this.toast.msg = 'Deleting...';
      this.toast.show = true;
      this.deleteInvestmentApproach({ id: approachId, snackbar: this.toast });
    },
    validate(id) {
      if (this.$refs.form.validate()) {
        this.toast.msg = 'Sending...';
        this.toast.show = true;
        this.updateInvestmentApproach({ id, snackbar: this.toast });
      }
    },
    populateForm(item) {
      this.form = item;
    },
  },
  created() {
    this.getInvestmentApproaches();
  },
};
</script>
