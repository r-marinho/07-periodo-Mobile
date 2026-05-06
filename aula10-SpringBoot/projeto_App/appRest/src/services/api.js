import axios from 'axios'

const api = axios.create({
  baseURL: 'https://verbose-dollop-x597q5v7w4vq3v6g9-8080.app.github.dev',
  timeout: 10000
})

export default api