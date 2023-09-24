import axios from "axios";

/**
 * 天气
 */

// 获取高德地理位置信息

export const getAdCode = async (key) => {
    const res = await fetch(`https://restapi.amap.com/v3/ip?key=${key}`);
    return await res.json();
};

// 获取高德地理天气信息

export const getWeather = async (key, city) => {
    const res = await fetch(
        `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`,
    );
    return await res.json();
};

// 获取教书先生天气 API
// https://api.oioweb.cn/doc/weather/GetWeather
export const getOtherWeather = async () => {
    const res = await fetch("https://api.oioweb.cn/api/weather/GetWeather");
    return await res.json();
};

/**
 * 壁纸
 */

// 获取壁纸
export const getOtherBackground = async () => {
    // const service = axios.create({
    //   baseURL: "",
    //   headers: {
    //     "Cache-Control": "no-cache",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "X-Requested-With": "XMLHttpRequest",
    //   },
    // })
    // service.interceptors.request.use(
    //   (response) => {
    //     console.log('response', response);
    //   },
    //   (error) => Promise.reject(error)
    // );
    // service.interceptors.response.use(
    //   (response) => {
    //     console.log('response', response);
    //   },
    //   (error) => Promise.reject(error)
    // );
    // service.get('/api/gqapi/gqapi.php?return=json').then();
    // const xhr = new XMLHttpRequest();
    // xhr.open('GET', '/api/gqapi/gqapi.php?return=json', true);
    // xhr.abort();
    // xhr.onreadystatechange = function() {
    //   if (xhr.readyState === 4) {
    //     if (xhr.status === 300) {
    //       const location = xhr.getAllResponseHeaders();
    //       console.log('xhr', location, xhr);
    //       // 请求成功，处理响应数据
    //       const responseData = xhr.responseText;
    //       console.log(responseData);
    //     } else {
    //       // 请求失败，处理错误
    //       return console.log(1);
    //     }
    //   }
    // };
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send();
    const res = await fetch("/api/gqapi/gqapi.php?return=json");
    return await res.json();
};