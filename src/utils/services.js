/**
 * 这里是ajax的通用访问接口处理
 */
import axios from 'axios';
import Qs from 'qs';
import './expromise.js';
import Message from './msgbox.js';

const ENV = process.env.NODE_ENV;

// const toString = Object.prototype.toString;
const service = axios.create({
  baseURL: '',
  timeout: 60000,
  transformRequest: function (data, config, test) {
    return Qs.stringify(data);
  },
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

const showMessage = (message, type = 'error') => {
  Message({
    showClose: true,
    type: type,
    duration: 4000,
    message
  });
};

/**
 * 服务端接口empty字符串跟null返回的结果不同，过滤掉empty字符串
 * @param params
 * @param emptyString 是否过滤空字符串
 */
function filterEmptyKey(params, emptyString) {
  Object.keys(params).forEach(key => {
    if (params[key] === null || (emptyString && params[key] === '')) {
      delete params[key];
    }
  });
}

service.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      const params = {
        ...config.data
      };
      filterEmptyKey(params, false);
      /*const lowerUrl = (config.url + '').toLocaleLowerCase();
      const hasAbsoluteSchema = config.url.indexOf('http') === 0;
      if (!hasAbsoluteSchema) {
        if (lowerUrl.indexOf('/dsp/') > -1 || lowerUrl.indexOf('/dmp/') > -1) {
          for (const key in params) {
            const type = toString.call(params[key]);
            if (type === '[object Object]' || type === '[object Array]') {
              params[key] = JSON.stringify(params[key]);
            }
          }
        }
      }*/
      config.data = params;
    } else if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      };
      filterEmptyKey(config.params, true); //get过滤空字符串
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  res => {
    const { data, config } = res;
    if ((!data.success || data.success === 'false') && data.code !== 200) {
      //判断是否文件
      if (config.file && res.status === 200) {
        convertRes2Blob(res);
        return true;
      }
      const msg = data.errorMessage || data.message || data.msg || '未知错误';
      const code = data.errorCode || data.code || -1000;

      //未手动配置 隐藏 消息提示时，公共提醒错误
      if (!config.hidden) {
        showMessage(`${config.action || '请求'}失败：${msg}`);
      }

      //登录权限跳转
      if (code === 401) {
        setTimeout(() => {
          const url = encodeURIComponent(window.location.href);
          if (ENV !== 'development') window.top.location.href = `/login.html?gotoUrl=${url}`;
        }, 1000);
      }

      //return Promise.reject(new Error('请求失败'))
      return Promise.reject({
        code: code,
        message: msg
      });
    }

    return data || {};
  },
  error => {
    if (!error.config.hidden) {
      let message = error.message;
      if (error.response && error.response.status === 403) {
        message = '您没有该权限';
      } else if (error.response && error.response.status === 502) {
        message = '系统升级中，请稍后重试';
      } else if (error.response && error.response.status === 504) {
        message = '系统超时，请重试';
      }
      showMessage(`${error.config.action || '请求'}失败：${message}`);
    }
    return Promise.reject(error);
  }
);

/**
 * 以json格式向后端提交数据
 *
 * @param {String} url 请求的url
 * @param {Object} params 参数
 * @param {Object} config 配置
 *
 * @returns promise对象
 */
service.json = (url, params, config) => {
  const defaultConfig = {
    headers: {
      'Content-Type': 'application/json'
    },
    transformRequest: function (data, requestConfig) {
      if (Array.isArray(params)) {
        return JSON.stringify(params);
      }
      return JSON.stringify(data);
    }
  };
  const newConfig = Object.assign(defaultConfig, config);
  return service.post(url, params, newConfig);
};

/**
 * 带有数组参数的get请求，需要对数组参数转换，如ids: [1, 2, 3]转换成ids=1&ids=2&ids=3
 * @param url
 * @param config
 * @return {AxiosPromise<any>}
 */
service.arrayGet = (url, config) => {
  if (config) {
    config.paramsSerializer = function (params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' });
    };
  }
  return service.get(url, config);
};

/**
 * 下载请求
 * @param {String} url 请求的url
 * @param {Object} config 配置
 * @return promise对象
 */
service.download = (url, config = {}) => {
  const { type = 'get', params = {} } = config;
  const defaultConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      withCredentials: true
    },
    file: true,
    responseType: 'blob'
  }
  const newConfig = Object.assign(defaultConfig, config);
  if (type === 'get') {
    newConfig.params = params;
    return service.get(url, newConfig);
  }else if(type === 'json'){
    newConfig.transformRequest = function (data, requestConfig) {
      if (Array.isArray(params)) {
        return JSON.stringify(params);
      }
      return JSON.stringify(data);
    }
  }
  return service.post(url, params, newConfig);
};
/**
 * 流文件通过浏览器下载
 * @param response
 */
function convertRes2Blob(response) {
  // 提取文件名
  /*const fileName = response.headers['content-disposition'].match(
    /filename=(.*)/
  )[1]*/
  let contentDisposition = response.headers['content-disposition']; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  let patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
  let result = patt.exec(contentDisposition);
  // let fileName = decodeURI(result[1]);
  let fileName = result?.[1] ? decodeURI(result[1]) : 'file.xlsx';
  // 将二进制流转为blob
  const blob = new Blob([response.data], { type: 'application/vnd.ms-excel;charset=utf-8' });
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
    window.navigator.msSaveBlob(blob, decodeURI(fileName))
  } else {
    // 创建新的URL并指向File对象或者Blob对象的地址
    const blobURL = window.URL.createObjectURL(blob)
    // 创建a标签，用于跳转至下载链接
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', decodeURI(fileName))
    // 兼容：某些浏览器不支持HTML5的download属性
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }
    // 挂载a标签
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    // 释放blob URL地址
    window.URL.revokeObjectURL(blobURL)
  }
}

export default service;
