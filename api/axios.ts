import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  params: {
    // delay: 500
  }
})

export { api }
