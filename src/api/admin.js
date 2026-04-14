import service from '@/utils/request'
export function login(data){
    return service.post('/user/login',data)
}

export function categoryTree(){
    return service.get('/knowledge/category/tree')
}

export function articlePage(params){
    return service.get('/knowledge/article/page',{params:params})
}

//文件上传的接口定义
export function uploadFile(file,businessInfo){
    const formData = new FormData()
    //上传文件的标签
    formData.append('file',file)
    //文件的内容
    formData.append('businessType','ARTICLE')
    formData.append('businessId',businessInfo.businessId)
    formData.append('businessField','cover')
    return service.post('/file/upload',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })

}