<template>
  <v-app>

    <v-flex ml-1 mt-2>
      <router-link class="link" to="/index/all-roles">&lt; &lt; Back To Roles</router-link>
      <v-layout justify-center>
        <v-flex xs10 mt-5>
          <v-card ml-3>
          <v-toolbar color="blue" dark>
            <v-toolbar-title>{{role.name.toUpperCase() }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card-title class="title">Current Exisiting Permissions</v-card-title>
          <div v-if="(allExistingRolePermission.length > 0)" v-for="(p, i) in allExistingRolePermission" :keys="i" class="ml-3">
            <v-checkbox v-model="existingRolePermission" :label="p.name" :value="p.id"></v-checkbox>
          </div>
          <v-btn v-if="(allExistingRolePermission.length > 0)" color="red" @click="removeRolePermission()">Remove Role Permission</v-btn>
          <div v-else>
            <p>You don't have any existing permissions for this role.</p>
          </div>

          <v-card-title class="title" v-if="(allNonExistingRolePermission.length > 0)">Add Permissions</v-card-title>
          <div v-if="allNonExistingRolePermission" v-for="(p, i) in allNonExistingRolePermission" :keys="i" class="ml-3">
            <v-checkbox v-model="nonExistingRolePermission" :label="p.name" :value="p.id"></v-checkbox>
          </div>

          <v-btn v-if="(allNonExistingRolePermission.length > 0)" color="success" @click="addRolePermission()">Add Role Permission</v-btn>

        </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-app>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    props: {
      role: {
        type: Object,
        required: true,
      },
    },
    data() {
     return {
      toast: {
        msg: '',
        show: false,
      },
      rolePermissons: [],
      existingRolePermission: [],
      nonExistingRolePermission: []
     };
    },
    methods: {
      ...mapActions([
        'getAllPermissions', 'getExistingRolePermissions', 'getNonExistingRolePermissions',
        'addRolePermissions', 'removeRolePermissions'
      ]),
      addRolePermission() {
        // alert(this.nonExistingRolePermission)
        // alert(this.nonExistingRolePermission.length)
        if (this.nonExistingRolePermission.length <= 0) {
          return alert('Select at least one permission')
        }
        this.addRolePermissions({
          permission_id: this.nonExistingRolePermission,
          snackbar: this.toast,
          role_id: this.role.id
        })
      },

      removeRolePermission() {
        const exists = this.existingRolePerms
        const remove = exists.filter(i => {
          return !this.existingRolePermission.includes(i)
        })
        if (remove.length <= 0) {
          return alert('Unselect at least one permission to remove')
        }
        this.removeRolePermissions({
          permission_id: remove,
          snackbar: this.toast,
          role_id: this.role.id
        })
      }
    },
    computed: {
     ...mapGetters(['allPermissions', 'allExistingRolePermission', 'allNonExistingRolePermission']),
     existingRolePerms() {
      return this.allExistingRolePermission.map(x => x.id)
     }
    },
    created() {
      this.getAllPermissions();
      this.getExistingRolePermissions(this.role)
      this.getNonExistingRolePermissions(this.role)
    },
    mounted() {
      const existing = this.allExistingRolePermission.map(x => x.id)
      this.existingRolePermission = existing
      // console.log(this.allExistingRolePermission.length)
      /* const nonexisting = this.allNonExistingRolePermission.map(x => x.id)
      console.log(nonexisting)
      this.nonExistingRolePermission = nonexisting
      console.log(this.nonExistingRolePermission) */
    }
  };
</script>

<style scoped>
.link {
  color: black !important;
}
</style>
