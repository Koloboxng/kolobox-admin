/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Vue from 'vue';
import * as mutate from './mutation-types';

const state = {
  allProducts: [],
  allSelfManagedProducts: null,
  allInvestmentApproaches: null,
  allProductCategories: null,
  allTransactions: null,
  allWithdrawalTransactions: null,
  allUserProducts: null,
  allGroupProducts: null,
  allGroupMembers: null,
  allFundedAndUnFundedProduct: {},
  allFundedProduct: null,
  allUnFundedProduct: null,
  allProductEarnings: null,
};

const getters = {
  getProducts: state => state.allProducts,
  allProduct: state => state.allProducts,
  getSelfManagedProducts: state => state.allSelfManagedProducts,
  getAllInvestmentApproaches: state => state.allInvestmentApproaches,
  getProductCategories: state => state.allProductCategories,
  getAllTransactions: state => state.allTransactions,
  getAllWithdrawalTransactions: state => state.allWithdrawalTransactions,
  getAllUserProducts: state => state.allUserProducts,
  getAllGroupProducts: state => state.allGroupProducts,
  getGroupMembers: state => state.allGroupMembers,
  getAllFundedAndUnFundedProduct: state => state.allFundedAndUnFundedProduct,
  getAllFundedProduct: state => state.allFundedProduct,
  getAllUnFundedProduct: state => state.allUnFundedProduct,
  getAllProductEarnings: state => state.allProductEarnings,
};

