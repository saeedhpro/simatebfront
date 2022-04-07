require('whatwg-fetch')

export const state = () => ({
  list: null,
  organizationList: null,
  transfer: [],
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setOrganizationList(state, organizationList) {
    state.organizationList = organizationList
  },
  setTransfer(state, transfer) {
    state.transfer = transfer
  },
}

export const actions = {
  getUserTransferList(context, data) {
    return this.$axios.get(`/api/v1/users/${data.id}/transfers?page=${data.page}`)
      .then(res => {
        console.log(res.data , 'res.datares.data')
        context.commit('setList', res.data)
        return Promise.resolve(res.data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationTransferList(context, data) {
    return this.$axios.get(`/api/v1/organizations/${data.id}/transfers?page=${data.page}`)
      .then(res => {
        context.commit('setOrganizationList', res.data)
        return Promise.resolve(res.data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getTransfer(context, id) {
    return this.$axios.get(`/api/v1/transfers/${id}`)
      .then(res => {
        console.log(res.data)
        context.commit('setTransfer', res.data)
        return Promise.resolve(res.data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getUserTransferList(state) {
    return state.list;
  },
  getOrganizationList(state) {
    return state.organizationList;
  },
  getTransfer(state) {
    return state.transfer;
  },
}
