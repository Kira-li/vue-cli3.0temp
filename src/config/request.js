import axios from 'axios';
import Cookies from 'js-cookie';
// 请求数据正常状态
const ajaxMy = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
});

ajaxMy.interceptors.request.use(config => {
  // 对返回的数据进行一些处理
  var data = config;
  if (data.url.indexOf("?") < 0) {
      data.url = data.url + "?t=" + Date.parse(new Date());
  } else {
      data.url = data.url + "&t=" + Date.parse(new Date());
  }
  config.headers["Cache-Control"] = "no-cache";
//   config.headers["Authorization"] = getToken(); // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  config = data;
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});
ajaxMy.interceptors.response.use(response => response, error => {
  if (error.response) {
      switch (error.response.status) {
          case 400:
              error.message = "请求错误";
              break;
          case 401:
              switch (error.response.data.message) {
                  case "Unauthorized":
                      // error.message = "登录超时";
                      // router.push({
                      //     path: "/timeOut"
                      // });
                    //   if (Cookies.get("COOKIE_SENDFROMCLIENT") === "false") {
                    //       this.$router.push({
                    //         path: "/manage/baiduOffMap"
                    //       });
                    //   } else {
                    //       router.push({
                    //           path: "/timeOut"
                    //       });
                    //   }
                      // window.location.href = '/TimeOut.html?url=' + window.location.href;
                      break;
                  default:
                      error.message = "未授权，请登录";
                      break;
              }
              break;
          case 403:
              error.message = "拒绝访问";
              break;
          case 404:
              error.message = "请求地址出错: " + error.response.config.url;
              break;
          case 408:
              error.message = "请求超时";
              break;
          case 500:
              error.message = "服务器内部错误";
              break;
          case 501:
              error.message = "服务未实现";
              break;
          case 502:
              error.message = "网关错误";
              break;
          case 503:
              error.message = "服务不可用";
              break;
          case 504:
              error.message = "网关超时";
              break;
          case 505:
              error.message = "HTTP版本不受支持";
              break;
          default:
      }
  }
  return Promise.reject(error);
});
export default ajaxMy;

export function getCookies (params) {
  return Cookies.get(params) || '';
}

export function setCookies (memberNo, openid, token) {
  Cookies.set('memberNo', memberNo);
  Cookies.set('openid', openid);
  Cookies.set('token', token);
}

