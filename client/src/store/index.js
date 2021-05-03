import Vue from 'vue'
import Vuex from 'vuex'

import * as user from './modules/user'
import * as post from './modules/post'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    post
  }
})
