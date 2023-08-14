import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import { getToken } from '@/utils/token'

/**
 * 状态码名称
 */
const statusName = 'code'

/**
 * 操作正常的code数组
 */
const successCode = [20040, 60011]

/**
 * axios请求拦截器配置
 * @param config
 * @returns {any}
 */
const requestConf = (config) => {
  const token = getToken()
  if (token) config.headers['Token'] = token

  if (
    config.data &&
    config.headers['Content-Type'] ===
      'application/x-www-form-urlencoded;charset=UTF-8'
  )
    config.data = qs.stringify(config.data)
  return config
}

/**
 * axios响应拦截器
 * @param data response数据
 * @param status HTTP status
 * @returns {Promise<*|*>}
 */
const handleData = ({ data, status }) => {
  let code = data && data[statusName] ? data[statusName] : status
  if (successCode.indexOf(data[statusName]) + 1) code = 200
  switch (code) {
    case 200:
      return data
    case 404:
      router.push({ path: '/login' }).then(() => {})
      break
  }
  return Promise.reject(data)
}

const instance = axios.create({
  // baseURL: 'http://8.130.166.71:8080',
  baseURL: 'http://192.168.3.6:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(requestConf, (error) => {
  return Promise.reject(error)
})

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response) => handleData(response),
  (error) => {
    const { response } = error
    if (response === undefined) {
      console.log('接口有问题')
      return {}
    } else return handleData(response)
  }
)

export default instance
