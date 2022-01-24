require('whatwg-fetch')
export const state = () => ({
  histories: null,
})

export const mutations = {
  setHistories(state, histories) {
    state.histories = histories
  }
}

export const actions = {
  getUserHistories(context, id) {
    return this.$axios.get(`/api/v1/users/${id}/orthodontics`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          const data = {
            user_id: id,
            ...res.data,
          }
          context.commit('setHistories', data)
          return Promise.resolve(data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  setUserHistories(context, data) {
    context.commit('setHistories', data)
  },
  createUserHistories(context, data) {
    return this.$axios.post(`/api/v1/users/${data.id}/orthodontics`, data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getUserHistories(state) {
    return state.histories
  },
}
