import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import KnobControl from 'vue-knob-control'
import store from './store'



Vue.config.productionTip = false


Vue.use(KnobControl)

new Vue({
  vuetify,
  router,
  store,
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


