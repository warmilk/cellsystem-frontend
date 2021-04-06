import request from '@/plugins/request'

export function queryRegion() {
  return request({
    url: '/region/all',
    method: 'get'
  })
}
