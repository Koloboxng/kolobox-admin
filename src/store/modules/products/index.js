/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Vue from 'vue';
import * as mutate from './mutation-types';

const state = {
  allProducts: null,
  allSelfManagedProducts: null,
  allInvestmentApproaches: null,
  allProductCategories: null,
  allTransactions: null,
};

const getters = {
  getProducts: state => state.allProducts,
  getSelfManagedProducts: state => state.allSelfManagedProducts,
  getAllInvestmentApproaches: state => state.allInvestmentApproaches,
  getProductCategories: state => state.allProductCategories,
  getAllTransactions: state => state.allTransactions,
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
  selfManagedProducts({
    commit,
  }) {
    Vue.axios.get('admin/me/product')
      .then((res) => {
        console.log(res.data.data);
        commit(mutate.UPDATE_SELF_MANAGED_PRODUCTS, res.data.data);
      });
  },
  createInvestmentApproach({
    dispatch,
  }, data) {
    const {
      router,
      snackbar,
      form,
    } = data;
    Vue.axios.post('investment_approach', {
      form,
    })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getInvestmentApproaches');
        router.push('/index/get-investment-approaches');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally(snackbar.show = true);
  },
  getInvestmentApproaches({
    commit,
  }) {
    Vue.axios.get('investment_approach')
      .then((res) => {
        console.log('investment_approaches', res.data.data);
        commit(mutate.UPDATE_INVESTMENT_APPROACHES, res.data.data);
      });
  },
  deleteInvestmentApproach({
    dispatch,
  }, data) {
    const {
      id,
      snackbar,
    } = data;
    Vue.axios.delete(`investment_approach/${id}`)
      .then((res) => {
        snackbar.msg = res.data.data.msg;
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally(snackbar.show = true);
  },
  updateInvestmentApproach({
    dispatch,
  }, data) {
    const {
      snackbar,
      id,
      form,
    } = data;
    Vue.axios.put(`investment_approach/${id}`, {
      form,
    })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getInvestmentApproaches');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally(snackbar.show = true);
  },
  getAllProductCategories({
    commit,
  }) {
    Vue.axios.get('product_category')
      .then((res) => {
        console.log(res.data.data);
        commit(mutate.UPDATE_PRODUCT_CATEGORIES, res.data.data);
      });
  },
  updateProductCategory({
    dispatch,
  }, data) {
    const {
      id,
      form,
      snackbar,
    } = data;
    Vue.axios.put(`product_category/${id}`, {
      form,
    })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllProductCategories');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally(snackbar.show = true);
  },
  deleteProductCategory({
    dispatch,
  }, data) {
    const {
      id,
      snackbar,
    } = data;
    Vue.axios.delete(`product_category/${id}`)
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllProductCategories');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally(snackbar.show = true);
  },
  createProductCategory({
    dispatch,
  }, data) {
    const {
      form,
      router,
      snackbar,
    } = data;
    Vue.axios.post('product_category', {
      form,
    })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllProductCategories');
        router.push('/index/get-product-categories');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally(snackbar.show = true);
  },
  allTransactions({
    commit,
  }) {
    const startDate = '1999-01-01';
    const endDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`
      .split('-').map(
        (e, index, array) => {
          if (e.length < 2) array[index] = `0${e}`;
          return array[index];
        },
      ).join('-');
    Vue.axios.get(`payment/transactions/?start_date=${startDate}&end_date=${endDate}`)
      .then((res) => {
        console.log(res.data.data);
        commit(mutate.UPDATE_ALL_TRANSACTIONS, res.data.data);
      });
  },
};

const mutations = {
  [mutate.UPDATE_ALL_PRODUCTS](state, data) {
    state.allProducts = data.p;
  },
  [mutate.UPDATE_SELF_MANAGED_PRODUCTS](state, data) {
    state.allSelfManagedProducts = data.p;
  },
  [mutate.UPDATE_INVESTMENT_APPROACHES](state, data) {
    state.allInvestmentApproaches = data;
  },
  [mutate.UPDATE_PRODUCT_CATEGORIES](state, data) {
    state.allProductCategories = data;
  },
  [mutate.UPDATE_ALL_TRANSACTIONS](state, data) {
    state.allTransactions = data;
  },
};

const products = {
  state,
  getters,
  actions,
  mutations,
};

export default products;
