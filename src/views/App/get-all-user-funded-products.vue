<template>
    <v-app>
      <div v-if="!getAllFundedProduct">
        <loader/>
      </div>
      <div v-else>
        <v-flex xs11 ml-4 mt-4>
          <h1>All Funded Product</h1>
          <h3>Total Number of Funded Product: {{getAllFundedProduct.total}}</h3>
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
                :items="getAllFundedProduct.fundedProduct"
                :search="search"
                class="elevation-1"
                v-if="getAllFundedProduct"
                hide-actions
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.firstname }}</td>
                  <td>{{ props.item.lastname }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.name }}</td>
                  <td></td>
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
          :container-class="'pagination'"/>
      </div>
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
        search: '',
        toast: {
          msg: '',
          show: true,
        },
        valid: true,
        headers: [
          {
            text: 'First Name',
            value: 'firstname',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Last Name',
            value: 'lastname',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Email',
            value: 'email',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Product Name',
            value: 'name',
            align: 'left',
            sortable: true,
          },
        ],
      };
    },
    methods: {
      ...mapActions(['fetchAllFundedProduct']),
      fetchNext(pageNum) {
        this.fetchAllFundedProduct({
          pageNumber: pageNum,
          snackbar: this.toast,
        });
      },
    },
    computed: {
      ...mapGetters(['getAllFundedProduct']),
      pageCount() {
        const { total, limit } = this.getAllFundedProduct;
        const numberOfPages = Math.ceil(Number(total) / limit);
        return numberOfPages;
      },
    },
    created() {
      this.fetchAllFundedProduct({ pageNumber: 1, snackbar: this.toast });
    },
  };
  </script>
  
  <style>
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