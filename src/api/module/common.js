import request from '../request'

/**
 * 用户登录
 */
export const doLogin = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

export const doLogout = () => {
  return request({
    url: '/logout',
    method: 'post',
  })
}
