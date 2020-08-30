import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import BookShow from "../views/BookShow.vue"
import store from "@/store"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/book/:slug",
    name: "book-show",
    component: BookShow,
    props: true,
    //executing this lifecycle from router before enter the route
    beforeEnter(routeTo,routeFrom,next){
      //running dispatch to get a book data
      //and parsing slug for second parameter
      store
        .dispatch("book/fetchBook",routeTo.params.slug)
        //after get data set data to route
        .then(book => {
          //and set the data to dynamic slug param
          routeTo.params.book = book
          //empty next mean continue
          next()
        })
        .catch(error => {
          console.log(error);
        })
    }
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
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
