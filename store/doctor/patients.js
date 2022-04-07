import login from "../../layouts/login";

require('whatwg-fetch')
export const state = () => ({
  patient: null,
  patients: null,
  patientPayments: null,
  today: [],
  radioResults: [],
  photoResults: [],
  labResults: [],
  photos: [],
  radios: [],
  offs: [],
  appointments: [],
  institutions: [],
  holiday: null,
  openDent1: false,
  openDent2: false,
})
export const mutations = {
  setPatient(state, patient) {
    state.patient = patient
  },
  toggleOpenDent1(state) {
    state.openDent1 = !state.openDent1
  },
  toggleOpenDent2(state) {
    state.openDent2 = !state.openDent2
  },
  setPatients(state, patients) {
    state.patients = patients
  },
  setInstitutions(state, institutions) {
    state.institutions = institutions
  },
  setAppointments(state, appointments) {
    state.appointments = appointments
  },
  setPatientPayments(state, patientPayments) {
    const pays = patientPayments.payments;
    let total = 0
    for (const pay of pays) {
      if (pay.income) {
        total += pay.amount
      }
    }
    state.patientPayments = {
      ...patientPayments,
      total
    }
  },
  setToday(state, today) {
    state.today = today
  },
  setRadioResults(state, radioResults) {
    state.radioResults = radioResults
  },
  setPhotoResults(state, photoResults) {
    state.photoResults = photoResults
  },
  setLabResults(state, labResults) {
    state.labResults = labResults
  },
  setRadios(state, radios) {
    state.radios = radios
  },
  setPhotos(state, photos) {
    state.photos = photos
  },
  setOffs(state, offs) {
    state.offs = offs
  },
  setHoliday(state, holiday) {
    state.holiday = holiday
  },
  removeHoliday(state, id) {
    return state.holiday = state.holiday.filter(item => item.id != id)
  },
}
export const actions = {

  toggleOpenDent1(context) {
    context.commit('toggleOpenDent1')
  },
  toggleOpenDent2(context) {
    context.commit('toggleOpenDent2')
  },
  getPatient(context, id) {
    return this.$axios.get(`/api/v1/users/${id}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          // context.commit('setInstitutions', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getPatientAppointments(context, id) {
    return this.$axios.get(`/api/v1/users/${id}/appointments`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setAppointments', res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  getPatients(context, r) {
    return this.$axios.get(`${r}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setPatients', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  acceptAppointment(context, data) {
    return this.$axios.post(`/api/v1/appointments/${data.id}/accept`, data.data)
      .then((res) => {
        console.log(res, "res")
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        console.log(err, 'getPatientsErr')
      })
  },
  getAppointments(context, r) {
    return this.$axios.get(`${r}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setAppointments', res.data)
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        console.log(err, 'getPatientsErr')
      })
  },
  getPatientPayments(context, id) {
    return this.$axios.get(`/api/v1/users/${id}/payments`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setPatientPayments', res.data)
          return Promise.resolve(res)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  addPayment(context, loginData) {
    return this.$axios.post('/api/v1/payments', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deletePayments(context, items) {
    return this.$axios.post('/api/v1/payments/delete', {
      ids: items.map(i => i.id),
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createPaziresh(context, loginData) {
    return this.$axios.post('/api/v1/appointments', loginData)
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
  getToday(context, data) {
    return this.$axios.get(`/api/v1/appointments?start_date=${data.start_date}&end_date=${data.end_date}&page=${data.page}&q=${data.q}&status=1,2,3,4,5`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setToday', res.data.data)
          console.log(res.data ,'setToday')
          return Promise.resolve()
        }
      })
      .catch(err => {
        console.log(err, 'addPayment err')

      })
  },
  getTodayAdmissions(context, data) {
    return this.$axios.get(`/api/v1/appointments?start_date=${data.start_date}&end_date=${data.end_date}&page=${data.page}&q=${data.q}&status=1,2,3,4,5`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')

        } else {
          console.log(res.data , 'getTodayAdmissions')
          return Promise.resolve(res.data)

        }
      })
      .catch(err => {
        console.log(err, 'addPayment err')
        return Promise.reject(err)
      })
  },
  getResultsList(context, data) {
    return this.$axios.get(`/api/v1/users/${data.id}/appointments/results?prof=${data.prof}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          switch (data.prof) {
            case "radio":
              context.commit('setRadioResults', res.data)
              break;
            case "photo":
              context.commit('setPhotoResults', res.data)
              break;
            case "lab":
              context.commit('setLabResults', res.data)
              break;
          }
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        console.log(err, 'addPayment err')

      })
  },
  getRadiosList(context, data) {
    return this.$axios.get(`/api/v1/organizations/${data.id}/radios?page=${data.page}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setRadios', res.data)
          return Promise.resolve()
        }
      })
      .catch(err => {
        console.log(err, 'addPayment err')

      })
  },
  getPhotosList(context, data) {
    return this.$axios.get(`/api/v1/organizations/${data.id}/photos?page=${data.page}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setPhotos', res.data)
          return Promise.resolve()
        }
      })
      .catch(err => {
        console.log(err, 'addPayment err')

      })
  },
  getOfficesList(context, data) {
    return this.$axios.get(`/api/v1/organizations/${data.id}/offs?page=${data.page}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setOffs', res.data)
          return Promise.resolve()
        }
      })
      .catch(err => {
        console.log(err, 'addPayment err')

      })
  },
  getHoliday(context, loginData) {
    return this.$axios.get(`/api/v1/holidays?start_date=${loginData.start_date}&end_date=${loginData.end_date}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          console.log(res.data)
          context.commit('setHoliday', res.data)
          return Promise.resolve()
        }
      })
      .catch(err => {
      })
  },
  addHoliday(context, loginData) {
    return this.$axios.post('/api/v1/holidays', loginData)
      .then((res) => {
        console.log(res, 'addPayment')
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
      .catch(err => {
        console.log(err, 'addPayment err')
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
}
export const getters = {
  getPatient(state) {
    return state.patient
  },
  getPatients(state) {
    return state.patients
  },
  getAppointments(state) {
    return state.appointments
  },
  getPatientPayments(state) {
    return state.patientPayments
  },
  getToday(state) {
    return state.today
  },
  getRadioResults(state) {
    return state.radioResults
  },
  getPhotoResults(state) {
    return state.photoResults
  },
  getLabResults(state) {
    return state.labResults
  },
  getRadios(state) {
    return state.radios
  },
  getPhotos(state) {
    return state.photos
  },
  getOffs(state) {
    return state.offs
  },
  getHoliday(state) {
    return state.holiday
  },
  getInstitutions(state) {
    return state.institutions
  },
  getOpenDent1(state) {
    return state.openDent1
  },
  getOpenDent2(state) {
    return state.openDent2
  },
}
