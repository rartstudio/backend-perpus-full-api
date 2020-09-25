/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import 'remixicon/fonts/remixicon.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(Vuelidate)
Vue.use(VueSweetalert2);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  
  created(){
    //adding auto login to user
    const userObject = localStorage.getItem('user')
    if(userObject){
      const userData = JSON.parse(userObject)
      this.$store.commit('user/SET_LOCAL_STORAGE',userData)
    }

    //restore local storage user
    const cartObject = localStorage.getItem('book-cart')
    if(cartObject){
      const userCart = JSON.parse(cartObject)
      this.$store.commit('transaction/SET_LOCAL_STORAGE',userCart)
    }

    //restore local storage transaction process
    const processObject = localStorage.getItem('process')
    if(processObject){
      let userTransaction = JSON.parse(processObject)
      this.$store.commit('user/SET_TRANSACTIONS_PROCESS',userTransaction)
    }

    //restore local storage transaction history
    const historyObject = localStorage.getItem('history')
    if(historyObject){
      let userTransaction = JSON.parse(historyObject)
      this.$store.commit('user/SET_TRANSACTIONS_BORROW',userTransaction)
    }

    //restore local storage transaction borrow
    const borrowObject = localStorage.getItem('borrow')
    if(borrowObject){
      let userTransaction = JSON.parse(borrowObject)
      this.$store.commit('user/SET_TRANSACTIONS_HISTORY',userTransaction)
    }
  },
  render: h => h(App)
}).$mount("#app");
