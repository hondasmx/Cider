import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    error: null,
    loading: false,
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
  },
  actions: {
    logout({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    autoSignIn({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    loadMeetups({commit}) {
      commit('setLoading', true);
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId,
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false);
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', true);
        })
    },
    createMeetup({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: this.getters.user.id,
      };
      let imageUrl;
      let key;
      let ext;
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          console.log(data)
          key = data.key
          return key
        })
        .then(
          key => {
            const filename = payload.image.name
            ext = filename.slice(filename.lastIndexOf('.'))
            return firebase.storage().ref('meetups/' + key + ext).put(payload.image)
          },
        )
        .then(
          filedata => {
            return filedata.ref.getDownloadURL()
          },
        )
        .then(
          url => {
            imageUrl = url
            return firebase.database().ref('meetups').child(key).update({
              imageUrl: imageUrl,
            })
          },
        )
        .then(() => {
            commit('createMeetup', {
              ...meetup,
              id: key,
              imageUrl: imageUrl,
            })
          },
        )
        .catch((error) => console.log(error));
    },
    signUserUp({commit}, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false);
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
            };
            commit('setUser', newUser)
          })
        .catch(
          error => {
            console.log(error);
            commit('setError', error);
            commit('setLoading', false);
          },
        )
    },
    signUserIn({commit}, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false);
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
            };
            commit('setUser', newUser)
          })
        .catch(
          error => {
            console.log(error);
            commit('setError', error);
            commit('setLoading', false);
          },
        )
    },
    clearError({commit}) {
      commit('clearError')
    },
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user(state) {
      return state.user
    },
    error(state) {
      return state.error
    },
    loading(state) {
      return state.loading
    },
  },
})
