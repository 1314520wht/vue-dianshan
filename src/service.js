import axios from 'axios'

const service = axios.create({
  baseURL: 'http://rap2.taobao.org:38080/app/mock/264739',
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json;charset=utf-8'
  }
})
export default service
