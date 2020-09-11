import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装Vuex持久化插件并且引入插件
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 持久化测试
    numState: 1,
    // 非持久化测试
    noState: 1
  },
  getters: {},
  mutations: {
    setNumState(state,payload) {
      
      state.numState = state.numState * 2;

      state.noState = state.noState * 2;
    }
  },
  actions: {
  },
  modules: {
  },
  // 2. 在store中调用
  plugins: [createPersistedState({
    // 默认存储到localStorage，想要存储到sessionStorage，通过storage属性
    storage: window.sessionStorage,
    // vuex-persistedstate默认持久化所有state，通过reducer属性可指定需要持久化的state
    reducer(state) {
      return {
        // 只持久化state中的numState状态
        numState: state.numState
      }
    }
  })],
})
