require('whatwg-fetch')
export const state = () => ({})

export const mutations = {}

export const actions = {
  getAbundanceReport(context, id) {
    return this.$axios.get(`/api/v1/organizations/${id}/reports`)
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

export const getters = {}
