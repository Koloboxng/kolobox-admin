<template>
    <v-app>
      <div v-if="!getAllGroupProducts">
        <loader/>
      </div>
      <div v-else>
        <v-flex xs11 ml-4 mt-4>
          <h1>All Product Group</h1>
          <h3>Total Number of Group: {{getAllGroupProducts.total}}</h3>
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
                :items="getAllGroupProducts.groups"
                :search="search"
                class="elevation-1"
                v-if="getAllGroupProducts"
                hide-actions
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.group_name }}</td>
                  <td>{{ props.item.active }}</td>
                  <td>{{ formatDate(props.item.created_at) }}</td>
                  <td>{{props.item.minimum_amount | currency('₦',2) | commas}}</td>
                  <td>{{props.item.frequency}}</td>
                  <td>{{props.item.Name}}</td>
                  <td>{{props.item.Tenor}}</td>
                  <td>
                    <v-btn
                        color="error"
                        class="blue --text"
                        flat
                        slot="activator"
                        @click="viewDetails(props.item)"
                    >VIEW DETAILS</v-btn>
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
          :container-class="'pagination'"/>
      </div>
    </v-app>
  </template>
  
  <script>
  import loader from '@/components/loader.vue';
  import dateMixin from '@/mixins/date.mixin';
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    mixins: [dateMixin],
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
            text: 'Name',
            value: 'group_name',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Active',
            value: 'active',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Date Created',
            value: 'created_at',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Minimun Amount',
            value: 'minimum_amount',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Frequency',
            value: 'frequency',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Type',
            value: 'Name',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Tenor',
            value: 'Tenor',
            align: 'left',
            sortable: true,
          },
          {},
        ],
      };
    },
    methods: {
      ...mapActions(['fetchAllGroupProducts']),
      fetchNext(pageNum) {
        this.fetchAllGroupProducts({
          pageNumber: pageNum,
          snackbar: this.toast,
        });
      },
      viewDetails(item) {
        this.$router.push({
            name: 'GetSingleGroup',
            params: { id: item.id, group: item },
        });
        },
    },
    computed: {
      ...mapGetters(['getAllGroupProducts']),
      pageCount() {
        const { total, limit } = this.getAllGroupProducts;
        const numberOfPages = Math.ceil(Number(total) / limit);
        return numberOfPages;
      },
    },
    created() {
      this.fetchAllGroupProducts({ pageNumber: 1, snackbar: this.toast });
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
  