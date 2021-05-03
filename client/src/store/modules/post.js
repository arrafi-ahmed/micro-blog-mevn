import PostService from '../../service/post'
import { Notify } from 'quasar'

export const namespaced = true
export const state = {
  posts: [],
  post: {}
}
export const mutations = {
  CREATE_POST(state, post) {
    state.posts.unshift(post)
  },
  GET_POSTS(state, posts) {
    state.posts = posts
  }
}
export const actions = {
  createPost({ commit }, post) {
    return PostService.createPost(post)
      .then(res => {
        commit('CREATE_POST', res.data.post)
        Notify.create(res.data.message)
      })
      .catch(err =>
        Notify.create(err.response ? err.response.data.message : err.toString())
      )
  },
  getPosts({ commit }, bar) {
    bar.start()
    return PostService.getPosts()
      .then(res => {
        bar.stop()
        commit('GET_POSTS', res.data.posts)
      })
      .catch(err =>
        Notify.create(err.response ? err.response.data.message : err.toString())
      )
  }
}
