/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import * as mutations from './mutation-types';

export const forgotPassword = ({
  commit,
}, data) => {
  const {
    emailPhone,
  } = data.form;
  const {
    toast,
  } = data;
  Vue.axios.post('auth/admin/forget_password', {
    emailPhone,
  })
    .then((res) => {
      toast.msg = res.data.data.msg;
    })
    .catch((e) => {
      toast.msg = e.data.message;
    })
    .finally(toast.show = true);
};

export const getProfile = ({
  commit,
}) => {
  Vue.axios.post('payment/balance')
    .then((res) => {
      commit(mutations.UPDATE_PROFILE, res.data.data);
      commit(mutations.UPDATE_APP_LOADED, true);
    });
};

export const getProductsBalances = ({
  commit,
}) => {
  Vue.axios.post('admin/product-earnings')
    .then((res) => {
      commit(mutations.UPDATE_BALANCES, res.data.data);
    });
};
