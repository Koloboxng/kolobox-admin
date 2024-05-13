import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';
import admin from './modules/admin/index';
import users from './modules/users/index';
import settings from './modules/settings/index';
import products from './modules/products/index';
import referrals from './modules/referrals/index';
import subscriptions from './modules/subscriptions/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: {},
    loaded: false,
  },
  mutations,
  actions,
  getters,
  modules: {
    admin,
    users,
    settings,
    products,
    referrals,
    subscriptions,
  },
});
