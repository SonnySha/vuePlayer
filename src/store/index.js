import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songsWaiting: [],
    songs: [],
    indexedSongPlayed: -1
  },
  getters: {
    displaySongsWaiting: state => {
      return state.songsWaiting
    }
  },
  mutations: {
    ADD_SONG_WAITING(state, payload) {
      state.songsWaiting.push(payload)
    },
    SHIFT_SONG_WAITING(state) {
      state.songsWaiting.shift()
    }
  },
  actions: {
    addSongWaiting(context, amount) {
      context.commit('ADD_SONG_WAITING', amount);
    },
    shiftSongWaiting(context) {
      context.commit('SHIFT_SONG_WAITING');
    },

  },
  modules: {
  }
})
