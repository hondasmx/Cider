import Vue from 'vue'
import Vuex from 'vuex'
import {database} from '../main'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: false,
    loadedShops: [],
    loadedCiders: [],
  },
  getters: {
    ciderData(state) {
      return ciderId =>
        state.loadedCiders.find((cider) => {
          return cider.ciderId === ciderId
        })
    },
    loadedShops(state) {
      return state.loadedShops
    },
    loadedCiders(state) {
      return state.loadedCiders
    },
  },
  mutations: {
    addLoadedShop(state, payload) {
      state.loadedShops.push(payload)
    },
    addCiderToLoadedCiders(state, payload) {
      state.loadedCiders.push(payload)
    },
    clearLoadedCiders(state) {
      state.loadedCiders = []
    },
  },
  actions: {
    addShop({commit}, payload) {
      database.collection('shop')
        .add(payload)
        .catch(function (error) {
          console.error('Error adding document: ', error);
        });
    },
    getAllShops({commit}) {
      database.collection('shop')
        .get()
        .then(data => {
          data.forEach(doc => {
              let data = doc.data()['title'] + ' - ' + doc.data()['address'];
              commit('addLoadedShop', data)
            },
          )
        })
        .catch(error => {
          console.log(error);
        })
    },
    addShopForThisCider({commit}, payload) {
      let ciderDocRef = database.collection('cider').doc(payload['ciderId'])
      database.runTransaction(transaction => {
        return transaction.get(ciderDocRef).then(ciderDoc => {
          let shops = ciderDoc.data().shops
          if (typeof shops === 'object') {
            shops.push(payload['shop'])
          } else {
            shops = []
            shops.push(payload['shop'])
          }
          transaction.update(ciderDocRef, {shops: shops});
          return shops;
        })
      })
    },
    addCider({commit}, payload) {
      database.collection('cider')
        .add(payload)
        .catch(error => {
          console.log('Error while adding a new cider: ' + error)
        })
    },
    getAllCiders({commit}) {
      commit('clearLoadedCiders');
      database.collection('cider')
        .get()
        .then(data => {
          data.forEach(doc => {
            let data = {
              alcohol: doc.data()['alcohol'],
              container: doc.data()['container'],
              description: doc.data()['description'],
              developer: doc.data()['developer'],
              flavour: doc.data()['flavour'],
              photoUrl: doc.data()['photoUrl'],
              ciderId: doc.id,
              title: doc.data()['title'],
              type: doc.data()['type'],
              size: doc.data()['size'],
              shops: doc.data()['shops'],
            }
            commit('addCiderToLoadedCiders', data)
          })
        })
    },
  },
})


