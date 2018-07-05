<template>
  <v-app :dark=darkTheme>
    <v-toolbar>
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Cider</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" router :to=item.link class="mr-4">
          <v-icon>
            {{item.icon}}
          </v-icon>
          {{item.title}}
        </v-btn>
        <v-container>
          <v-switch v-model="darkTheme"></v-switch>
        </v-container>

      </v-toolbar-items>


    </v-toolbar>
    <main>
      <router-view>

      </router-view>
    </main>

  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        darkTheme: true,
      }
    },
    computed: {
      menuItems() {
        return [
          {icon: 'store', title: 'Shops', link: '/shop'},
          {icon: 'add_box', title: 'Add shop', link: '/addshop'},
          {icon: 'favorite_border', title: 'Ciders', link: '/cider'},
          {icon: 'add_circle', title: 'Add cider', link: '/addcider'},
        ]
      },
    },
    created() {
      this.$store.dispatch('getAllCiders')
    },

    name: 'App',

  }
</script>
<style lang="stylus">
  @import './stylus/main.styl'
</style>
