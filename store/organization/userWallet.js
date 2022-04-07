require('whatwg-fetch')
export const state = () => ({
  photographyList: [],
  radiologyList: [],
  officeList: null,
  organization: null,
})

export const mutations = {
  setPhotographyList(state, photographyList) {
    state.photographyList = photographyList
  },
  setRadiologyList(state, radiologyList) {
    state.radiologyList = radiologyList
  },
  setOfficeList(state, officeList) {
    state.officeList = officeList
  },
  setOrganization(state, organization) {
    state.organization = organization
  },
}

export const actions = {
  getOrgRels(context, data) {
    return this.$axios.get(`/api/v1/organizations/${data.id}/rels?prof=${data.prof}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          switch (data.prof) {
            case 1 :
              context.commit('setPhotographyList', res.data)
              break;
            case 3 :
              context.commit('setRadiologyList', res.data)
              break;
            default:
              context.commit('setOfficeList', res.data)
              break;
          }
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganization(context, id) {
    return this.$axios.get(`/api/v1/organizations/${id}`)
      .then((res) => {
          if (res.status === 401) {
            throw new Error('Bad credentials')
          } else {
            context.commit('setOrganization', res.data)
          }
          return Promise.resolve(res.data)
        }
      )
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getRadiologyList(state) {
    return state.radiologyList
  },
  getVips(state) {
    return state.vips
  },
  getOfficeList(state) {
    return state.officeList
  },
  getPhotographyList(state) {
    return state.photographyList
  },
  getOrganization(state) {
    return state.organization
  },
}
