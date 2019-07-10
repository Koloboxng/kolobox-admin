<template>
  <div v-if="!getProductCategories">
    <loader/>
  </div>
  <v-app v-else>
    <v-dialog v-model="relatedProductsDialog" width="500">
      <v-card v-if="relatedProductsItem">
        <v-card-title>Get Related Products</v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-btn
            flat
            @click="getRelatedProducts(relatedProductsItem.id);relatedProductsItem = null"
            class="green --text"
          >GET RELATED PRODUCTS</v-btn>
          <v-btn
            color="error"
            class="red --text"
            flat
            @click="relatedProductsDialog = false;relatedProductsItem = null;"
          >CANCEL</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" width="500">
      <v-card v-if="deleteItem">
        <v-card-title>Delete Product Category</v-card-title>
        <v-card-text>Are you sure you want to delete the {{deleteItem.email}} category ?</v-card-text>
        <v-card-actions>
          <v-btn
            class="green --text"
            flat
            @click="deleteCategory(deleteItem.id);deleteItem = null;"
          >YES</v-btn>
          <v-btn class="red --text" flat @click="deleteDialog = false;deleteItem = null;">NO</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="updateDialog" width="500">
      <v-card v-if="updateItem">
        <v-card-title>Update Product Category</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.name"
              label="Name"
              :rules="[v => !!v || 'This Field is required']"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.performance"
              label="Performance"
              :rules="[v => !!v || 'This Field is required']"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.benefits"
              label="Benefits"
              :rules="[v => !!v || 'This Field is required']"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.interest_rate"
              label="Interest Rate"
              :rules="[v => !!v || 'This Field is required']"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.minimum_requirement"
              label="Minimum Requirement"
              :rules="[v => !!v || 'This Field is required']"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.tenor"
              label="Name of Investment Approach"
              :rules="[v => !!v || 'This Field is required']"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.investment_approach_id"
              label="Investment Approach Id e.g 2"
              :rules="[v => !!v || 'This Field is required']"
              required
            ></v-text-field>
            <v-btn :disabled="!valid" color="primary" @click="validate">Update</v-btn>
            <v-btn class="red --text" flat @click="updateDialog = false;updateItem = null;">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-flex xs11 ml-4 mt-4>
      <h1>All Product Categories</h1>
      <v-data-table
        :headers="headers"
        :items="getProductCategories"
        class="elevation-1"
        v-if="getProductCategories"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.tenor }} days</td>
          <td>{{ props.item.interest_rate | percent(2) }}</td>
          <td>{{ props.item.minimum_requirement | currency("₦", 2) | commas }}</td>
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
              @click="fillForm(props.item);updateDialog = true;updateItem = props.item"
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
import loader from '@/components/loader.vue';

export default {
  components: {
    loader,
  },
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
          text: 'Tenor',
          value: 'tenor',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Interest Rate',
          value: 'interest_rate',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Minimum Requirement',
          value: 'minimum_requirement',
          align: 'left',
          sortable: true,
        },
        {},
        {},
      ],
      deleteDialog: false,
      relatedProductsDialog: false,
      deleteItem: null,
      relatedProductsItem: null,
      updateDialog: false,
      updateItem: null,
      toast: {
        show: false,
        msg: '',
      },
      form: {
        name: '',
        performance: [
          {
            data: 'year 1',
            value: 0,
          },
          {
            data: 'year 2',
            value: 0,
          },
          {
            data: 'year 3',
            value: 0,
          },
        ],
        benefits: '',
        interest_rate: 0,
        minimum_requirement: 0,
        tenor: 0,
        investment_approach_id: 0,
      },
      relatedProductsReady: false,
    };
  },
  computed: {
    ...mapGetters(['getProductCategories']),
  },
  methods: {
    ...mapActions([
      'getAllProductCategories',
      'deleteProductCategory',
      'updateProductCategory',
    ]),
    deleteCategory(productId) {
      this.toast.msg = 'Deleting...';
      this.toast.show = true;
      this.deleteProductCategory({ id: productId, snackbar: this.toast });
    },
    updateCategory(productId) {
      this.toast.msg = 'Sending...';
      this.toast.show = true;
      this.updateProductCategory({
        id: productId,
        snackbar: this.toast,
        form: this.form,
      });
    },
    getRelatedProducts(productId) {
      this.axios.get(`product_category/${productId}`).then((res) => {
        this.relatedProductsReady = true;
      });
    },
    fillForm(item) {
      this.form = item;
    },
  },
  created() {
    this.getAllProductCategories();
  },
};
</script>
