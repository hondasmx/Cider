<template>
  <v-app>

    <v-toolbar>
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">DevMeetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" router :to=item.link>
          <v-icon>
            {{item.icon}}
          </v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-xs-only" v-if="userIsIdentificated">
        <v-btn flat @click="onLogout">
          <v-icon>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>


    </v-toolbar>
    <main>
      <router-view>

      </router-view>
    </main>
    <v-navigation-drawer v-model="sideNav" temporary>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" router :to=item.link>
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="onLogout" v-if="userIsIdentificated">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        sideNav: false,
      }
    },
    computed: {
      menuItems() {
        let menu = [
          {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin'},
        ];
        if (this.userIsIdentificated) {
          menu = [
            {icon: 'supervisor_account', title: 'View meetups', link: '/meetups'},
            {icon: 'room', title: 'Organize meetup', link: '/meetup/new'},
            {icon: 'person', title: 'Profile', link: '/profile'},
          ]
        }
        return menu
      },
      userIsIdentificated() {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout')
      },
    },

    name: 'App',

  }
</script>
<style lang="stylus">
  @import './stylus/main'
</style>
