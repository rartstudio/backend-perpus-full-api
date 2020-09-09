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
  //adding auto login to user
  created(){
    const userObject = localStorage.getItem('user')
    if(userObject){
      const userData = JSON.parse(userObject)
      this.$store.commit('user/SET_LOCAL_STORAGE',userData)
    }
  },
  render: h => h(App)
}).$mount("#app");
