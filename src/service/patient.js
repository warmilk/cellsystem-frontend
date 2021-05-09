import request from '@/plugins/request'

export function queryPatient({ currPage, pageSize, column, order, keyword }) {
  return request({
    url: '/patient/batch',
    method: 'get',
    params: { currPage, pageSize, column, order, keyword }
  })
}

export function queryPatientById(id) {
  return request({
    url: '/patient/one',
    method: 'get',
    params: {
      id
    }
  })
}
export function queryReadablePatientById(id) {
  return request({
    url: '/patient/readable/one',
    method: 'get',
    params: {
      id
    }
  })
}

export function modifyPatient(patient) {
  return request({
    url: '/patient/modify',
    method: 'post',
    data: patient
  })
}

export function insertPatient(patient, slices) {
  const formData = new FormData()
  for (let i = 0; i < slices.length; i++) {
    formData.append('slices', slices[i].raw)
  }
  for (const i in patient) {
    formData.append(i, patient[i])
  }
  return request({
    url: 'patient/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
}

export function checkPatient(sliceId, sliceNum, checkUid) {
  return request({
    url: 'patient/check',
    method: 'post',
    data: {
      checkUid: checkUid,
      sliceId: sliceId,
      sliceNum: sliceNum
    }
  })
}
