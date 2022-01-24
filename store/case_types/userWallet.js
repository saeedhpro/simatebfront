require('whatwg-fetch')
export const state = () => ({
  cases: [],
  casesList: [],
  vips: [],
  workTime: null,
  appointments: [],
})

export const mutations = {
  setAppointments(state, appointments) {
    state.appointments = appointments
  },
  setCases(state, cases) {
    state.cases = cases
  },
  setCasesList(state, casesList) {
    state.casesList = casesList
  },
  setVips(state, vips) {
    state.vips = vips
  },
  setWorkTime(state, workTime) {
    state.workTime = workTime
  },
}

export const actions = {
  getOrgAppointments(context, data) {
    return this.$axios.get(`/api/v1/organizations/${data.id}/appointments?start_at=${data.start_at}&end_at=${data.end_at}&case=${data.case}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setAppointments', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getCaseTypes(context) {
    return this.$axios.get(`/api/v1/case-types`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setCases', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getCases(context, prof) {
    return this.$axios.get(`/api/v1/cases?prof=${prof}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setCasesList', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  orgWorkTime(context, id) {
    return this.$axios.get(`/api/v1/organizations/${id}/work-time`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setWorkTime', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  setWorkTime(context, data) {
    return this.$axios.post(`/api/v1/organizations/${data.id}/work-time`, data)
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
  getVipSchedules(context, id) {
    return this.$axios.get(`/api/v1/organizations/${id}/vip/schedule`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setVips', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createCaseType(context, data) {
    return this.$axios.post(`/api/v1/case-types`, data)
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
  createVipSchedule(context, data) {
    return this.$axios.post(`/api/v1/organizations/${data.organization_id}/vip/schedule`, data)
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
  getCases(state) {
    return state.cases
  },
  getCasesList(state) {
    return state.casesList
  },
  getVips(state) {
    return state.vips
  },
  getWorkTime(state) {
    return state.workTime
  },
  getAppointments(state) {
    return state.appointments
  },
}
