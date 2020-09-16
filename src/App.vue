<template>
  <v-app>
    <v-app-bar 
      app 
      color="#0a369d" 
      elevation="0"
      scroll-target="#main">
      <v-app-bar-nav-icon class="d-sm-none" @click="drawer = true" color="#fff"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <router-link to="/" class="home__link">GKKB PTK</router-link>
      <v-spacer></v-spacer>
      <router-link to="/cart">
        <v-btn icon class="btn__cart">
          <template v-if="getCartLength != 0">
            <v-badge
            color="#ca0b64"
            :content="getCartLength"
            overlap>
            <v-icon color="#fff">ri ri-shopping-cart-line</v-icon>
          </v-badge>
          </template>
          <template v-else>
            <v-icon color="#fff">ri ri-shopping-cart-line</v-icon>
          </template>
        </v-btn>
      </router-link>
    </v-app-bar>
    <v-navigation-drawer absolute temporary v-model="drawer">
      <v-list nav>
        <template v-if="userAuth">
          <SidebarAuth/>
        </template>
        <template v-else>
          <SidebarGuest/>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-sheet
      id="main" class="overflow-y-auto">
      <v-container>
        <v-main class="main-content">
          <router-view></router-view>
        </v-main>
      </v-container>
    </v-sheet>
  </v-app>
</template>

<style>
.app-bar {
  font-family: 'Nunito', sans-serif;
}

a {
  text-decoration: none ;
}

.home__link {
  color:  #fff !important;
  text-decoration: none;
}

.sidebar__link {
  text-decoration: none;
  color: #616161 !important;
}

.main-content {
  margin-top:2rem;
  padding-top: 24px !important;
}

.text-red {
    color:red;
}
.mt-m-25{
    margin-top: -25px
}
.fs-12 {
    font-size: 12px;
}
.btn__cart {
  width: 24px !important;
}
</style>

<script>
function checkToken (){
  let token = localStorage.getItem('user')

  if(token === null) {
    return token = 0
  }
  else {
    return token
  }
}

import { mapState,mapGetters } from "vuex";
import SidebarAuth from "@/components/SidebarAuth.vue";
import SidebarGuest from "@/components/SidebarGuest.vue";

export default {
  name: "App",

  components: {
    SidebarAuth,
    SidebarGuest
  },

  data: () => ({
    //spinner
    indeterminate: true,
    drawer: false,
    showPassword: false,
    userAuth : false
  }),
  updated(){
    //check data token
    let code = checkToken()
    
    if (this.user.status == 200) {
      this.userAuth = true
    }

    //if token return zero
    if(code == 0){
      this.userAuth = false
    }

    else {
      this.userAuth = true
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters('transaction',['getCartLength'])
  }
};
</script>
