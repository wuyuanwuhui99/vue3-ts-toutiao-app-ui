import { createStore } from 'vuex'
import * as getters from "./getters";
import * as actions from "./actions";
import mutations from "./mutations";
import state from "./state";

export default createStore({
  state,
  mutations,
  actions,
  getters
})
