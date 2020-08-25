import Vue from "vue";
import Vuex from "vuex";

import * as book from "@/store/modules/book.js";
import * as bookByCat from "@/store/modules/bookByCat.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    book,
    bookByCat
  },
  state: {},
  mutations: {},
  actions: {}
});
