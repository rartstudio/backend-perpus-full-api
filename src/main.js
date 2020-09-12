/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate"
import 'remixicon/fonts/remixicon.css'

Vue.use(Vuelidate)
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
  },
  render: h => h(App)
}).$mount("#app");
