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
          <v-icon color="#fff">ri ri-shopping-cart-line</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>
    <v-navigation-drawer absolute temporary v-model="drawer">
      <v-list nav>
        <template v-if="userAuth">
          <v-list-item-group>
            <router-link to="/dashboard" text class="sidebar__link">
              <v-list-item>
                <v-list-item-icon>
                  <i class="ri ri-home-line" style="font-size: 24px"></i>
                </v-list-item-icon>
                <v-list-item-title>
                  Dashboard
                </v-list-item-title>
              </v-list-item>
            </router-link>
            <div class="text-center mt-4">
              <v-btn color=#0a369d dark large @click="logout">
                <v-icon>mdi-logout-variant</v-icon>
                <span class="ml-2">Logout</span>
              </v-btn>
            </div>
          </v-list-item-group>
        </template>
        <template v-else>
          <v-list-item-group>
            <router-link  to="/login" text class="sidebar__link">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-arrow-right</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  Login
                </v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link  to="/register" text class="sidebar__link">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  Register
                </v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list-item-group>
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

import { mapState } from "vuex";
import store from "@/store"

export default {
  name: "App",

  components: {
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
  methods: {
    logout(){
      store.dispatch('auth/fetchLogout')
        .then(()=>{
          //get item from local storage
          const token = localStorage.getItem('usacco')
          const user = localStorage.getItem('user')

          if(token.length != 0 && user.length != 0){
            //remove item from local storage
            localStorage.removeItem('usacco')
            localStorage.removeItem('user')
            
            //reload page after delete local storage cause 
            //without reload page broken              
            location.reload()
          }
        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>
