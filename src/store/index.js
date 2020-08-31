import Vue from "vue";
import Vuex from "vuex";

import * as book from "@/store/modules/book.js";
import * as auth from "@/store/modules/auth.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    book,
    auth
  },
  state: {},
  mutations: {},
  actions: {}
});
