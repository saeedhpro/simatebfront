require('whatwg-fetch')
export const state = () => ({
  institutions: null,
  institute: null,
  instituteUsers: [],
  institutionsList: [],
  orgLabRels: [],
  orgRaRels: [],
  orgOfRels: [],
  instituteCases: [],

})
export const mutations = {
  setInstitutions(state, institutions) {
    state.institutions = institutions
  },
  setInstitution(state, institute) {
    state.institute = institute
  },
  setInstituteUsers(state, instituteUsers) {
    state.instituteUsers = instituteUsers
  },
  setInstitutionsList(state, institutionsList) {
    state.institutionsList = institutionsList
  },
  setOrgLabRels(state, rels) {
    state.orgLabRels = rels
  },
  setOrgRaRels(state, rels) {
    state.orgRaRels = rels
  },
  setOrgOfRels(state, rels) {
    state.orgOfRels = rels
  },
  setInstituteCases(state, instituteCases) {
    state.instituteCases = instituteCases
  },
  addOrgLabRels(state, rel) {
    if (!state.orgLabRels.find(i=>i.id == rel.id)){
      state.orgLabRels.push(rel)
    }
  },
  addOrgRaRels(state, rel) {
    if (!state.orgRaRels.find(i=>i.id == rel.id)){
      state.orgRaRels.push(rel)
    }
  },
  addOrgOfRels(state, rel) {
    if (!state.orgOfRels.find(i=>i.id == rel.id)){
      state.orgOfRels.push(rel)
    }
  },
}
export const actions = {
  getInstitutions(context, data) {
    return this.$axios.get(`/api/v1/organizations?page=${data.page}&q=${data.q}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          console.log(res.data, 'data')
          context.commit('setInstitutions', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getInstitutionsList(context, page) {
    return this.$axios.get('/api/v1/organizations?page=' + page)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setInstitutionsList', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  getInstitutionsImagesList(context, id) {
    return this.$axios.get(`/api/v1/organizations/${id}/images`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          console.log(res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getInstitutionsAbout(context, id) {
    return this.$axios.get(`/api/v1/organizations/${id}/about`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
  getInstitutionsCases(context ,id) {
    return this.$axios.get(`/api/v1/organizations/${id}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setInstituteCases', res.data.data)
          console.log(res.data.data , 'setInstituteCases')
          return Promise.resolve(res.data)
        }
      })
  },
  updateInstitutionsAbout(context, data) {
    return this.$axios.put(`/api/v1/organizations/${data.id}/about`, data.data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
  getInstituteUsers(context, data) {
    return this.$axios.get(`/api/v1/organizations/${data.id}/users?group=1&page=${data.page}&q=${data.q}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setInstituteUsers', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        console.log(err, 'getInstituteUsersErr')
      })
  },
  getInstitution(context, id) {
    return this.$axios.get(`/api/v1/organizations/${id}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setInstitution', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getInstitutionRels(context, data) {
    return this.$axios.get(`/api/v1/organizations/${data.id}/rels?prof=${data.prof}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setInstitution', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getInstitutionOfRels(context, id) {
    return this.$axios.get(`/api/v1/organizations/${id}/rel-offices`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setInstitution', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getOrgLabRels(context, id) {
    return this.$axios.get(`/api/v1/organizations/${id}/rels?prof=2`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setOrgLabRels', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getOrgRaRels(context, id) {
    return this.$axios.get(`/api/v1/organizations/${id}/rels?prof=3`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setOrgRaRels', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getAdminAllOrg(context) {
    return this.$axios.get(`/api/v1/admin/organizations`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          const data = res.data.data;
          for(let i = 0; i < data.length; i++) {
            if (data[i].profession_id != 1){
              switch (data[i].profession_id) {
                case 2:
                case '2':
                  context.commit("addOrgLabRels", data[i])
                  break;
                case 3:
                case '3':
                  context.commit("addOrgRaRels", data[i])
                  break;
                default:
                  context.commit("addOrgOfRels", data[i])
                  break;
              }
            }
          }
          return Promise.resolve(res.data.data)
        }
      })
  },
  getOrgOfRels(context, id) {
    return this.$axios.get(`/api/v1/organizations/${id}/rel-offices`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setOrgOfRels', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  addInstitution(context, loginData) {
    return this.$axios.post('/api/v1/organizations', loginData)
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
  editInstitution(context, data) {
    return this.$axios.put('/api/v1/organizations/' + data.id, data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
}
export const getters = {
  getInstitutions(state) {
    return state.institutions
  },
  getInstitution(state) {
    return state.institute
  },
  getOrgLabRels(state) {
    return state.orgLabRels
  },
  getOrgRaRels(state) {
    return state.orgRaRels
  },
  getOrgOfRels(state) {
    return state.orgOfRels
  },
  getInstituteUsers(state) {
    return state.instituteUsers
  },
  InstitutionsList(state) {
    return state.institutionsList
  },
  getInstitutionsCases(state) {
    return state.instituteCases
  }
}
