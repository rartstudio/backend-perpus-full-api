import Vue from "vue";
import Vuex from "vuex";

import * as book from "@/store/modules/book.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    book
  },
  state: {},
  mutations: {},
  actions: {}
});
