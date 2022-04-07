require('whatwg-fetch')
export const state = () => ({
  users: null,
  patients: null,
  orgUsers: [],
  institution: [],
  user: null,
  allOrganizations: [],
  profile: null,
  lastPatientLogin: [],
  lastLogin: []
})
export const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  setOrgUsers(state, orgUsers) {
    state.orgUsers = orgUsers
  },
  setAllOrgs(state, allOrganizations) {
    state.allOrganizations = allOrganizations
  },
  setInstitution(state, institution) {
    state.institution = institution
  },
  setUser(state, user) {
    state.user = user
  },
  changeUserCode(state, code) {
    state.user.code = code
  },
  setLastPatientLogin(state, lastPatientLogin) {
    state.lastPatientLogin = lastPatientLogin
  },
  setLastLogin(state, lastLogin) {
    state.lastLogin = lastLogin
  },
  setProfile(state, profile) {
    state.profile = profile
  },
  removeUsers(state, id) {
    return state.user = state.user.filter(item => item.id !== id)
  },
}
export const actions = {
  getUsers(context, data) {
    return this.$axios.get(`/api/v1/admin/users?page=${data.page}&q=${data.q}&group=1,2,3,4,5,6`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUsers', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getOrganizationAllUsers(context, id) {
    return this.$axios.get(`/api/v1/organizations/${id}/users?group=1`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUsers', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  getAllOrganization(context, id) {
    return this.$axios.get(`/api/v1/organizations/all`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setAllOrgs', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getAllUsers(context) {
    return this.$axios.get(`/api/v1/admin/users?group=1`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUsers', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  getLastPatientLogin(context) {
    return this.$axios.get('/api/v1/users/last-patient-login')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setLastPatientLogin', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getLastLogin(context) {
    return this.$axios.get('/api/v1/users/last-login')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setLastLogin', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getUser(context, id) {
    return this.$axios.get('/api/v1/users/' + id)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUser', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  changeUserCode(context, code) {
    context.commit('changeUserCode', code)
  },
  getOwn(context) {
    const token = this.$cookies.get('token') || ''
    this.$axios.setHeader('Authorization', `Bearer ${token}`)
    return this.$axios.get('/api/v1/own')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUser', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getProfile(context, id) {
    return this.$axios.get('/api/v1/users/' + id)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setProfile', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  editUser(context, data) {
    return this.$axios.put('/api/v1/users/' + data.id, data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res)
        }
      })
  },
  deleteUser(context, id) {
    return this.$axios.delete('/api/v1/users/' + id)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('removeUsers', id)
          return Promise.resolve(res)
        }
      })
  },
  deleteUsers(context, items) {
    return this.$axios.post('/api/v1/users/items', {
      ids: items.map(i => i.id),
    })
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
  deleteOrganizations(context, items) {
    return this.$axios.post('/api/v1/organizations/items', {
      ids: items.map(i => i.id),
    })
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
  addUser(context, data) {
    return this.$axios.post('/api/v1/users', data)
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
  institutionList(context) {
    return this.$axios.get('/api/v1/organizations')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setInstitution', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
}
export const getters = {
  getUsers(state) {
    return state.users
  },
  getOrgUsers(state) {
    return state.orgUsers
  },
  getInstitutionList(state) {
    return state.institution
  },
  getUser(state) {
    return state.user
  },
  getLastPatientLogin(state) {
    return state.lastPatientLogin
  },
  getLastLogin(state) {
    return state.lastLogin
  },
  getProfile(state) {
    return state.profile
  },
  getAllOrganizations(state) {
    return state.allOrganizations
  }
}
