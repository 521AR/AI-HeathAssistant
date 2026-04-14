<template>
    <div class="container">
        <div class="title">
            <div class="back-home">
                <el-icon>
                    <Back/>
                </el-icon>
                <span>返回首页</span>
            </div>
            <div class="title-text">
                <h2>登录您的账户</h2>
                <p>输入您的登录信息</p>
            </div>
        </div>
        <div class="form-container">
            <el-form ref="ruleFormRef" :model="formData"  :rules="rules"
            label-position="top" 
            >
                <el-form-item label="用户名或邮箱" prop="username">
                    <el-input v-model="formData.username" size="large" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" size="large" placeholder="请输入密码" type="password" show-password></el-input>
                </el-form-item>
                <el-button class="btn" size="large" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
            </el-form>
            <div class="footer">
                <p>
                    还没有账号？<router-link to="/auth/register">去注册</router-link>
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { login } from '@/api/admin'
import { ref } from 'vue'
import { reactive } from 'vue'
import router from '@/router'
import { ElMessage } from 'element-plus'
 
const ruleFormRef = ref()
const formData = reactive({
    username: '',
    password: ''
})

const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
})
//登录提交
const submitForm = async(formEl)=>{
    if(!formEl){
        return
    }
    await formEl.validate(async(valid,fields)=>{
        if(valid){
            console.log(fields)
            login(formData).then(data=>{
                //检验token是否存在
                if(!data.token){
                    ElMessage.error('登陆失败')
                    return
                }
                //登陆成功，保存token和用户信息
                localStorage.setItem('token',data.token)
                localStorage.setItem('userInfo',JSON.stringify(data.user))
                //根据用户角色决定跳转路径
                if(data.userInfo.userType===2){
                    router.push('/back/dashboard')
                }else{
                    
                }
            }).catch(error => {
                //错误已在响应拦截器中处理
            })
        }
    })
}
</script>

<style scoped lang="scss">
.container{
    width: 384px;
    .title{
        .back-home{
            margin-bottom: 60px;
        }
        .title-text{
            text-align: center;
            h2{
                font-size: 34px;
                margin-bottom: 10px;
            }
            p{
                font-size: 20px;
                color: #999;
            }
        }
    }
    .form-container{
        margin-top: 30px;
        .btn{
            margin-top: 40px;
            width: 100%;
        }
        .footer{
            padding:30px;
            text-align: center;
        }
    }
}
</style>