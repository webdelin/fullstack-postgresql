import Vue from 'vue'
import App from './App.vue'

import 'materialize-css/dist/js/materialize'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
