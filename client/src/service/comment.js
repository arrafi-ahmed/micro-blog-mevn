import axios from 'axios'

const apiUri = '/api/comment'

const CommentService = {
  createComment(commentData) {
    return axios.post(`${apiUri}/createComment`, commentData)
  }
}

export default CommentService
