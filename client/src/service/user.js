import axios from 'axios'

const apiUri = '/api/user'
const UserService = {
  isUserExist(username) {
    return axios.post(`${apiUri}/isUserExist`, { username })
  },
  createUser(username) {
    return axios.post(`${apiUri}/createUser`, { username })
  }
}

export default UserService
