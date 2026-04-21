<template> 
    <div class="knowledge-container">
        <div class="header-section">
            <div class="header-content">
                <el-image :src="iconUrl" style="width: 60px;height: 60px;"></el-image>
                <h1>知识库</h1>
            </div>
            <!-- 左侧菜单 -->
             <div class="recommend-section">
                <div class="section-title">推荐阅读</div>
                <div class="recommend-list">
                    <div v-for="item in recommendList" :key="item.id" class="recommend-item">
                        <h4>{{item.title}}</h4>
                        <p class="read-count">
                            <el-icon><Histogram/></el-icon>
                            阅读量{{ item.readCount }}
                        </p>
                    </div>
                </div>
             </div>
             <!-- 右侧内容区域 -->
            <div class="article-list"></div>
        </div>
    </div>
</template>
<script setup>
import { ref ,onMounted,reactive} from 'vue'
import iconUrl from '@/assets/images/book.png'
import { getSessionList,getKnowLedgeList } from '@/api/frontend'
//推荐阅读列表
const recommendList=ref([])
//右侧列表数据
const pagination=reactive({
    currentPage:1,
    size:10,
    total:0
})
//获取列表的方法
const getPageList=()=>{
    const params={
        sortField:'readCount',
        sortOrder:'desc',
        pageNum:pagination.currentPage,
        size:pagination.size
    }
    getKnowLedgeList(params).then(res=>{
        console.log(res)
        pagination.total=res.total
        pagination.currentPage=res.currentPage
        pagination.size=res.size
        pagination.records=res.records
    })
}
onMounted(()=>{
    //获取推荐阅读列表
    const params={
        sortField:'readCount',
        sortOrder:'desc',
        pageNum:1,
        size:5
    }
    getKnowLedgeList(params).then(res=>{
        console.log(res)
        recommendList.value=res.records
    })
})
</script>
<style lang="scss" scoped>
.knowledge-container {
    background: linear-gradient(135deg, #fafbfc 0%, #f7f9fc 50%, #f2f6fa 100%);
    .flex-box {
        display: flex;
        align-items: center;
        span {
            margin-left: 10px;
        }
    }
    .header-section {
        background: linear-gradient(135deg, #f59e0b 0%, #8b5cf6 100%);
        color: white;
        padding: 48px;
        .header-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }
    .content {
        display: flex;
        gap: 20px;
        margin: 0 auto;
        width: 1200px;
        padding: 20px;
        .recommend-section {
            width: 280px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            padding: 15px;
            height: 400px;
            .section-title {
                font-size: 12;
                font-weight: 600;
                color: #374151;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .recommend-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                .recommend-item {
                    border-left: 4px solid #f59e0b;
                    padding-left: 10px;
                    cursor: pointer;
                    .read-count {
                        margin-top: 15px;
                        font-size: 12px;
                        color: #6b7280;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                }
            }
        }
        .article-list {
            flex: 1;
            .article-item {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
                padding: 15px;
                margin-bottom: 20px;
                display: flex;
                .info {
                    margin-left: 20px;
                    .title {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                }
            }
        }
    }
    .pagination-wrapper {
        display: flex;
        justify-content: center;
        padding-bottom: 30px;
    }
}
</style>