import request from '@/plugins/request'

export function queryDepartment() {
  return request({
    url: '/department/all',
    method: 'get'
  })
}
