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
  getAllUsers({ commit }, data) {
    const pageNumber = data.pageNumber || 1;
    const { snackbar, pouch } = data;

    snackbar.msg = 'Fetching Data...';
    snackbar.show = true;

    Vue.axios.get(`user/?page=${pageNumber}`).then((res) => {
      snackbar.msg = 'Data retrieved!!';
      snackbar.show = true;
      pouch
        .put({
          _id: `${pageNumber}`,
          users: res.data.data.users,
        })
        .then(() => {

        })
        .catch((e) => {
          console.log(e);
        });
      commit(mutation.UPDATE_ALL_USERS, res.data.data);
    });
  },
  updateUser({ commit, dispatch }, data) {
    const { form, snackbar, id } = data;
    Vue.axios
      .post(`user/${id}`, {
        form,
      })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllUsers');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally((snackbar.show = true));
  },
  toggleUser({ commit, dispatch }, data) {
    const { id, snackbar } = data;
    Vue.axios
      .post('toggle/toggle-active', {
        id,
      })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllUsers');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally((snackbar.show = true));
  },
  findSingleUser({ commit }, data) {
    const { router, snackbar } = data;
    let { useremail } = data;
    Vue.axios
      .get(`admin/user/${useremail}`)
      .then((res) => {
        snackbar.msg = 'User Found';
        useremail = '';
        // Use the single user component to render the result
        router.push({
          name: 'GetSingleUser',
          params: { user: res.data.data, id: res.data.data.id },
        });
      })
      .catch((e) => {
        console.log({ e });
        snackbar.msg = e.data.message;
      })
      .finally((snackbar.show = true));
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
