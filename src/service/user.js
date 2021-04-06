import request from '@/plugins/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function register({ username, password, name, gender }) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      password,
      name,
      gender
    }
  })
}
