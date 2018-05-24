// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import DateFilter from './filters/date'
import {
  transitions,
  VAlert,
  VApp,
  VBtn,
  VCard,
  VCarousel,
  VDatePicker,
  VFooter,
  VGrid,
  VIcon,
  VList,
  VNavigationDrawer,
  VTextField,
  VTimePicker,
  VToolbar,
  Vuetify,
  VProgressCircular
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import {store} from '@/store';
import * as firebase from 'firebase'
import AlertComponent from './components/Shared/Alerts'

Vue.use(Vuetify, {
  components: {
    VAlert,
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VCarousel,
    VCard,
    VTextField,
    VDatePicker,
    VTimePicker,
    VProgressCircular
  },
})
Vue.component('app-alert', AlertComponent)


Vue.config.productionTip = false
Vue.filter('date', DateFilter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD8fcuzoaIdBko_y-wMUPlYi05Ty7npnDs',
      authDomain: 'vue-meetup-19a61.firebaseapp.com',
      databaseURL: 'https://vue-meetup-19a61.firebaseio.com',
      projectId: 'vue-meetup-19a61',
      storageBucket: 'gs://vue-meetup-19a61.appspot.com',
    })
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  },
})

