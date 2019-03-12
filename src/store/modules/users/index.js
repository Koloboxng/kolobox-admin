/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Vue from 'vue';
import * as mutation from './mutation-types';

const state = {
  allUsers: null,
};

const getters = {
  getUsers: state => state.allUsers,
};

const actions = {
  getAllUsers({
    commit,
  }) {
    Vue.axios.get('user')
      .then((res) => {
        console.log('users', res.data.data.users);
        commit(mutation.UPDATE_ALL_USERS, res.data.data.users);
      });
  },
  updateUser({
    commit,
    dispatch,
  }, data) {
    const {
      form,
      snackbar,
      id,
    } = data;
    Vue.axios.post(`user/${id}`, {
      form,
    })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllUsers');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally(snackbar.show = true);
  },
  toggleUser({
    commit,
    dispatch,
  }, data) {
    const {
      id,
      snackbar,
    } = data;
    Vue.axios.post('toggle/toggle-active', {
      id,
    })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllUsers');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally(snackbar.show = true);
  },
};

const mutations = {
  [mutation.UPDATE_ALL_USERS](state, data) {
    state.allUsers = data;
  },
};

const users = {
  state,
  getters,
  actions,
  mutations,
};

export default users;
