/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Vue from 'vue';
import * as mutate from './mutation-types';

const state = {
  allAdmins: null,
};

const getters = {
  allAdmins: state => state.allAdmins,
};

const mutations = {
  [mutate.UPDATE_ALL_ADMINS](state, data) {
    state.allAdmins = data;
  },
};

const actions = {
  createAdmin({
    commit,
    dispatch,
  }, data) {
    const {
      form,
      toast,
      router,
    } = data;
    const { firstname, lastname, email, phone, password, cpassword } = form;

    Vue.axios.post('admin', {
      firstname, lastname, email, phone, password, cpassword,
    })
      .then((res) => {
        toast.show = true
        toast.msg = "Admin created successfully";
        dispatch('getAllAdmins');
        router.push('/index/show-all-admins');
      })
      .catch((e) => {
        toast.show = true
        toast.msg = e.data.message;
      })
      .finally(toast.show = true);
  },
  getAllAdmins({
    commit,
  }) {
    Vue.axios.get('admin')
      .then((res) => {
        console.log('res', res);
        commit(mutate.UPDATE_ALL_ADMINS, res.data.data);
      });
  },
  deleteOne({
    commit,
    dispatch,
  }, data) {
    const {
      snackbar,
      id,
    } = data;
    Vue.axios.delete(`admin/${id}`, {
      id,
    })
      .then((res) => {
        snackbar.msg = res.data.data.msg || 'Deleted successfully!';
        dispatch('getAllAdmins');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally(snackbar.show = true);
  },
  toggleOne({
    commit,
    dispatch,
  }, data) {
    const {
      snackbar,
      id,
    } = data;
    Vue.axios.post('admin/active/toggle', {
      id,
    })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllAdmins');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally(snackbar.show = true);
  },

};

const admin = {
  state,
  getters,
  actions,
  mutations,
};

export default admin;
