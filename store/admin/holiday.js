require('whatwg-fetch')
export const state = () => ({
  holiday: null,
  holidayList: [],
  paymentReport:[]
})
export const mutations = {
  setHoliday(state, holiday) {
    state.holiday = holiday
  },
  setHolidayList(state, holidayList) {
    state.holidayList = holidayList
  },
  setPaymentReport(state, paymentReport){
    state.paymentReport = paymentReport
  }
}
export const actions = {
  addHoliday(context, loginData) {
    return this.$axios.post('/api/v1/admin/holidays', loginData)
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
  getHoliday(context, id) {
    return this.$axios.get('/api/v1/admin/holidays/' + id)
      .then((res) => {
        console.log(res, 'getHoliday')
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setHoliday', res)
          return Promise.resolve(res)
        }
      })
  },
  getHolidayList(context, data) {
    return this.$axios.get(`/api/v1/admin/holidays?start_date=${data.start_date}&end_date=${data.end_date}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setHolidayList', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationHolidayList(context, data) {
    return this.$axios.get(`/api/v1/organizations/${data.id}/holidays?start_date=${data.start_date}&end_date=${data.end_date}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setHolidayList', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getHolidays(context, data) {
    return this.$axios.get(`/api/v1/holidays?start_date=${data.start_date}&end_date=${data.end_date}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setHolidayList', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  editHoliday(context, item) {
    console.log(item, "items")
    return this.$axios.put('/api/v1/holidays/' + item.id, item)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res)
        }
      })
  },
  deleteHoliday(context, id) {
    return this.$axios.delete('/api/v1/holidays/' + id)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res)
        }
      })
  },
  getPaymentReport(context) {
    return this.$axios.get('/api/v1/admin/histories')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setPaymentReport', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  acceptPaymentReport(context, data) {
    return this.$axios.post('/api/v1/admin/histories/accept' ,data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },

}
export const getters = {
  getHoliday(state) {
    return state.holiday
  },
  getHolidayList(state) {
    return state.holidayList
  },
  getPaymentReport(state){
    return state.paymentReport
  }
}
