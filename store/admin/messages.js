require('whatwg-fetch')
export const state = () => ({
  messages: null,
  notifications: null,
})
export const mutations = {
  setMessages(state, messages) {
    state.messages = messages
  },
  setNotifications(state, notifications) {
    state.notifications = notifications
  },
}
export const actions = {
  deleteMessages(context, items) {
    return this.$axios.post(`/api/v1/sms/items`, {
      ids: items.map(i => i.id),
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteNotifications(context, items) {
    return this.$axios.post(`/api/v1/notifications/items`, {
      ids: items.map(i => i.id),
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getMessages(context, data) {
    return this.$axios.get(`/api/v1/admin/sms?page=${data.page}&q=${data.q}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setMessages', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getNotifications(context, data) {
    return this.$axios.get(`/api/v1/notifications?page=${data.page}&q=${data.q}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setNotifications', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  sendMessage(context, data) {
    return this.$axios.post(`/api/v1/sms`, data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationMessages(context, data) {
    return this.$axios.get(`/api/v1/sms?page=${data.page}&q=${data.q}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setMessages', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
}
export const getters = {
  getMessages(state) {
    return state.messages
  },
  getNotifications(state) {
    return state.notifications
  },
}
