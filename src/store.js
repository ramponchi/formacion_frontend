import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios')

Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  accessToken: localStorage.getItem('access_token') || null, // makes sure the user is logged in even after
  // refreshing the page
  refreshToken: localStorage.getItem('refresh_token') || null,
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  updateLocalStorage (state, { access, refresh }) {
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
    state.accessToken = access
    state.refreshToken = refresh
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions: {
    // run the below action to get a new access token on expiration
    refreshToken (context) {
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/credentials/token/refresh/', {
          refresh: context.state.refreshToken
        }) // send the stored refresh token to the backend API
          .then(response => { // if API sends back new access and refresh token update the store
            debugger
            console.log('New access successfully generated')
            context.commit('updateAccess', response.data.access)
            // context.commit('updateRefresh', response.data.access)
            resolve(response.data.access)
          })
          .catch(err => {
            console.log('error in refreshToken Task')
            reject(err) // error generating new access and refresh token because refresh token has expired
          })
      })
    },
    loginUser (context, credentials) {
      return new Promise((resolve, reject) => {
        // send the username and password to the backend API:
        axios.post('http://127.0.0.1:8000/credentials/token/', {
          username: credentials.username,
          password: credentials.password
        })
        //if successful update local storage:
          .then(response => {
            context.commit('updateLocalStorage', { access: response.data.access, refresh: response.data.refresh }) // store the access and refresh token in localstorage
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    resetPassword (context, email) {
      return new Promise((resolve, reject) => {
        // send the username and password to the backend API:
        axios.post('http://127.0.0.1:8000/credentials/pwd/password_reset/', {
          email: email,
        })
        //if successful update local storage:
          .then(response => {
            context.commit('updateLocalStorage', { access: response.data.access, refresh: response.data.refresh }) // store the access and refresh token in localstorage
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    setMessage(context, msg){
      context.commit('showMessage', {description: msg.desc, type: msg.type})
      // resolve()
    },
    setMessageCurrent(context, msg){
      context.commit('showMessageCurrent', {description: msg.desc, type: msg.type})
      // resolve()
    }
  }
})