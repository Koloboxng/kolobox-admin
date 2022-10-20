<template>
    <v-app>
      <v-container fluid>
        <v-flex ml-1 mt-2>
            <router-link class="link" to="/index/get-group-product">&lt; &lt; Back To Groups</router-link>
            <v-layout justify-center>
                <v-flex>
                    <v-card>
                        <v-toolbar color="blue" dark>
                            <v-toolbar-title>{{group.group_name}} : {{group.Name}}</v-toolbar-title>

                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-list>
                            <template>
                                <v-divider></v-divider>

                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Group Name</v-list-tile-title>
                                        <v-list-tile-sub-title v-html="group.group_name"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Group Type</v-list-tile-title>
                                        <v-list-tile-sub-title v-html="group.Name"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Group Status Active:</v-list-tile-title>
                                        <v-list-tile-sub-title v-html="group.active"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Created On</v-list-tile-title>
                                        <v-list-tile-sub-title >{{formatDate(group.created_at)}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Tenor</v-list-tile-title>
                                        <v-list-tile-sub-title v-html="group.Tenor"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Frequency</v-list-tile-title>
                                        <v-list-tile-sub-title v-html="group.frequency"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Minimum Amount</v-list-tile-title>
                                        <v-list-tile-sub-title >{{ group.minimum_amount| currency("₦", 2)}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>

                                <v-list-tile>
                                  <v-list-tile-content>
                                    <v-list-tile-title>Total Members</v-list-tile-title>
                                    <v-list-tile-sub-title v-html="getGroupMembers.length"></v-list-tile-sub-title>
                                  </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-card>

                    <v-card>
                      <v-toolbar color="blue" dark>
                        <v-toolbar-title>Members Details</v-toolbar-title>
                        <v-spacer></v-spacer>
                      </v-toolbar>
                      <v-divider></v-divider>

                      <v-list class="ml-3 mt-2 mb-2" v-if="getGroupMembers">
                        <template>
                          <div v-for="(item, index) in getGroupMembers" :key="index" class="mb-4">

                            <v-list-title>
                              <v-list-content>
                                <v-list-tile-title>Member Status</v-list-tile-title>
                                <v-list-tile-sub-title>{{ (group.user_id == item.user_id? "Admin": "Member")}}</v-list-tile-sub-title>
                              </v-list-content>
                            </v-list-title>

                            <v-list-title>
                              <v-list-content>
                                <v-list-tile-title>First Name</v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.firstname"></v-list-tile-sub-title>
                              </v-list-content>
                            </v-list-title>

                            <v-list-title>
                              <v-list-content>
                                <v-list-tile-title>Last Name</v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.lastname"></v-list-tile-sub-title>
                              </v-list-content>
                            </v-list-title>

                            <v-list-title>
                              <v-list-content>
                                <v-list-tile-title>Membership Canceled Status</v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.cancelled"></v-list-tile-sub-title>
                              </v-list-content>
                            </v-list-title>

                            <v-list-title>
                              <v-list-content>
                                <v-list-tile-title>Joined At</v-list-tile-title>
                                <v-list-tile-sub-title>{{formatDate(item.created_at)}}</v-list-tile-sub-title>
                              </v-list-content>
                            </v-list-title>
                          </div>
                        </template>
                      </v-list>
                    </v-card>
                </v-flex>
            </v-layout>

        </v-flex>
      </v-container>
      <v-snackbar v-model="toast.show" top right color="black">
        {{ toast.msg }}
        <v-btn flat dark small @click.native="toast.show = false">Close</v-btn>
      </v-snackbar>
    </v-app>
  </template>
  
<script>
  import { mapActions, mapGetters } from 'vuex';
  import dateMixin from '../mixins/date.mixin';
  
  export default {
    mixins: [dateMixin],
    props: {
        group: {
            type: Object,
            required: true,
        }
    },
    data() {
      return {
        toast: {
          show: false,
          msg: '',
        },
        validDialog: true,
        running: false,
      };
    },
    created() {
      this.$watch(
        () => this.$route.params,
        () => this.group.id,
        () => {
          this.fetchGroupmembers({id: this.$route.params.id, snackbar: this.toast});
        },
        { immediate: true }
      );
      this.fetchGroupmembers({id: this.group.id, snackbar: this.toast});
    },
    methods: {
      ...mapActions(['fetchGroupmembers']),
    },
    computed: {
      ...mapGetters(['getGroupMembers']),
    },
  };
</script>  