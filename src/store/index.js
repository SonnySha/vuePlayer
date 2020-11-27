import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songsWaiting: [],
    songs: [],
    favoris: [],
  },
  getters: {
    displaySongsWaiting: state => {
      return state.songsWaiting
    },
    countFavoris: state => {
      return state.favoris.length
    },
    rtnFavoris: state => {
      console.log(state.favoris)
      return state.favoris
    },
    rtnSongs: state => {
      return state.songs
    },
    existFavoris: (state) => (idSongFavori) => {
      for (const songFavori of state.favoris) {
        if (songFavori['favoris_id'] == idSongFavori) {
          return true
        }
      }
      return false
    }


  },
  mutations: {
    INIT_SONGS(state, payload) {
      state.songs = payload;
    },
    ADD_SONG_WAITING(state, payload) {
      state.songsWaiting.push(payload)
    },
    SHIFT_SONG_WAITING(state) {
      state.songsWaiting.shift()
    },
    INIT_FAVORIS(state, payload) {
      state.favoris = payload;
    },
    EXIST_FAVORIS(state, payload) {
      return state.favoris.includes(payload);
    }

  },
  actions: {
    initSongs(context, amount) {
      context.commit('INIT_SONGS', amount);
    },
    addSongWaiting(context, amount) {
      context.commit('ADD_SONG_WAITING', amount);
    },
    shiftSongWaiting(context) {
      context.commit('SHIFT_SONG_WAITING');
    },
    initFavoris(context, amount) {
      context.commit('INIT_FAVORIS', amount);
    },


    // existFavoris(context) {
    //   if (context.getters.rtnFavoris.includes(1)) {
    //     return resolve(true)
    //   } else {
    //     return false
    //   }
    // }

  },
  modules: {
  }
})
