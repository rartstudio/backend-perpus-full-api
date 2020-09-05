<template>
  <v-app>
    <v-app-bar 
      app 
      color="#fff" 
      elevation="0"
      scroll-target="#main">
      <v-app-bar-nav-icon class="d-sm-none" @click="drawer = true" color="#0a369d"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <router-link to="/" class="home__link">GKKB PTK</router-link>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer absolute temporary v-model="drawer">
      <v-list nav>
        <template v-if="userAuth">
          <v-list-item-group>
            <div class="text-center">
              <v-btn color=#1976D2 dark large @click="logout">
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

.home__link {
  color:  #0a369d !important;
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
    let code = checkToken()
    
    if (this.user.status == 200) {
      this.userAuth = true
    }

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
          const token = localStorage.getItem('usacco')
          const user = localStorage.getItem('user')

          if(token.length != 0 && user.length != 0){
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
