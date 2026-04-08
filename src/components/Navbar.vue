<template>
  <div class="navbar">
    <div class="flex-box">
      <el-button @click="handleCollapse">
        <el-icon>
          <Expand />
        </el-icon>
      </el-button>
      <p class="page-title">导航栏</p>
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
import { useAdminStore } from '@/stores/admin'
import { ref } from 'vue'
const handleCommand = (command) => {
  console.log(command)
  if(command==='logout'){
    //处理登出登录的逻辑
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
