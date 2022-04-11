import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tagsList: [
      {
        path: '/main/index',
        title: '首页'
      }
    ],
    collapse: false,
    isFullscreen: false,
    userMsg: []
  },
  mutations: {
    // 添加页签tags
    pushtags (state, val) {
      // 如果等于-1说明tabs不存在那么插入，否则什么都不做
      // findindex找角标，循环判断一下，如果等于那么就代表有相同的，就不必添加，如果找不到那就是-1.就添加
      let result = state.tagsList.findIndex(item => item.title === val.title)
      // result === -1 ? state.tagsList.push(val) : ''
      if (result === -1) {
        state.tagsList.push(val)
      }
    },
    // 删除单个页签
    delTagsItem (state, val) {
      state.tagsList.splice(val.ind, 1)
    },
    // 清楚所有页签
    clearTags (state) {
      const indexArr = [
        {
          path: '/main/index',
          title: '首页'
        }
      ]
      state.tagsList = indexArr
    },
    // 关闭其他页签
    closeTagsOther (state, val) {
      const indexArr = [
        {
          path: '/main/index',
          title: '首页'
        }
      ]
      indexArr.push(val)
      state.tagsList = indexArr
    },
    // 菜单栏折叠
    handleCollapse (state, data) {
      state.collapse = data
    }
  },
  getters: {},
  actions: {}
})
