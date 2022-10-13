/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Vue from 'vue';
import * as mutation from './mutation-types';

const state = {
  allUsers: null,
  allLoginUsers: null,
  singleUserDetails: null,
  singleUserSubscriptions: null,
  singleUserEarnings: null,
};

const getters = {
  getUsers: state => state.allUsers,
  getLoginDetails: state => state.allLoginUsers,
  getSingleUserDetails: state => state.singleUserDetails,
  getSingleUserSubscriptions: state => state.singleUserSubscriptions,
  getSingleUserEarnings: state => state.singleUserEarnings,
};

const actions = {
  getSingleUser({commit}, data) {
    const {id} = data;
    if(!id) return;
    Vue.axios.get(`admin/user-details/${id}`).then((res) => {
      commit(mutation.UPDATE_SINGLE_USER_DETAILS, res.data.data);
    })
  },
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
  allUserLoginsDetails({ commit }, data) {
    const { pageNumber, snackbar, startDate, endDate } = data;
    const start = (startDate) ? new Date(startDate).toISOString().split('T')[0] : null;
    const end = (startDate) ? new Date(endDate).toISOString().split('T')[0] : null;
    snackbar.msg = 'Fetching data...';
    snackbar.show = true;
    Vue.axios
      .get(`admin/login-details/?start_date=${start}&end_date=${end}&page=${pageNumber}`)
      .then((res) => {
        snackbar.msg = 'Data retrieved';
        snackbar.show = true;
        commit(mutation.UPDATE_ALL_USER_LOGIN_DETAILS, res.data.data);
      });
  },
  getSingleUserSub({commit}, data) {
    const {id} = data;
    if(!id) return;
    Vue.axios.get(`admin/user/user-subscription/${id}`).then((res) => {
      commit(mutation.UPDATE_SINGLE_USER_SUBSCRIPTIONS, res.data.data);
    })
  },
  getSingleEarnings({commit}, data) {
    const {id} = data
    if(!id) return;
    Vue.axios.get(`admin/user/user-earning/${id}`).then((res) => {
      commit(mutation.UPDATE_SINGLE_USER_EARNINGS, res.data.data)
    })
  },
};

const mutations = {
  [mutation.UPDATE_ALL_USERS](state, data) {
    state.allUsers = data;
  },
  [mutation.UPDATE_ALL_USER_LOGIN_DETAILS](state, data) {
    state.allLoginUsers = data;
  },
  [mutation.UPDATE_SINGLE_USER_DETAILS](state, data) {
    state.singleUserDetails = data;
  },
  [mutation.UPDATE_SINGLE_USER_SUBSCRIPTIONS](state, data) {
    state.singleUserSubscriptions = data;
  },
  [mutation.UPDATE_SINGLE_USER_EARNINGS](state, data) {
    state.singleUserEarnings = data;
  },
};

const users = {
  state,
  getters,
  actions,
  mutations,
};

export default users;
