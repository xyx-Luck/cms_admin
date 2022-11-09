import axios from 'axios'
//创建axios实例
const server = axios.create({
    // baseURL: 'https://www.fastmook.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
    baseURL: 'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
});
//请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers=config.headers || {}
    //判断是否有token,如果有token,就在请求头中携带token
    if(localStorage.getItem('token')){
        config.headers.token=localStorage.getItem('token') || ''
    }
    return config;

  });

//响应拦截器
axios.interceptors.response.use((res):any=>{
    //如果响应状态码不等于200，就报错
    const code:number=res.data.code;
    if(code!==200){
        return Promise.reject(res.data);
    }
    return res.data;
  },(err)=>{
    console.log(err)
  });

  export default server;