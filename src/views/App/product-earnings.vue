<template>
    <v-app>
      <div v-if="!loaded">
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
            </v-col>
          </v-row>

          <v-btn :disabled="!valid" color="primary" @click="validate">Search</v-btn>
        </div>
  
        <v-layout row justify-center>
          <v-flex xs3 ml-5>
            <home-card
                :title="title"
                :number="result"
                style="margin-top: 0px;"
              />
          </v-flex>
        </v-layout>

        <div class="mt-4">
            <v-layout row justify-center>
                <v-flex xs8 ml-5>
                    <v-card>
                        <v-card-title primary-title>
                            <div>
                                <div class="headline">List Of Product and Earnings</div>
                            </div>
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <v-data-table
                            :headers="headers"
                            :items="getAllProductEarnings"
                            class="elevation-1"
                        >
                            <template v-slot:items="props">
                            <td>{{ props.item.name }}</td>
                            <td>{{ props.item.total | currency('₦',2) | commas }}</td>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-flex>
            </v-layout>
        </div>

      </v-container>
    </v-app>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import loader from '@/components/loader.vue';
  import homeCard from '@/components/homeCard.vue';
  import productMixin from '../../mixins/products.mixin';
  import Vue from 'vue';
  
  export default {
    name: 'ProductEarnings',
    components: {
      loader,
      homeCard,
    },
    mixins: [productMixin],
    data() {
      return {
        headers: [
          {
            text: 'Product Name',
            value: 'name',
            align: 'left',
            sortable: true,
          },
          {
            text: 'Interest',
            value: 'total',
            align: 'left',
            sortable: true,
          },
        ],
        valid: true,
        start: null,
        end: null,
        product_id: null,
        result: 0,
        title: '',
        toast: {
          show: false,
          msg: '',
        },
      };
    },
    computed: {
      ...mapGetters(['loaded', 'allProduct', 'getAllProductEarnings']),
    },
    created() {
      this.getProfile();
      this.getAllProducts();
      this.fetchAllProductEarnings()
    },
    methods: {
      ...mapActions(['getProfile', 'getAllProducts', 'fetchAllProductEarnings']),
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
      validate() {
  
        if(this.start === null && this.end === null && this.product_id === null) {
          this.valid = true;
          return;
        }
  
        if(this.start === null) {
          this.valid = true;
          return;
        }
  
        if(this.end === null) {
          this.valid = true;
          return;
        }
  
        if(this.product_id === null) {
          this.valid = true;
          return;
        }
  
        this.toast.msg = 'Validating ...';
        this.toast.show = true;
  
        if(this.start !== null && this.end !== null && this.product_id !== null) {
          this.valid = false;
          Vue.axios.post('admin/product-earnings-total', {
            'start': this.start,
            'end': this.end,
            'product_id': this.product_id,
          })
          .then((res) => {
            this.result = '₦'+res.data.data[0].total;
            this.toast.show = true;
            this.toast.msg = 'Result fetched successully';
            this.valid = true;
          })
          .catch((e) => {
            this.toast.show = true;
            console.log({e})
            this.toast.msg = e.body.message;
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
  </style>
  