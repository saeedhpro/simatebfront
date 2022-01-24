require('whatwg-fetch')
export const state = () =>({
  today: null
})
export const mutations = {
  setToday(state, today) {
    state.today = today
  },
}
export const actions ={
  getToday(context, data) {
    return this.$axios.get(`/api/v1/appointments/search?start_date=${data.start_date}&end_date=${data.end_date}&page=${data.page}&status=${data.status}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setToday' , res.data)
          return Promise.resolve()
        }
      })
      .catch(err=>{
        console.log(err , 'getToday err')

      })
  },

}
export const getters ={
  getToday(state) {
    return state.today
  }
}
