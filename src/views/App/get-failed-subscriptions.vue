<template>
  <v-app>
    <div v-if="!allFailedSubscriptions">
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
          <date-picker
            v-model="start"
            :get-classes="getRangeClasses"
            :default-value="end || new Date()"
            :disabled-date="disabledStartDate"
            :disabled-time="disabledStartTime"
            type="date"
            class="pr-1 pl-1"
          ></date-picker>
          <date-picker
            v-model="end"
            :get-classes="getRangeClasses"
            :default-value="start || new Date()"
            :disabled-date="disabledEndDate"
            :disabled-time="disabledEndTime"
            type="date"
            class="pr-1"
          ></date-picker>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            class="d-flex"
            cols="12"
            sm="6"
          >
          <v-select
            v-if="allProduct"
            v-model="product_id"
            :items="transformProduct(allProduct)"
            item-text="text"
            item-value="value"
            label="Select Product"
            class="pr-1"
          ></v-select>
          <v-select
            v-model="freq"
            :items="items"
            item-text="text"
            item-value="value"
            label="Frequently"
          ></v-select>
          </v-col>
        </v-row>

        <v-btn :disabled="!valid" color="primary" @click="validate">Search</v-btn>
      </div>

      <v-flex xs11 ml-4 mt-4>
          <h1>All Failed Subscriptions</h1>
          <h3>Total Number of Failed Subscriptions: {{allFailedSubscriptions.total}}</h3>
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
                :items="allFailedSubscriptions.failedSubscriptions"
                :search="search"
                class="elevation-1"
                v-if="allFailedSubscriptions"
                hide-actions
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.saving_frequency }}</td>
                  <td>{{props.item.created_at.split('T')[0]}}</td>
                  <td>{{getActualProduct(props.item.product_id)}}</td>
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
  
      <v-snackbar v-model="toast.show" top right color="black">
        {{ toast.msg }}
        <v-btn flat dark small @click.native="toast.show = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import loader from '@/components/loader.vue';
import homeCard from '@/components/homeCard.vue';
import productMixin from '../../mixins/products.mixin';

export default {
  name: 'AllSubscription',
  components: {
    loader,
  },
  mixins: [productMixin],
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Email',
          value: 'email',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Frequency',
          value: 'saving_frequency',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Date',
          value: 'created_at',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Product',
          value: 'product_id',
          align: 'left',
          sortable: true,
        },
      ],
      valid: true,
      start: null,
      end: null,
      product_id: null,
      freq: null,
      toast: {
        show: false,
        msg: '',
      },
      items: [null, 'Daily', 'Weekly', 'Monthly'],
    };
  },
  computed: {
    ...mapGetters(['allFailedSubscriptions', 'getProducts', 'allProduct']),
    pageCount() {
      const { total, limit } = this.allFailedSubscriptions;
      const numberOfPages = Math.ceil(Number(total) / limit);
      return numberOfPages;
    },
  },
  created() {
    this.getFailedSubscripton({ 
      pageNumber: 1, 
      startDate: this.start,
      EndDate: this.end,
      product: this.product_id,
      freq: this.freq,
      snackbar: this.toast 
    });
    this.getAllProducts();
  },
  methods: {
    ...mapActions(['getFailedSubscripton', 'getAllProducts']),
    getRangeClasses(cellDate, currentDates, classnames) {
      const classes = [];
      const start = this.start && new Date(this.start).setHours(0, 0, 0, 0);
      const end = this.end && new Date(this.end).setHours(0, 0, 0, 0);
      if (
      !/disabled|active|not-current-month/.test(classnames) &&
      start &&
      end &&
      cellDate.getTime() >= start &&
      cellDate.getTime() <= end
      ) {
      classes.push("in-range");
      }
      return classes;
    },
    disabledStartDate(date) {
      return (
      this.end &&
      new Date(date).setHours(0, 0, 0, 0) >
          new Date(this.end).setHours(0, 0, 0, 0)
      );
    },
    disabledEndDate(date) {
      return (
      this.start &&
      new Date(date).setHours(0, 0, 0, 0) <
          new Date(this.start).setHours(0, 0, 0, 0)
      );
    },
    disabledStartTime(date) {
      return this.end && date > this.end;
    },
    disabledEndTime(date) {
      return this.start && date < this.start;
    },
    getActualProduct(item) {
      return this.getProducts.find(x => x.id === item).name;
    },
    fetchNext(pageNum) {
      this.getFailedSubscripton({
        pageNumber: pageNum,
        startDate: this.start,
        EndDate: this.end,
        product: this.product_id,
        freq: this.freq,
        snackbar: this.toast,
      });
    },
    validate() {

      if(this.product_id === null) {
        this.valid = true;
        return;
      }

      this.toast.msg = 'Validating ...';
      this.toast.show = true;

      if(this.product_id !== null) {
        this.valid = false;
        this.getFailedSubscripton({
          pageNumber: 1,
          startDate: this.start,
          EndDate: this.end,
          product: this.product_id,
          freq: this.freq,
          snackbar: this.toast,
        }).then(() => {
          setTimeout(() => {
            this.valid = true;
          }, 300);
        });
      }
      
    },
  },
};
</script>

<style scoped>
.grey.darken-2 {
  margin-top: 180px;
}
.mx-datepicker-main {
    top: 123.5px !important;
    left: 202px !important;
}
input.mx-input{
  border: 1px solid;
}

#datePicker {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  margin-top: 60px;
}
.active1 {
  background: #ff0000;
}
.in-range1 {
  background: #ffaaaa;
}
.active2 {
  background: #00ff00;
}
.in-range2 {
  background: #aaffaa;
}
.v-datatable__actions {
  background-color: rgb(124, 119, 119) !important;
  color: white !important;
}
.pagination >>> li {
  border: 1px rgb(56, 191, 245) solid;
  display: inline;
  padding: 20px;
  background-color: #424242;
}
.pagination >>> ul {
  list-style: none;
  min-width: 696px;
}
.pagination {
  margin: 50px 0px 50px 0px;
}
.pagination >>> li a {
  color: white;
}
.pagination >>> li.active {
    background-color: #007bff;
  }
</style>
