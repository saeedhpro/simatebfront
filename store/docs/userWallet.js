require('whatwg-fetch')
export const state = () => ({
  docs: [],
  mostanadat:[]
})

export const mutations = {
  setDocs(state, docs) {
    state.docs = docs
  },
  setMosanadat(state , mostanadat){
    state.mostanadat = mostanadat
  }
}

export const actions = {
  getDocs(context, id) {
    console.log(id, "od")
    return this.$axios.get(`/api/v1/users/${id}/docs`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setDocs', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  sendDoc(context, data) {
    return this.$axios.post(`/api/v1/users/${data.user_id}/docs`, data)
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
  deleteDoc(context, id) {
    return this.$axios.delete(`/api/v1/docs/${id}`)
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

  getMosanadat(context, id) {
    console.log(id, "od")
    return this.$axios.get(`/api/v1/users/${id}/docs`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setDocs', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateSendDoc(context, data) {
    return this.$axios.put(`/api/v1/docs/${data.id}`, data)
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
  getUserDocs(context, id) {
    return this.$axios.get(`/api/v1/users/${id}/docs`)
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
}

export const getters = {
  getDocs(state) {
    return state.docs
  },
  getMosanadat(state) {
    return state.mostanadat
  },
}
