<template>
  <v-app>
    <div>
      <v-flex ml-3 mt-3>
        <v-card max-width="550px">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-select
              v-if="getProducts"
              v-model="form.product_id"
              :items="transformProduct(getProducts)"
              item-text="text"
              item-value="value"
              required
              label="Select Product"
              @change="onChange($event)"
            ></v-select>
            <v-btn :disabled="!valid" color="primary" @click="submit();running=true;">GO</v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </div>
    <div v-if="running">
      <div v-if="!getAllUserProducts">
        <loader/>
      </div>
      <v-flex xs11 ml-4 mt-4 v-else>
        <h3>{{product_name}} Users</h3>
        <h4>Number of Users: {{getAllUserProducts.length}}</h4>
        <v-data-table
          :headers="headers"
          :items="getAllUserProducts"
          class="elevation-1"
          v-if="getAllUserProducts"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.firstname }} {{props.item.lastname}}</td>
            <td>{{ props.item.deposit_amount | currency('₦', 2) | commas }}</td>
            <td>{{ props.item.verified }}</td>
            <td>{{ props.item.canceled }}</td>
            <td>{{ props.item.start_date.split('T')[0] }}</td>
          </template>
        </v-data-table>
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
import productMixin from '../../mixins/products.mixin';

export default {
  mixins: [productMixin],
  components: {
    loader,
  },
  data() {
    return {
      product_name: '',
      running: false,
      valid: true,
      headers: [
        {
          text: 'Email',
          value: 'email',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Name',
          value: 'firstname',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Deposit Amount',
          value: 'deposit_amount',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Verified',
          value: 'verified',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Canceled',
          value: 'canceled',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Start Date',
          value: 'start_date',
          align: 'left',
          sortable: true,
        },
      ],
      toast: {
        show: false,
        msg: '',
      },
      form: {
        product_id: '',
      },
    };
  },
  computed: {
    ...mapGetters(['getAllUserProducts', 'getProducts']),
  },
  methods: {
    ...mapActions(['fetchAllUserProducts', 'getAllProducts']),
    submit() {
      this.fetchAllUserProducts({
        snackbar: this.toast,
        product_id: this.form.product_id,
        product_name: this.product_name,
      });
    },
    onChange(event) {
      this.product_name = this.getProducts.find(x => x.id === event).name;
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>
