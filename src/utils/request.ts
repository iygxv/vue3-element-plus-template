import type { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestHeaders, AxiosError, AxiosResponse } from 'axios'
import type { AxiosOptions } from '#/axios'
import axios from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'


const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: import.meta.env.VITE_API_TIMEOUT
})

service.defaults.paramsSerializer = {
  serialize(params) {
    return qs.stringify(params)
  }
}

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // ;(config.headers as AxiosRequestHeaders)['token'] = 'token'
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  function (response: AxiosResponse) {
    return response
  },
  function (error: AxiosError) {
    return Promise.reject(error)
  }
)

/**
 * http请求
 * @param {Object}  option         请求option
 * @param {String}  option.method  请求方式
 * @param {String}  option.url     请求url
 * @param {Object}  option.data    请求参数
 * @param {Object}  option.config  自定义axios config
 * @param {Boolean} option.isSerialized 数据是否已序列化
 * @param {Boolean} option.isReturnResponse 返回整个response
 * @param {Boolean} option.isReturnResult 返回接口result
 * @param {Boolean} option.isReturnError 接口非200时，返回结果
 */
function request(option: AxiosOptions) {
  return new Promise((resolve, reject) => {

    let config: any = {
      method: option?.method || '',
      url: option?.url || '',
      ...option.config
    }
    !config.headers && (config.headers = {})

    service(config)
      .then((response: AxiosResponse<any>) => {
        let data: any = response.data
        if (option.isReturnResponse) {
          resolve(response)
        } else if (option.isReturnResult) {
          resolve(data)
        } else if (data.message) {
          ElMessage(data.message)
        }
      })
      .catch((error: AxiosError) => {
        console.warn('error', error)

        if (error.message.indexOf('timeout') > -1) {
          ElMessage('请求超时')
          reject(error)
        }

        if (!error.response) return

        let data: any = error.response.data
        if (option.isReturnError) {
          reject(data)
        } else if (data.message) {
          ElMessage(data.message)
        }
        // reject(data)
      })
  })
}

request.post = <T = any>(option: AxiosOptions) => {
  return request({
    method: 'post',
    ...option
  }) as unknown as T
}

request.get = <T = any>(option: AxiosOptions) => {
  return request({
    method: 'get',
    ...option
  }) as unknown as T
}

request.put = <T = any>(option: AxiosOptions) => {
  return request({
    method: 'put',
    ...option
  }) as unknown as T
}

request.delete = <T = any>(option: AxiosOptions) => {
  return request({
    method: 'delete',
    ...option
  }) as unknown as T
}

export default request
