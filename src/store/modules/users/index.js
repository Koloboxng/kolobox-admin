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
  }, data) {
    Vue.axios.get('user')
      .then((res) => {
        console.log('users', res.data.data);
        commit(mutation.UPDATE_ALL_USERS, res.data.data);
        data.usersLoaded = true;
      });
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
