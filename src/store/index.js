import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, removeItem } from '@/utils/storage'

Vue.use(Vuex)

const SAVE_USER = 'SAVE_USER'
const ADD_TAB = 'ADD_TAB'
const REMOVE_TAB = 'REMOVE_TAB'
const CHANGE_TAB = 'CHANGE_TAB'
const CLEAN_ALL = 'CLEAN_ALL'
const SAVE_CELL = 'SAVE_CELL'
const SAVE_REGION = 'SAVE_REGION'
const SAVE_DEPARTMENT = 'SAVE_DEPARTMENT'
const SAVE_MODEL = 'SAVE_MODEL'

export default new Vuex.Store({
  state: {
    userInfo: null,
    tabInfo: {
      tabs: [
        {
          label: '总览',
          name: 'patient',
          component: 'patient',
          closable: false
        }
      ],
      currTab: 'patient',
      cells: [],
      regions: [],
      models: [],
      department: []
    },
    pageSize: 20
  },
  mutations: {
    [CLEAN_ALL](state) {
      state = {}
      removeItem('state')
      removeItem('token')
    },
    [SAVE_USER](state, user) {
      state.userInfo = user
      setItem('token', user.token)
    },
    [ADD_TAB](state, tab) {
      state.tabInfo.currTab = tab.name
      for (let i = 0; i < state.tabInfo.tabs.length; i++) {
        if (state.tabInfo.tabs[i].name === tab.name) {
          return
        }
      }
      tab.closable = true
      state.tabInfo.tabs.push(tab)
    },
    [REMOVE_TAB](state, name) {
      for (let i = 0; i < state.tabInfo.tabs.length; i++) {
        if (state.tabInfo.tabs[i].name === name) {
          state.tabInfo.tabs.splice(i, 1)
          if (state.tabInfo.currTab === name) {
            const idx = (i === state.tabInfo.tabs.length) ? i - 1 : i
            state.tabInfo.currTab = state.tabInfo.tabs[idx].name
          }
          break
        }
      }
    },
    [CHANGE_TAB](state, name) {
      state.tabInfo.currTab = name
    },
    [SAVE_CELL](state, cells) {
      state.cells = cells
    },
    [SAVE_MODEL](state, models) {
      state.models = models
    },
    [SAVE_DEPARTMENT](state, departments) {
      state.departments = departments
    },
    [SAVE_REGION](state, regions) {
      state.regions = regions
    }
  },
  actions: {
  },
  modules: {
  }
})
