/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Vue from 'vue';
import * as mutate from './mutation-types';

const state = {
  allSubscriptions: null,
};

const getters = {
  allSubscriptions: state => state.allSubscriptions,
};

const mutations = {
  [mutate.UPDATE_ALL_SUBSCRIPTIONS](state, data) {
    state.allSubscriptions = data;
  },
};

const actions = {
  getAllSubscriptions({ commit }, data) {
    // eslint-disable-next-line camelcase
    const { snackbar } = data;

    Vue.axios
      .get('admin/subscriptions')
      .then((res) => {
        console.log('subscriptions', res.data.data);
        commit(mutate.UPDATE_ALL_SUBSCRIPTIONS, res.data.data);
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally((snackbar.show = true));
  },
  createSubscription({ commit }, data) {
    const { form, snackbar } = data;
    let {dialog} = data;
    snackbar.msg = 'Creating...';
    snackbar.show = true;
    Vue.axios
      .post('admin/subscriptions/create', form)
      .then((res) => {
        snackbar.msg = 'This subscription has been added successfully';
        dialog = false;
      })
      .catch((e) => {
        snackbar.msg = e.data.msg;
      })
      .finally((snackbar.show = true));
  },
  updateOneSubscription({ commit }, data) {
    const { form, snackbar } = data;
    let {dialog} = data;
    snackbar.msg = 'Updating...';
    snackbar.show = true;
    Vue.axios
      .post('admin/subscriptions/update', form)
      .then((res) => {
        snackbar.msg = 'This subscribtion has been updated';
        dialog = false;
      })
      .catch((e) => {
        snackbar.msg = e.data.msg;
      })
      .finally((snackbar.show = true));
  },
};

const subscriptions = {
  state,
  getters,
  actions,
  mutations,
};

export default subscriptions;
