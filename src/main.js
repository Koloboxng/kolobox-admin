import Vue from 'vue';
import 'vuetify/dist/vuetify.min.css';
import './plugins/vuetify';
import Vuetify from 'vuetify/lib';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vuex from 'vuex';
import Paginate from 'vuejs-paginate';
import Auth from './utils/auth';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';

Vue.use(VueAxios, axios);
Vue.use(router);
Vue.use(Vuex);
Vue.use(Vuetify);

Vue.component('paginate', Paginate);

Vue.use(Auth, {
  loginUrl: 'auth/admin/login',
  refresh: true,
});

Vue.filter(
  'percent',
  (value, decimals) => `${Math.round(value * 10 ** decimals) / 10 ** decimals}%`,
);

Vue.filter(
  'currency',
  (value, curr, decimalPoints) => `${curr}${(Math.floor(value * 10 ** decimalPoints) / 10 ** decimalPoints).toFixed(
    decimalPoints,
  )}`,
);

Vue.filter('commas', value => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`);

Vue.config.productionTip = false;

new Vue({
  // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },
});
