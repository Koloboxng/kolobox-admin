/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Vue from 'vue';
import * as mutate from './mutation-types';

const state = {
  allProducts: null,
};

const getters = {
  getProducts: state => state.allProducts,
};

const actions = {
  getAllProducts({
    commit,
  }) {
    Vue.axios.get('product')
      .then((res) => {
        console.log('products', res.data.data);
        commit(mutate.UPDATE_ALL_PRODUCTS, res.data.data);
      });
  },
  createProduct({
    commit,
    dispatch,
  }, data) {
    const {
      form,
      snackbar,
      router,
    } = data;
    Vue.axios.post('product', {
      form,
    })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllProducts');
        router.push('/index/get-products');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally(snackbar.show = true);
  },
  updateProduct({
    commit,
    dispatch,
  }, data) {
    const {
      form,
      snackbar,
      router,
    } = data;
    Vue.axios.put(`product/${form.id}`)
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllProducts');
        router.push('/index/get-products');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally(snackbar.show = true);
  },
  deleteProduct({
    commit,
    dispatch,
  }, data) {
    const {
      id,
      snackbar,
    } = data;
    Vue.axios.delete(`product/${id}`, {
      id,
    })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllProducts');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally(snackbar.show = true);
  },
  moveUsers({
    commit,
  }, data) {
    const {
      form,
      snackbar,
    } = data;
    Vue.axios.post('product/movement', {
      form,
    })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally(snackbar.show = true);
  },
};

const mutations = {
  [mutate.UPDATE_ALL_PRODUCTS](state, data) {
    state.allProducts = data.p;
  },
};

const products = {
  state,
  getters,
  actions,
  mutations,
};

export default products;
