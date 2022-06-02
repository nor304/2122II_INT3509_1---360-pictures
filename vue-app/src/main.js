import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import CustomerList from './views/customer/CustomerList.vue'
import EmployeeList from './views/employee/EmployeeList.vue'
import Panaroma from './views/panaroma/index-v2.vue'

import './style/main.css';
Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  {path: '/khach-hang', component: CustomerList },
  {path: '/nhan-vien', component: EmployeeList },
  {path: '/panaroma', component: Panaroma }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
