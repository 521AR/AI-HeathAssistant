import axios from 'axios'
import { ElMessage } from 'element-plus'




//创建axios实例
const service = axios.create({
    //请求的前缀
    baseURL: '/api',
    //请求超时时间
    timeout: 5000
})

//创建一个请求拦截器
service.interceptors.request.use(
    //请求发送前做些什么
    //获取token并添加到请求头
    (config) => {
        const token = localStorage.getItem('token')
        if(token){
            config.headers['token'] = token
        }
        return config
    },
    //请求错误做些什么
    (error) => {
        return Promise.reject(error)
    }
)

//创建一个响应拦截器
service.interceptors.response.use(
    (response) => {
        //响应数据做点什么
        const{data,config}=response
        console.log('响应拦截器收到数据:', data)
        //处理业务状态码
        if(data.code==='200'){
            return data.data
        }
        else{
            if(data.code === '-1'){
                //登录过期
                if(!config.url?.includes('/login')){
                    ElMessage.error(data.msg||'登录过期，请重新登录！')
                    //清除登录信息(token)
                    localStorage.removeItem('token')
                    //清除用户信息
                    localStorage.removeItem('userInfo')
                    window.location.href = '/auth/login'
                }else{
                    ElMessage.error(data.msg||'登录过期，请重新登录！')
                    return Promise.reject(data)
                }
            } else {
                // 其他错误，返回错误信息
                console.log('业务错误:', data)
                return Promise.reject(data)
            }
        }
    },
    //响应错误做点什么
    (error) => {
        console.error('网络请求错误:', error)
        ElMessage.error('网络请求失败')
        return Promise.reject(error)
    }
)


//对外进行暴露
export default service

