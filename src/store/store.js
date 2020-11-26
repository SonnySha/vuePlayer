import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        songsFavoris: ['er', 'rtrttr']
    },
    getters: {
        getSongsFavoris: state => { return state.songsFavoris }
    },
    mutations: {
        // ADD_SONG_FAVORIS: (state, song) => {
        //     state.songsFavoris.push(song);
        // },
    },
    actions: {
    }
})