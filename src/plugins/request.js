import axios from 'axios'
import { BASR_URL } from '@/utils/config'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: BASR_URL
})

service.interceptors.request.use(config => {
  return config
})

service.interceptors.response.use(response => {
  if (response.config.url.slice(0, 5) === 'slice') {
    return response.data
  }
  const res = response.data
  if (res.code !== 200) {
    Message({
      message: res.message,
      type: 'error'
    })
    return null
  }
  return response.data
}, error => {
  console.log('err' + error)
  Message({
    message: error.message,
    type: 'error'
  })
  return null
})

export default service
