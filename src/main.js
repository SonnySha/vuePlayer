import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import { store } from './store/store';
import KnobControl from 'vue-knob-control'

Vue.config.productionTip = false

Vue.use(KnobControl)

new Vue({
  store: store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(() => {
    // Le Service Worker est déclaré !
    console.log('Service Worker déclaré !');
  })
    .catch(error => {
      // Il y a eu un problème
      console.error('Erreur: ', error);
    });
}

// var deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  // deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  alert('installe lappli')
});