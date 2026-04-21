<template>
  <div class="navbar">
    <div class="flex-box">
      <el-button @click="handleCollapse">
        <el-icon>
          <Expand />
        </el-icon>
      </el-button>
      <p class="page-title">{{ route.meta.title }}</p>
    </div>
    <div class="flex-box">
      <el-dropdown @command="handleCommand">
        <div class="flex-box">
          <el-avatar :src="avatarUrl" size="default" />
          <p class="user-name">admin</p>
          <el-icon><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { useAdminStore} from '@/stores/admin'
import { logout } from '@/api/admin'
import { ref } from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {ElMessageBox} from 'element-plus'
const router = useRouter()
const route = useRoute()
const handleCommand = (command) => {
  console.log(command)
  if(command==='logout'){
    //处理登出登录的逻辑
    ElMessageBox.confirm('确定退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      //确定登录退出
      logout().then(()=>{
        //清除缓存,保存的token信息
        localStorage.removeItem('token')
        // 清除本地存储中的用户信息
        localStorage.removeItem('userInfo')
        // 清除本地存储中的角色信息
        localStorage.removeItem('role')
        // 登出成功
        router.push('/auth/login')
      })
    }).catch(() => {
      // 取消退出登录
    })
  }
  console.log(command)
}
const handleCollapse = () => {
  useAdminStore().toggleCollapse()
}
import { Expand, ArrowDown } from '@element-plus/icons-vue'
const avatarUrl = new URL('@/assets/头像.jpg', import.meta.url).href
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background:white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #e5e7eb;
  .flex-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page-title {
    font-size: 26px;
    font-weight: bold;
    color: #1f2937;
  }
}


</style>
