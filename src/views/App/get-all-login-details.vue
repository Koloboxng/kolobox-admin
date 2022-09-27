<template>
    <v-app>
      <div v-if="!getLoginDetails">
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

          <v-btn :disabled="!valid" color="primary" @click="validate">Search</v-btn>
        </div>

        <v-layout>
            <v-flex xs11 ml-4 mt-4>
                <h1>All Login Details</h1>
                <h3>Total Number of Logins: {{getLoginDetails.total}}</h3>
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
                    :items="getLoginDetails.logins"
                    :search="search"
                    class="elevation-1"
                    v-if="getLoginDetails"
                    hide-actions
                    >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.user_email }}</td>
                        <td>{{ props.item.user_firstname }}</td>
                        <td>{{props.item.user_lastname}}</td>
                        <td>{{props.item.login_at ? props.item.login_at.split('T')[0] : 0}}</td>
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
        </v-layout>
        <v-layout>
            <v-flex xs11 ml-4 mt-4>
                <v-row>
                    <paginate
                        :page-count="pageCount"
                        :click-handler="fetchNext"
                        :prev-text="'Prev'"
                        :next-text="'Next'"
                        :container-class="'pagination'"
                    />
                </v-row>
            </v-flex>
        </v-layout>
  
      </v-container>
    </v-app>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import loader from '@/components/loader.vue';
  import homeCard from '@/components/homeCard.vue';
  import productMixin from '../../mixins/products.mixin';
  
  export default {
    name: 'Home',
    components: {
      loader,
      homeCard,
    },
    mixins: [productMixin],
    data() {
      return {
        search: '',
        headers: [
            {
            text: 'Email',
            value: 'user_email',
            align: 'left',
            sortable: true,
            },
            {
            text: 'First Name',
            value: 'user_firstname',
            align: 'left',
            sortable: true,
            },
            {
            text: 'Last Name',
            value: 'user_lastname',
            align: 'left',
            sortable: true,
            },
            {
            text: 'Login Date',
            value: 'login_at',
            align: 'left',
            sortable: true,
            },
        ],
        valid: true,
        start: null,
        end: null,
        title: '',
        toast: {
          show: true,
          msg: '',
        },
      };
    },
    computed: {
      ...mapGetters(['getLoginDetails']),
      pageCount() {
        const { total, limit } = this.getLoginDetails;
        const numberOfPages = Math.ceil(Number(total) / limit);
        return numberOfPages;
      },
    },
    created() {
      this.allUserLoginsDetails(
        { pageNumber: 1, snackbar: this.toast, startDate: this.start, endDate: this.end }
      );
    },
    methods: {
      ...mapActions(['allUserLoginsDetails']),
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
        this.toast.show = false;
        if(this.start === null && this.end === null) {
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
  
        if(this.product_id === null && this.freq) {
          this.valid = true;
          return;
        }
  
        this.toast.msg = 'Validating ...';
        this.toast.show = true;

        if(this.start !== null && this.end !== null) {
            this.allUserLoginsDetails(
                { pageNumber: 1, snackbar: this.toast, startDate: this.start, endDate: this.end }
            );
        }
        
      },
      fetchNext(pageNum) {
        if(this.start === null && this.end === null) {
            this.allUserLoginsDetails({
                pageNumber: pageNum,
                snackbar: this.toast,
            });
        } else {
            this.allUserLoginsDetails(
                { 
                    pageNumber: pageNum, 
                    snackbar: this.toast, 
                    startDate: this.start, 
                    endDate: this.end 
                }
            );
        }
        
      },
    },
  };
  </script>
  
<style scoped>
    .v-datatable__actions {
        background-color: rgb(124, 119, 119) !important;
        color: white !important;
    }
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
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pagination >>> li {
      border: 1px rgb(56, 191, 245) solid;
      display: inline;
      padding: 20px;
      background-color: #424242;
      align-items: center;
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