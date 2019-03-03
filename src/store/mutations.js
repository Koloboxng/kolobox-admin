/* eslint-disable no-param-reassign */
import * as mutate from './mutation-types';

const mutations = {
  [mutate.UPDATE_PROFILE](state, data) {
    state.account.paystackBalance = data.paystackBalance;
    state.account.transactionCount = data.transactionCount;
    state.account.userCount = data.userCount;
  },
  [mutate.UPDATE_APP_LOADED](state) {
    state.loaded = true;
  },
};

export default mutations;
