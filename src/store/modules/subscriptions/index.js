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

const actions = {
  getAllSubscriptions({ commit }, data) {
    // eslint-disable-next-line camelcase
    const { snackbar } = data;

    Vue.axios
      .get('admin/subscriptions')
      .then((res) => {
        commit(mutate.UPDATE_ALL_SUBSCRIPTIONS, res.data.data);
      })
      .catch((e) => {
        snackbar.msg = e.data.data.message;
      })
      .finally((snackbar.show = true));
  },
  createSubscription({ commit, dispatch }, data) {
    const { form, snackbar } = data;
    let { dialog } = data;
    let date = new Date(form.last_pay_day)
    let numberOfDays = 0;
    if (form.saving_frequency === 'daily') {
      numberOfDays = 1;
    };
    if (form.saving_frequency === 'weekly') {
      numberOfDays = 7;
    }
    if (form.saving_frequency === 'monthly') {
      numberOfDays = 30;
    }
    date.setDate(date.getDate() + numberOfDays)

    form.next_pay_day = date.toISOString().split('T')[0]
    snackbar.msg = 'Creating...';
    snackbar.show = true;
    console.log(numberOfDays)
    console.log(form.next_pay_day)
    Vue.axios
      .post('admin/subscriptions/create', form)
      .then((res) => {
        snackbar.msg = 'This subscription has been added successfully';
        dialog = false;
        dispatch('getSingleUserSub', {id: form.user_id}, { root: true});
      })
      .catch((e) => {
        snackbar.msg = e.data.message;
      })
      .finally((snackbar.show = true));
  },
  updateOneSubscription({ commit, dispatch }, data) {
    const { form, snackbar } = data;
    let { dialog } = data;
    snackbar.msg = 'Updating...';
    snackbar.show = true;
    Vue.axios
      .post('admin/subscriptions/update', form)
      .then((res) => {
        snackbar.msg = 'This subscribtion has been updated';
        dialog = false;
        dispatch('getSingleUserSub', {id: form.user_id}, { root: true});
      })
      .catch((e) => {
        console.log({e})
        snackbar.msg = e.data.message;
      })
      .finally((snackbar.show = true));
  },
};

const mutations = {
  [mutate.UPDATE_ALL_SUBSCRIPTIONS](state, data) {
    state.allSubscriptions = data;
  },
};

const subscriptions = {
  state,
  getters,
  actions,
  mutations,
};

export default subscriptions;
