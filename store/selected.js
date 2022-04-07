require('whatwg-fetch')
export const state = () => ({
  selected: [],
})
export const mutations = {
  addToSelected(state, item) {
    state.selected.push(item)
  },
  resetSelected(state) {
    state.selected = []
  },
  removeFromSelected(state, item) {
    state.selected = state.selected.filter(i => {
      return i.id !== item.id;
    })
  },
}
export const actions = {
  updateSelected({commit}, item) {
    if (item.checked) {
      commit('addToSelected', item)
    } else {
      commit('removeFromSelected', item)
    }
  },
  resetSelected({commit}) {
    commit('resetSelected')
  },
}
export const getters = {
  getSelected(state) {
    return state.selected
  },
}
