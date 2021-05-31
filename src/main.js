import Vue from 'vue'
import App from './App.vue'
import store from '@/store/index';
import '@/assets/css/tailwind.css'
import Chart from 'chart.js'
import Chartick from 'vue-chartkick'
import { VueSpinners } from '@saeris/vue-spinners'

import router from '@/router'
import { dollarFilter, percentFilter } from '@/filters'

Vue.use(VueSpinners)
Vue.use(Chartick.use(Chart))

Vue.filter('dollar', dollarFilter)
Vue.filter('percent', percentFilter)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
