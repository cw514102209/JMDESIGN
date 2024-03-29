import axios from 'axios';
import { notification, Icon } from 'antd';

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

const request = axios.create({
  baseURL: '/',
  timeout: 9999,
  method: 'GET',
});

request.interceptors.request.use(
  async (config) => {
    config.headers.authorization = localStorage.getItem('authorization_token');
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  async (response) => {
    if (!!response.data.status && response.data.status !== 200) {
      notification.error({
        message: '温馨提示',
        description: response.data.message,
        icon: <Icon type="close-circle" theme="filled" style={{ color: '#CF1322', fontSize: '21px' }} />,
        duration: 25,
        top: 58,
      });

      localStorage.removeItem('authorization_token');
      window.location.hash = '#/login';
      return;
    }
    return response.data;
  },
  (error) => Promise.reject(error)
);

export default request;
