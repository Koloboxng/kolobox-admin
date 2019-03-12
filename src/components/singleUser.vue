<template>
  <v-app>
    <v-flex ml-1 mt-2>
      <router-link class="link" to="/index/all-users">&lt; &lt; Back To Users</router-link>
      <v-layout justify-center>
        <v-flex xs9 mt-5>
          <v-card>
            <v-toolbar color="blue" dark>
              <v-toolbar-title>{{user.firstname}} {{user.lastname}}</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-list>
              <template>
                <v-divider></v-divider>

                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Active</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.active"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Date of birth</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.dob.split('T')[0]"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Email</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.email"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Occupation</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.banker"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Phone</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.phone"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Next of Kin</v-list-tile-title>
                    <v-list-tile-sub-title v-html="user.Next_Of_Kin | 'None'"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
      <v-snackbar v-model="toast.show" top right color="black">
        {{ toast.msg }}
        <v-btn flat dark small @click.native="toast.show = false">Close</v-btn>
      </v-snackbar>
    </v-flex>
  </v-app>
</template>

<script>
export default {
  props: {
    user: {
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
    };
  },
};
</script>
<style scoped>
.link {
  color: black !important;
}
</style>
