<template>
  <v-app>
    <v-app-bar app dark class="app-bar" color="#1976D2">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <router-link to="/" class="home__link">
        <v-toolbar-title>Perpus GKKB PTK</v-toolbar-title>
      </router-link>
    </v-app-bar>
    <v-navigation-drawer absolute temporary v-model="drawer">
      <v-list nav>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
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
          

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main class="main-content">
      <router-view></router-view>
    </v-main>
  </v-app>
  
    
</template>

<style>
.app-bar {
  font-family: 'Nunito', sans-serif;
}

.home__link {
  color: white !important;
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
export default {
  name: "App",

  components: {
  },

  data: () => ({
    drawer: false,
    group: '',
    showPassword: false
  })
};
</script>
