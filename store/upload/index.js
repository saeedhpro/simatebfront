require('whatwg-fetch')
export const state = () => ({})
export const mutations = {}
export const actions = {
  logo(context, data) {
    return this.$axios.post(`/api/v1/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
  sendResult(context, data) {
    return this.$axios.post(`/api/v1/appointments/${data.id}/results`, data.data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
  uploadOrgImage(context, data) {
    return this.$axios.post(`/api/v1/organizations/${data.id}/images`, data.data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
  getFile(context, path) {
    return this.$axios.get(`/api/v1/file/${path}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
  getResultFile(context, path) {
    return this.$axios.get(`/api/v1/file/results/${path}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
  createCode(context, id) {
    return this.$axios.put(`/api/v1/users/${id}/code`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
  getOrgImages(context, path) {
    return this.$axios.get(`/api/v1/file/organizations/${path}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
  getAppResultImages(context, data) {
    return this.$axios.get(`/api/v1/file/appointments/${data.id}?query=${data.prof}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.logos)
        }
      }).catch(err => {
        return Promise.reject(err)
      })
  },
  getFilePath(context, path) {
    return this.$axios.get(`/api/v1/file${path}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
}
export const getters = {}
