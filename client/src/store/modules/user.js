import UserService from '../../service/user'
import { LocalStorage } from 'quasar'

export const namespaced = true
export const state = {
  username: '',
  userId: ''
}
export const mutations = {
  ENTER_SESSION(state, user) {
    state.username = user.username
    state.userId = user.userId
  },
  QUIT_SESSION(state) {
    state.username = null
    state.userId = null
  }
}
export const actions = {
  enterSession({ commit }, username) {
    return UserService.isUserExist(username)
      .then(res => {
        if (res.data.exist) {
          commit('ENTER_SESSION', {
            username: res.data.user.username,
            userId: res.data.user._id
          })
          LocalStorage.set('username', res.data.user.username)
          LocalStorage.set('userId', res.data.user._id)
        } else {
          UserService.createUser(username).then(res => {
            commit('ENTER_SESSION', {
              username: res.data.user.username,
              userId: res.data.user._id
            })
            LocalStorage.set('username', res.data.user.username)
            LocalStorage.set('userId', res.data.user._id)
          })
        }
      })
      .catch(err => console.log(err))
  },
  quitSession({ commit }) {
    LocalStorage.remove('username')
    LocalStorage.remove('userId')
    commit('QUIT_SESSION')
  }
}
