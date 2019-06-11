/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Vue from 'vue';
import * as mutate from './mutation-types';

const state = {
  allReferrals: null,
};

const getters = {
  allReferrals: state => state.allReferrals,
};

const mutations = {
  [mutate.UPDATE_ALL_REFERRALS](state, data) {
    state.allReferrals = data;
  },
};

const actions = {
  getAllReferrals({ commit }, data) {
    const { snackbar } = data;

    Vue.axios
      .get('admin/referrals')
      .then((res) => {
        console.log('referrals', res.data.data);
        commit(mutate.UPDATE_ALL_REFERRALS, res.data.data);
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally((snackbar.show = true));
  },
};

const referrals = {
  state,
  getters,
  actions,
  mutations,
};

export default referrals;
