import axios from 'axios'

const apiUri = '/api/post'

const PostService = {
  getPosts() {
    return axios.get(`${apiUri}/getPosts`)
  },
  createPost(postData) {
    return axios.post(`${apiUri}/createPost`, postData)
  },
  getComments(postId) {
    return axios.post(`${apiUri}/getComments`, { postId })
  },
  createUpvote(upvoteData) {
    return axios.post(`${apiUri}/createUpvote`, upvoteData)
  },
  createDownvote(downvoteData) {
    return axios.post(`${apiUri}/createDownvote`, downvoteData)
  }
}

export default PostService
