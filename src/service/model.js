import request from '@/plugins/request'

export function queryModel() {
  return request({
    url: '/model/all',
    method: 'get'
  })
}
