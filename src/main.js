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
  VAvatar,
  VBtn,
  VCard,
  VCarousel,
  VCheckbox,
  VDataTable,
  VDatePicker,
  VFooter,
  VGrid,
  VIcon,
  VList,
  VNavigationDrawer,
  VProgressCircular,
  VSelect,
  VSwitch,
  VTextField,
  VTimePicker,
  VToolbar,
  Vuetify,
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import {store} from '@/store';
import firebase from 'firebase/app'
import 'firebase/firestore'

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
    VProgressCircular,
    VSwitch,
    VDataTable,
    VAvatar,
    VSelect,
    VCheckbox,
  },
})


Vue.config.productionTip = false
Vue.filter('date', DateFilter)
/* eslint-disable no-new */

let database;

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  created() {
    firebase.initializeApp({
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
    })
    database = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    database.settings(settings)
    this.$store.dispatch('getAllShops')
    // db.collection('users').get().then(function (querySnapshot) {
    //   querySnapshot.forEach(doc => {
    //     console.log(doc.id, ' => ', doc.data());
    //   });
    // });

  },
})

export {database}

