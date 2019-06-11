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
    const { form } = data;
    Vue.axios
      .post('admin/createSubscription', { form })
      .then((res) => {
        alert('This subscription has been added successfully');
      })
      .catch((e) => {
        alert(e);
      });
  },
};

const subscriptions = {
  state,
  getters,
  actions,
  mutations,
};

export default subscriptions;
