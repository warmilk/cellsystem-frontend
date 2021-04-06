import request from '@/plugins/request'

export function queryCell() {
  return request({
    url: '/cell/all',
    method: 'get'
  })
}

export function queryJson(sliceId, idx) {
  return request({
    url: 'slice/' + sliceId + '/' + idx + '.json?' + Math.random(),
    method: 'get'
  })
}

export function modifyCellLabel(sliceId, idx, json) {
  return request({
    url: '/cell/modify',
    method: 'post',
    data: {
      sliceId: sliceId,
      idx: idx,
      data: JSON.stringify(json)
    }
  })
}
