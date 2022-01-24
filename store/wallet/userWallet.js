require('whatwg-fetch')
export const state = () => ({
  wallet: null,
  employees: null,
  userWallerHistories: null,
  userWallerHistoriesDays: [],
  userWallerHistoriesSum: 0
})

export const mutations = {
  setWallet(state, wallet) {
    state.wallet = wallet
  },
  setEmployees(state, employees) {
    state.employees = employees
  },
  setUserWallerHistories(state, userWallerHistories) {
    state.userWallerHistories = userWallerHistories
  },
  setUserWallerHistoriesSum(state, userWallerHistoriesSum) {
    state.userWallerHistoriesSum = userWallerHistoriesSum
  },
  setUserWallerHistoriesDays(state, userWallerHistoriesDays) {
    state.userWallerHistoriesDays = userWallerHistoriesDays
  }
}

export const actions = {
  getUserWallet(context, id) {
    return this.$axios.get(`/api/v1/users/${id}/wallet`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setWallet', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationWallet(context, id) {
    return this.$axios.get(`/api/v1/organizations/${id}/wallet`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setWallet', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  increaseOrganizationWallet(context, data) {
    return this.$axios.post(`/api/v1/organizations/${data.id}/wallet/increase`, data)
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
  increaseUserWallet(context, data) {
    return this.$axios.get(`/api/v1/users/${data.id}/wallet/increase`, data)
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
  getOrgEmployees(context, id) {
    return this.$axios.get(`/api/v1/organizations/${id}/employees`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setEmployees', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUserWallerHistories(context, data) {
    return this.$axios.get(`/api/v1/users/${data.id}/wallet/histories?page=${data.page}&start_date=${data.start_date}&end_date=${data.end_date}&q=${data.q}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUserWallerHistories', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationWallerHistories(context, data) {
    return this.$axios.get(`/api/v1/organizations/${data.id}/wallet/histories?page=${data.page}&start_date=${data.start_date}&end_date=${data.end_date}&q=${data.q}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUserWallerHistories', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUserWallerHistoriesSum(context, data) {
    return this.$axios.get(`/api/v1/users/${data.id}/wallet/histories/sum?start_date=${data.start_date}&end_date=${data.end_date}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUserWallerHistoriesSum', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationWallerHistoriesSum(context, data) {
    return this.$axios.get(`/api/v1/organizations/${data.id}/wallet/histories/sum?start_date=${data.start_date}&end_date=${data.end_date}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUserWallerHistoriesSum', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUserWallerHistoriesDays(context, data) {
    return this.$axios.get(`/api/v1/users/${data.id}/wallet/histories/days?start_date=${data.start_date}&end_date=${data.end_date}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUserWallerHistoriesDays', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationWallerHistoriesDays(context, data) {
    return this.$axios.get(`/api/v1/organizations/${data.id}/wallet/histories/days?start_date=${data.start_date}&end_date=${data.end_date}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUserWallerHistoriesDays', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createWithdraw(context, data) {
    return this.$axios.post(`/api/v1/users/${data.id}/wallet/histories`, data)
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
  getUserWallet(state) {
    return state.wallet
  },
  getOrgEmployees(state) {
    return state.employees
  },
  getUserWallerHistories(state) {
    return state.userWallerHistories
  },
  getUserWallerHistoriesDays(state) {
    return state.userWallerHistoriesDays
  },
  getUserWallerHistoriesSum(state) {
    return state.userWallerHistoriesSum
  }
}