const actions = {
  fetchAllUserProducts({ commit }, data) {
    // eslint-disable-next-line camelcase
    const { product_id, snackbar } = data;
    snackbar.msg = 'Sending...';
    snackbar.show = true;
    Vue.axios
      .post('admin/products/users', { product_id })
      .then((res) => {
        snackbar.msg = 'Data Retrieved';
        commit(mutate.UPDATE_ALL_USER_PRODUCTS, res.data.data);
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally((snackbar.show = true));
  },
  getAllProducts({ commit }) {
    Vue.axios.get('product').then((res) => {
      commit(mutate.UPDATE_ALL_PRODUCTS, res.data.data);
    });
  },
  createProduct({ commit, dispatch }, data) {
    const { form, snackbar, router } = data;
    Vue.axios
      .post('product', {
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
      .finally((snackbar.show = true));
  },
  updateProduct({ commit, dispatch }, data) {
    const { form, snackbar, router } = data;
    Vue.axios
      .put(`product/${form.id}`)
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllProducts');
        router.push('/index/get-products');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally((snackbar.show = true));
  },
  deleteProduct({ commit, dispatch }, data) {
    const { id, snackbar } = data;
    Vue.axios
      .delete(`product/${id}`, {
        id,
      })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllProducts');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally((snackbar.show = true));
  },
  moveUsers({ commit }, data) {
    const { form, snackbar } = data;
    Vue.axios
      .post('product/movement', {
        form,
      })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
      })
      .catch((e) => {
        snackbar.msg = e.data.message;
      })
      .finally((snackbar.show = true));
  },
  selfManagedProducts({ commit }) {
    Vue.axios.get('admin/me/product').then((res) => {
      commit(mutate.UPDATE_SELF_MANAGED_PRODUCTS, res.data.data);
    });
  },
  createInvestmentApproach({ dispatch }, data) {
    const { router, snackbar, form } = data;
    Vue.axios
      .post('investment_approach', {
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
      .finally((snackbar.show = true));
  },
  getInvestmentApproaches({ commit }) {
    Vue.axios.get('investment_approach').then((res) => {
      commit(mutate.UPDATE_INVESTMENT_APPROACHES, res.data.data);
    });
  },
  deleteInvestmentApproach({ dispatch }, data) {
    const { id, snackbar } = data;
    Vue.axios
      .delete(`investment_approach/${id}`)
      .then((res) => {
        snackbar.msg = res.data.data.msg;
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally((snackbar.show = true));
  },
  updateInvestmentApproach({ dispatch }, data) {
    const { snackbar, id, form } = data;
    Vue.axios
      .put(`investment_approach/${id}`, {
        form,
      })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getInvestmentApproaches');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally((snackbar.show = true));
  },
  getAllProductCategories({ commit }) {
    Vue.axios.get('product_category').then((res) => {
      commit(mutate.UPDATE_PRODUCT_CATEGORIES, res.data.data);
    });
  },
  updateProductCategory({ dispatch }, data) {
    const { id, form, snackbar } = data;
    Vue.axios
      .put(`product_category/${id}`, {
        form,
      })
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllProductCategories');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally((snackbar.show = true));
  },
  deleteProductCategory({ dispatch }, data) {
    const { id, snackbar } = data;
    Vue.axios
      .delete(`product_category/${id}`)
      .then((res) => {
        snackbar.msg = res.data.data.msg;
        dispatch('getAllProductCategories');
      })
      .catch((e) => {
        snackbar.msg = e.data.data.msg;
      })
      .finally((snackbar.show = true));
  },
  createProductCategory({ dispatch }, data) {
    const { form, router, snackbar } = data;
    Vue.axios
      .post('product_category', {
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
      .finally((snackbar.show = true));
  },
  allTransactions({ commit }, data) {
    const { pageNumber, snackbar } = data;
    const startDate = '1999-01-01';
    const endDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`
      .split('-')
      .map((e, index, array) => {
        if (e.length < 2) array[index] = `0${e}`;
        return array[index];
      })
      .join('-');
    snackbar.msg = 'Fetching data...';
    snackbar.show = true;
    Vue.axios
      .get(`payment/transactions/?start_date=${startDate}&end_date=${endDate}&page=${pageNumber}`)
      .then((res) => {
        snackbar.msg = 'Data retrieved';
        snackbar.show = true;
        commit(mutate.UPDATE_ALL_TRANSACTIONS, res.data.data);
      });
  },
  allWithdrawalTransactions({ commit }, data) {
    const { pageNumber, snackbar, startDate, endDate } = data;
    const start = (startDate) ? new Date(startDate).toISOString().split('T')[0] : null;
    const end = (startDate) ? new Date(endDate).toISOString().split('T')[0] : null;
    snackbar.msg = 'Fetching data...';
    snackbar.show = true;
    Vue.axios
      .get(`payment/withdrawal-transactions/?start_date=${start}&end_date=${end}&page=${pageNumber}`)
      .then((res) => {
        snackbar.msg = 'Data retrieved';
        snackbar.show = true;
        commit(mutate.UPDATE_ALL_WITHDRAWAL_TRANSACTIONS, res.data.data);
      });
  },
  /* createSubscription({ commit }, data) {
    const { form, snackbar } = data;
    snackbar.msg = 'Creating...';
    snackbar.show = true;
    Vue.axios
      .post('admin/subscriptions/create', form)
      .then(() => {
        snackbar.msg = 'Subscription has been created for the user';
      })
      .catch((e) => {
        snackbar.msg = e.data.message;
      })
      .finally((snackbar.show = true));
  }, */
  createOneProduct({ commit, dispatch }, data) {
    const { form, snackbar } = data;
    let { dialog } = data;
    snackbar.msg = 'Creating...';
    snackbar.show = true;
    Vue.axios
      .post('admin/product/create', form)
      .then(() => {
        snackbar.msg = 'Product has been created for the user';
        dialog = false;
        dispatch('getSingleEarnings', {id: form.user_id}, { root: true});
      })
      .catch((e) => {
        snackbar.msg = e.data.message;
      })
      .finally((snackbar.show = true));
  },
  updateOneProduct({ commit, dispatch }, data) {
    const { form, snackbar } = data;
    snackbar.msg = 'Updating...';
    snackbar.show = true;
    Vue.axios
      .post('admin/product/update', form)
      .then(() => {
        snackbar.msg = 'Product has been updated for the user';
        dispatch('getSingleEarnings', {id: form.user_id}, { root: true});
      })
      .catch((e) => {
        snackbar.msg = e.data.message;
      })
      .finally((snackbar.show = true));
  },
  getFundedAndUnFundedProductById({ commit, dispatch }, data) {
    const { id } = data;
    Vue.axios
      .get(`admin/products-funded-unfunded/users/${id}`)
      .then((res) => {
        // dispatch('getSingleEarnings', {id: id}, { root: true});
        commit(mutate.UPDATE_ALL_USER_FUDED_AND_UNFUNDED_PRODUCTS, res.data.data);
      })
      .catch((e) => {
        console.log(`Error fetching funded and un funded products for specific user: ${e}`)
      });
  },
  fetchAllFundedProduct({ commit }, data) {
    const { pageNumber, snackbar } = data;
    snackbar.msg = 'Updating...';
    snackbar.show = true;
    Vue.axios
      .get(`admin/user-funded-product?page=${pageNumber}`)
      .then((res) => {
        commit(mutate.UPDATE_ALL_USER_FUDED_PRODUCTS, res.data.data);
      })
      .catch((e) => {
        snackbar.msg = e.data.message;
      })
      .finally((snackbar.show = true));
  },
  fetchAllUnFundedProduct({ commit }, data) {
    const { pageNumber, snackbar } = data;
    snackbar.msg = 'Updating...';
    snackbar.show = true;
    Vue.axios
      .get(`admin/user-unfunded-product?page=${pageNumber}`)
      .then((res) => {
        commit(mutate.UPDATE_ALL_USER_UNFUDED_PRODUCTS, res.data.data);
      })
      .catch((e) => {
        snackbar.msg = e.data.message;
      })
      .finally((snackbar.show = true));
  },
  moveSingleUserProduct({ commit }, data) {
    const { form, snackbar } = data;
    Vue.axios
      .post('product/single-user/movement',
        form,
      )
      .then((res) => {
        snackbar.msg = res.data.data;
      })
      .catch((e) => {
        snackbar.msg = e.data.message;
      })
      .finally((snackbar.show = true));
  },
  fetchAllGroupProducts({ commit }, data) {
    const { pageNumber, snackbar } = data;
    snackbar.msg = 'Fetching data...';
    snackbar.show = true;
    Vue.axios.get(`group/all-group/?page=${pageNumber}`).then((res) => {
      snackbar.msg = 'Data retrieved';
      snackbar.show = true;
      commit(mutate.UPDATE_ALL_GROUP_PRODUCTS, res.data.data);
    });
  },
  fetchGroupmembers({ commit }, data) {
    const { id, snackbar } = data;
    if(!id) return;
    snackbar.msg = 'Getting Membership List';
    snackbar.show = true;
    Vue.axios.get(`group/all-group-members/${id}`).then((res) => {
      snackbar.msg = 'Data retrieved';
      snackbar.show = true;
      commit(mutate.UPDATE_ALL_GROUP_MEMBERS, res.data.data);
    });
  },
  fetchAllProductEarnings({ commit }, data){
    Vue.axios.get('admin/all-products-earnings').then((res) => {
      commit(mutate.UPDATE_PRODUCTS_EARNINGS, res.data.data);
    })
  },
  rolloverProduct({ commit, dispatch }, data){
    const { id, user_id, start_date, snackbar } = data;
    Vue.axios.post('admin/rollover-product/update',{
      user_product_id: id,
      start_date: start_date,
    }).then((res) => {
      snackbar.msg = 'Product successfully rolled over';
      snackbar.show = true;
      dispatch('getFundedAndUnFundedProductById', {id: user_id}, {root: true})
      dispatch('getSingleEarnings', {id: user_id}, { root: true});
      
    })

  },
  rolloverInactiveProduct({ commit, dispatch }, data){
    const { id, user_id, start_date, amount, snackbar } = data;
    Vue.axios.post('admin/rollover-withdrawable-product/update',{
      user_product_id: id,
      start_date: start_date,
      amount: amount,
    }).then((res) => {
      snackbar.msg = res.data.data || 'Product successfully rolled over';
      snackbar.show = true;
      // dispatch('getSingleEarnings', {id: id}, {root: true})
      dispatch('getFundedAndUnFundedProductById', {id: user_id}, {root: true})
      dispatch('getSingleEarnings', {id: user_id}, { root: true});
      dispatch('getSingleUserSub', {id: user_id}, { root: true})
      dispatch('getSingleUser', {id: user_id}, { root: true})
    })
    .catch((e) => {
      snackbar.msg = e.data.message;
    })
    .finally((snackbar.show = true));

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
  [mutate.UPDATE_ALL_WITHDRAWAL_TRANSACTIONS](state, data) {
    state.allWithdrawalTransactions = data;
  },
  [mutate.UPDATE_ALL_USER_PRODUCTS](state, data) {
    state.allUserProducts = data;
  },
  [mutate.UPDATE_ALL_GROUP_PRODUCTS](state, data){
    state.allGroupProducts = data;
  },
  [mutate.UPDATE_ALL_GROUP_MEMBERS](state, data){
    state.allGroupMembers = data;
  },
  [mutate.UPDATE_ALL_USER_FUDED_AND_UNFUNDED_PRODUCTS](state, data) {
    state.allFundedAndUnFundedProduct.fundedProduct = data.fundedProduct;
    state.allFundedAndUnFundedProduct.unFundedProduct = data.unFundedProduct;
  },
  [mutate.UPDATE_ALL_USER_FUDED_PRODUCTS](state, data) {
    state.allFundedProduct = data;
  },
  [mutate.UPDATE_ALL_USER_UNFUDED_PRODUCTS](state, data){
    state.allUnFundedProduct = data;
  },
  [mutate.UPDATE_PRODUCTS_EARNINGS](state, data){
    state.allProductEarnings = data;
  },
};

const products = {
  state,
  getters,
  actions,
  mutations,
};

export default products;
