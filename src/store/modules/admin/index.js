/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Vue from 'vue';
import * as mutate from './mutation-types';

const state = {
  allAdmins: null,
  allRoles: null,
  allPermissions: null,
  allExistingRolePermission: null,
  allNonExistingRolePermission: null,
};

const getters = {
  allAdmins: state => state.allAdmins,
  allRoles: state => state.allRoles,
  allPermissions: state => state.allPermissions,
  allExistingRolePermission: state => state.allExistingRolePermission,
  allNonExistingRolePermission: state => state.allNonExistingRolePermission,
};

const mutations = {
  [mutate.UPDATE_ALL_ADMINS](state, data) {
    state.allAdmins = data;
  },
  [mutate.UPDATE_ALL_ROLES](state, data) {
    state.allRoles = data;
  },
  [mutate.UPDATE_ALL_PERMISSIONS](state, data) {
    state.allPermissions = data;
  },
  [mutate.UPDATE_ALL_EXISTING_ROLE_PERMISSIONS](state, data) {
    state.allExistingRolePermission = data;
  },
  [mutate.UPDATE_ALL_NONEXISTING_ROLE_PERMISSIONS](state, data){
    state.allNonExistingRolePermission = data;
  }
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

    Vue.axios.post('admin', form)
      .then((res) => {
        toast.msg = "Admin created successfully";
        dispatch('getAllAdmins', {snackbar: toast}, { root: true});
        router.push('/index/show-all-admins');
      })
      .catch((e) => {
        if (!e.data.status) {
          toast.show = true
          toast.msg = e.data.message;
        }
        return
      })
      .finally(toast.show = true);
  },
  getAllAdmins({
    commit,
  }, data) {
    const {snackbar} = data;
    Vue.axios.get('admin')
      .then((res) => {
        commit(mutate.UPDATE_ALL_ADMINS, res.data.data);
      }).catch((e) => {
        snackbar.msg = e.data.message;
      })
      .finally(snackbar.show = true);;
  },
  updateAdmin({commit, dispatch}, data) {
    const {
      form,
      snackbar,
      id,
    } = data;

    Vue.axios.put('admin/update/' + id, form)
      .then((res) => {
        snackbar.msg = res.data.data;
        dispatch('getAllAdmins', {snackbar}, { root: true});
      }).catch((e) => {
        snackbar.msg = e.data.message;
      })
      .finally(snackbar.show = true);
  },

  resetAdminPassword({dispatch}, data) {
    const {
      form,
      snackbar,
      id
    } = data;

    Vue.axios.put('admin/reset-password/' + id, form)
    .then((res) => {
      snackbar.msg = res.data.data;
        dispatch('getAllAdmins', {snackbar}, { root: true });
    }).catch((e) => {
      snackbar.msg = e.data.message;
    }).finally(snackbar.show = true);
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
        snackbar.msg = res.data.data;
        dispatch('getAllAdmins', {snackbar}, { root: true});
      })
      .catch((e) => {
        snackbar.msg = e.data.message;
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
        dispatch('getAllAdmins', {snackbar}, { root: true});
      })
      .catch((e) => {
        snackbar.msg = e.data.message;
      })
      .finally(snackbar.show = true);
  },

  getAllRoles({
    commit,
  }, data) {
    const {snackbar} = data;
    snackbar.msg = 'Fetching Data...';
    snackbar.show = true
    Vue.axios.get('admin/all-roles')
      .then((res) => {
        // console.log('res', res);
        commit(mutate.UPDATE_ALL_ROLES, res.data.data);
      }).catch((e) => {
        snackbar.show = true
        snackbar.msg = e.data.message;
      }).finally(snackbar.show = true);
  },

  createRole({ commit, dispatch}, data) {
    const { form, toast, router } = data;

    Vue.axios.post('admin/role/create', form).then((res) => {
      toast.show = true
      // toast.msg = "Role created successfully";
      toast.msg = res.data.data;
      dispatch('getAllRoles', {snackbar: toast}, { root: true});
      router.push('/index/all-roles');
    }).catch((e) => {
      if (!e.data.status) {
        toast.show = true
        toast.msg = e.data.message;
      }
      return
    })
    .finally(toast.show = true);
  },

  updateRole({ commit, dispatch }, data) {
    const { form, snackbar, id } = data;
    Vue.axios
      .put(`admin/role/update/${id}`,
        form
      )
      .then((res) => {
        snackbar.msg = res.data.data;
        dispatch('getAllRoles', {snackbar: snackbar}, { root: true});
      })
      .catch((e) => {
        snackbar.msg = e.data.message;
      })
      .finally((snackbar.show = true));
  },

  deleteRole({
    commit,
    dispatch,
  }, data) {
    const {
      snackbar,
      id,
    } = data;
    Vue.axios.delete(`admin/role/delete/${id}`, {
      id,
    })
      .then((res) => {
        snackbar.msg = res.data.data;
        dispatch('getAllRoles', {snackbar: snackbar}, { root: true});
      })
      .catch((e) => {
        // console.log({e})
        snackbar.msg = e.data.message;
      })
      .finally(snackbar.show = true);
  },
  getAllPermissions({
    commit,
  }) {
    Vue.axios.get('admin/all-permissions')
      .then((res) => {
        // console.log('res', res);
        commit(mutate.UPDATE_ALL_PERMISSIONS, res.data.data);
      });
  },
  createPermission({ commit, dispatch}, data) {
    const { form, toast, router } = data;

    Vue.axios.post('admin/permission/create', form).then((res) => {
      toast.show = true
      // toast.msg = "Permission created successfully";
      toast.msg = res.data.data;
      dispatch('getAllPermissions');
      router.push('/index/all-permissions');
    }).catch((e) => {
      if (!e.data.status) {
        toast.show = true
        toast.msg = e.data.message;
      }
      return
    })
    .finally(toast.show = true);
  },

  deletePermission({
      commit,
      dispatch,
    }, data) {
      const {
        snackbar,
        id,
      } = data;
      Vue.axios.delete(`admin/permission/delete/${id}`, {
        id,
      })
        .then((res) => {
          snackbar.msg = res.data.data;
          dispatch('getAllPermissions');
        })
        .catch((e) => {
          snackbar.msg = e.data.data.msg;
        })
        .finally(snackbar.show = true);
    },

    getExistingRolePermissions({ commit }, data) {
      const {id} = data;
      Vue.axios.get(`admin/role-permission/existing/${id}`)
      .then((res) => {
        commit(mutate.UPDATE_ALL_EXISTING_ROLE_PERMISSIONS, res.data.data);
      });
    },

    addRolePermissions({ commit, dispatch }, data) {
      const {
        snackbar,
        permission_id,
        role_id
      } = data;
      Vue.axios.post('admin/role-permission/create', {
        permission_id, role_id
      }).then((res) => {
        snackbar.msg = res.data.data;
        /* Promise.all([
          dispatch('getExistingRolePermissions', {
            id:role_id,
          }, { root: true}),
          dispatch('getNonExistingRolePermissions', {
            id:role_id,
          }, { root: true})
        ]) */
        dispatch('getExistingRolePermissions', {
          id:role_id,
        }, { root: true})
        dispatch('getNonExistingRolePermissions', {
          id:role_id,
        }, { root: true})
      }).finally(snackbar.show = true);
    },

    getNonExistingRolePermissions({ commit }, data) {
      const {id} = data;
      Vue.axios.get(`admin/role-permission/nonexisting/${id}`)
      .then((res) => {
        commit(mutate.UPDATE_ALL_NONEXISTING_ROLE_PERMISSIONS, res.data.data);
      });
    },

    removeRolePermissions ({ dispatch }, data) {
      const {
        snackbar,
        permission_id,
        role_id
      } = data;

      Vue.axios.delete('admin/role-permission/delete', {
        headers: {},
        data: {
          permission_id, role_id
        }
      }).then((res) => {
        snackbar.msg = res.data.data;
        dispatch('getExistingRolePermissions', {
          id:role_id,
        }, { root: true})
        dispatch('getNonExistingRolePermissions', {
          id:role_id,
        }, { root: true})
      }).finally(snackbar.show = true)
    },
    
    sendReportToUser ({ dispatch }, data) {
      const {
        snackbar,
        form,
        id
      } = data;

      Vue.axios.post('admin/send-monthly-report',
        form
      ).then((res) => {
        snackbar.msg = res.data.data;
      }).finally(snackbar.show = true)
    },

};

const admin = {
  state,
  getters,
  actions,
  mutations,
};

export default admin;
