require('whatwg-fetch')
export const state = () =>({
  token :null,
  user: null,
})
export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setToken(state, token) {
    state.token = token
  },
}
export const actions ={
  setUser({commit}, user) {
    commit('setUser', user);
  },
  setToken({commit}, token) {
    this.$cookies.set('token', token);
    commit('setToken', token);
  },
  nuxtClientInit(context,) {
    const token = this.$cookies.get('token') || ''
    if (token) {
      this.$axios.setHeader('Authorization', `Bearer ${token}`)
      return this.$axios.get('/api/v1/own')
        .then((res) => {
          if (res.status === 401) {
            throw new Error('Bad credentials')
          } else {
            context.commit('setUser', res.data);
            return Promise.resolve(res.data)
          }
        })
        .catch(err=>{
          context.commit('setUser', null);
          this.$cookies.remove('token')
          this.$axios.setHeader('Authorization', ``)
          return Promise.reject(err)
        })
    }
  },
  login(context, loginData) {
    return this.$axios.post('/api/v1/auth/login', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUser', res.data.user);
          context.commit('setToken', res.data.access_token);
          this.$axios.setHeader('Authorization', `Bearer ${res.data.access_token}`)
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err);
      })
  },
  loginPatient(context, loginData) {
    return this.$axios.post('/api/v1/auth/login/code', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUser', res.data.user);
          context.commit('setToken', res.data.access_token);
          this.$axios.setHeader('Authorization', `Bearer ${res.data.access_token}`)
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err);
      })
  },
  exit(context){
    context.commit('setToken' ,null)
    context.commit('setUser' , null)
    this.$cookies.set('token', null);
    this.$cookies.set('rememberMe', null);
    this.$axios.setHeader('Authorization', `Bearer `)
  },
}
export const getters = {
  getUser(state){
    return state.user
  },
}
