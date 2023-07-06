import type { InternalAxiosRequestConfig } from 'axios'

export type AxiosMethod = 'get' | 'post' | 'put' | 'delete'

export type AxiosOptions = {
  method?: AxiosMethod
  url: string
  data?: Nullable<object>
  config?: InternalAxiosRequestConfig
  isSerialized?: boolean
  isReturnResponse?: boolean
  isReturnResult?: boolean
  isReturnError?: boolean
}
