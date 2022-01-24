require('whatwg-fetch')
export const state = () => ({
  ortodencyItems: [],
  radiologyItems: [],
  photographyItems: [],
})

export const mutations = {
  addToOrtodencyItems(state, ortodencyItem) {
    state.ortodencyItems.push(ortodencyItem)
  },
  addToRadiologyItems(state, radiologyItem) {
    state.radiologyItems.push(radiologyItem)
  },
  addToPhotographyItems(state, photographyItem) {
    state.photographyItems.push(photographyItem)
  },
  resetOrtodencyItems(state) {
    state.ortodencyItems = []
  },
  resetRadiologyItems(state) {
    state.radiologyItems = []
  },
  resetPhotographyItems(state) {
    state.photographyItems = []
  },
  removeFromOrtodencyItems(state, item) {
    state.ortodencyItems = state.ortodencyItems.filter(i => {
      return i.value !== item.value;
    })
  },
  removeFromRadiologyItems(state, item) {
    state.radiologyItems = state.radiologyItems.filter(i => {
      return i.value !== item.value;
    })
  },
  removeFromPhotographyItems(state, item) {
    state.photographyItems = state.photographyItems.filter(i => {
      return i.value !== item.value;
    })
  },
}

export const actions = {
  updateOrtodencyItems({commit}, item) {
    if (item.checked) {
      commit('addToOrtodencyItems', item)
    } else {
      commit('removeFromOrtodencyItems', item)
    }
  },
  updateRadiologyItems({commit}, item) {
    if (item.checked) {
      commit('addToRadiologyItems', item)
    } else {
      commit('removeFromRadiologyItems', item)
    }
  },
  updatePhotographyItems({commit}, item) {
    if (item.checked) {
      commit('addToPhotographyItems', item)
    } else {
      commit('removeFromPhotographyItems', item)
    }
  },
  resetOrtodencyItems({commit}) {
    commit('resetOrtodencyItems')
  },
  resetRadiologyItems({commit}) {
    commit('resetRadiologyItems')
  },
  resetPhotographyItems({commit}) {
    commit('resetPhotographyItems')
  },
}

export const getters = {
  getOrtodencyItems(state) {
    return state.ortodencyItems
  },
  getRadiologyItems(state) {
    return state.radiologyItems
  },
  getPhotographyItems(state) {
    return state.photographyItems
  },
}
