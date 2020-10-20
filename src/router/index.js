/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import BookShow from "../views/BookShow.vue";
import store from "@/store"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage
  },
  // {
  //   path: "/book/:slug",
  //   name: "book-show",
  //   component: BookShow,
  //   props: true,
  //   //executing this lifecycle from router before enter the route
  //   beforeEnter(routeTo,routeFrom,next){
  //     //running dispatch to get a book data
  //     //and parsing slug for second parameter
  //     store
  //       .dispatch("book/fetchBook",routeTo.params.slug)
  //       //after get data set data to route
  //       .then(book => {
  //         //and set the data to dynamic slug param
  //         routeTo.params.show = book
  //         //empty next mean continue
  //         next()
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       })
  //   }
  // },
  {
    path: "/book/:slug",
    name: "book-show",
    component: BookShow,
    props: true,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */  '../views/Login.vue'),
    //check if user have a token
    beforeEnter(routeTo, routeFrom, next){
      let getUser = localStorage.getItem('usacco')

      if (getUser == null){
        next()
      }
      else {
        next({name: 'dashboard'})
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    //check if user have a token
    beforeEnter(routeTo, routeFrom, next){
      let getUser = localStorage.getItem('usacco')

      if (getUser == null){
        next()
      }
      else {
        next({name: 'dashboard'})
      }
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import( /* webpackChunkName: "dashboard" */  '../views/Dashboard.vue'),
    meta: {requiresAuth:true}
  },
  {
    path: '/profile-form',
    name: 'profile-form',
    component: () => import(/* webpackChunkName: "profile-form" */  '../views/ProfileForm.vue'),
    meta: {requiresAuth:true}
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "shopping-cart" */  '../views/ShoppingCart.vue')
  },
  {
    path: '/inbox',
    name: 'inbox-user',
    component: () => import(/* webpackChunkName: "inbox-user" */  '../views/InboxUser.vue')
  },
  {
    path: '/search-result',
    name: 'search-result',
    component: () => import(/* webpackChunkName: "search-result" */  '../views/SearchResult.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-passwprd',
    component: () => import(/* webpackChunkName: "forgot-password" */  '../views/ForgotPassword.vue')
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import(/* webpackChunkName: "reset-password" */ '../views/ResetPassword.vue'),
    beforeEnter(routeTo,routeFrom,next){
      if(store.state.auth.user){
        next()
      }
      else {
        next({name: 'home'})
      }
    }
  },
  {
    path: '/books',
    name: 'books-page',
    component : () => import (/* webpackChunkName: "reset-password" */ '../views/BooksPage.vue')
  },
  {
    path: '/statistic',
    name : 'profile-user',
    component : () => import (/* webpackChunkName: "profile-form" */ '../views/ProfileUser.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  }
  next()
})

export default router;
