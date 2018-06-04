import Vue from 'vue'
import Vuex from 'vuex'
import {database} from '../main'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: false,
    cider: {},
    loadedShops: [],
    loadedCiders: [],
  },
  getters: {
    ciderPhoto(state) {
      return state.cider.photo
    },
    ciderTitle(state) {
      return state.cider.title
    },
    ciderDescription(state) {
      return state.cider.description
    },
    ciderData(state) {
      let data = state.cider
      return {
        'Производитель': data['developer'],
        'Вкус': data['flavour'],
        'Тара': data['container'],
        'Объем': data['size'],
        'Тип': data['type'],
      }
    },
    loadedShops(state) {
      return state.loadedShops
    },
    loadedShopsForThisCider(state) {
      return state.cider.shops
    },
    loadedCiders(state) {
      return state.loadedCiders
    },
  },
  mutations: {
    addLoadedShop(state, payload) {
      state.loadedShops.push(payload)
    },
    clearLoadedShopsForThisCider(state) {
      state.cider.shops = []
    },
    addLoadedShopForThisCider(state, payload) {
      state.cider.shops.push(payload)
    },
    getCider(state, payload) {
      state.cider = payload
    },
    addCiderToLoadedCiders(state, payload) {
      state.loadedCiders.push(payload)
    },
    clearLoadedCiders(state) {
      state.loadedCiders = []
    }
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
    getShopForThisCider({commit}, ciderId) {
      commit('clearLoadedShopsForThisCider');
      database.collection('cider').doc(ciderId)
        .get()
        .then(data => {
          data.data()['shops'].forEach(shop => {
            commit('addLoadedShopForThisCider', shop)
          })
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
    getCider({commit}, ciderId) {
      database.collection('cider').doc(ciderId)
        .get()
        .then(data => {
          commit('getCider', data.data())

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
              photo: doc.data()['photo'],
              ciderId: doc.id,
              title: doc.data()['title'],
              type: doc.data()['type']
            }
            commit('addCiderToLoadedCiders', data)
          })
        })
    },
  },
})


