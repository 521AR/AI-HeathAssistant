<template>
    <div class="knowledge-container">
        <div class="header-section">
            <div class="header-content">
                <el-image :src="iconUrl" style="width: 60px;height: 60px;"></el-image>
                <h1>情绪日志</h1>
            </div>
            <div class="content">
                <!-- 左侧菜单 -->
                <div class="recommend-section">
                    <div class="section-title">推荐阅读</div>
                    <div class="recommend-list">
                        <div @click="goToArticle(item.id)" v-for="item in recommendList" :key="item.id"
                            class="recommend-item">
                            <h4>{{ item.title }}</h4>
                            <p class="read-count">
                                <el-icon>
                                    <Histogram />
                                </el-icon>
                                阅读量{{ item.readCount }}
                            </p>
                        </div>
                    </div>
                </div>
                <!-- 右侧内容区域 -->
                <div class="article-list">
                    <div @click="goToArticle(item.id)" v-for="item in articleList" :key="item.id" class="article-item">
                        <el-image style="width: 200px; height: 120px; flex-shrink: 0;"
                            :src="getImage(item.coverImage)"></el-image>
                        <div class="info" style="flex: 1; min-width: 0;">
                            <div class="title"
                                style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px;">
                                <h3 style="font-size: 16px; font-weight: 600; color: #374151; margin: 0; flex: 1;">{{
                                    item.title }}</h3>
                                <el-tag Plain type="primary" size="small">{{ item.categoryName }}</el-tag>
                            </div>
                            <div style="margin-top: 10px;">
                                <div class="flex-box"
                                    style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px;">
                                    <span style="font-size: 16px; color: #6b7280;">👤</span>
                                    <span style="font-size: 14px; color: #6b7280;">{{ item.authorName }}</span>
                                </div>
                                <div class="flex-box" style="display: flex; align-items: center; gap: 5px;">
                                    <span style="font-size: 16px; color: #6b7280;">📅</span>
                                    <span style="font-size: 14px; color: #6b7280;">{{
                                        dayjs(item.updatedAt).format('YYYY-MM-DD') }}
                                    </span>
                                </div>
                            </div>
                            <div style="margin-top: 10px;">
                                <div class="flex-box"
                                    style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px;">
                                    <span style="font-size: 16px; color: #6b7280;">👁️</span>
                                    <span style="font-size: 14px; color: #6b7280;">观看人数{{ item.readCount }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 分页 -->
            <div class="pagination-wrapper">
                <el-pagination style="margin-top: 25px;" :page-size="pagination.size" layout="prev, pager, next"
                    :total="pagination.total" @change="handleChange" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import iconUrl from '@/assets/images/book.png'
import { useRouter } from 'vue-router'
import router from '@/router'
import { dayjs } from 'element-plus'
import { getSessionList, getKnowLedgeList } from '@/api/frontend'
//推荐阅读列表
const recommendList = ref([])
const articleList = ref([])
//右侧列表数据

const pagination = reactive({
    currentPage: 1,
    size: 5,
    total: 0
})
//右侧列表数据

//获取列表的方法
const getPageList = () => {
    const params = {
        sortField: 'publishedAt',
        sortDirection: 'desc',
        ...pagination
    }
    getKnowLedgeList(params).then(res => {
        articleList.value = res.records
        pagination.total = res.total
    })
}
//跳转到详情页面
const goToArticle = (id) => {
    router.push(`/knowledge/article/${id}`)
}
//获取封面图片
const getImage = (url) => {
    return url ? 'http://159.75.169.224:1235' + url : 'http://file.itndedu.com/psychology_ai.png'
}
const handleChange = (page) => {
    pagination.currentPage = page
    getPageList()
}
onMounted(() => {
    //获取推荐阅读列表
    const params = {
        sortField: 'readCount',
        sortDirection: 'desc',
        currentPage: 1,
        size: 10
    }
    //获取列表
    getPageList()
    getKnowLedgeList(params).then(res => {
        console.log(res)
        recommendList.value = res.records
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
            flex: 0 0 250px;
            max-width: 250px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            padding: 12px;


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
                gap: 0.8rem;

                .recommend-item {
                    border-left: 4px solid #f59e0b;
                    padding: 10px 8px;
                    cursor: pointer;
                    border-radius: 0 8px 8px 0;
                    transition: all 0.2s ease;

                    &:hover {
                        background-color: #f9fafb;
                        transform: translateX(2px);
                    }

                    h4 {
                        font-size: 15px;
                        font-weight: 600;
                        color: #111827;
                        margin: 0 0 8px 0;
                        line-height: 1.4;
                        transition: color 0.2s ease;

                        &:hover {
                            color: #f59e0b;
                        }
                    }

                    .read-count {
                        margin-top: 8px;
                        font-size: 12px;
                        color: #6b7280;
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }
                }
            }
        }

        .article-list {
            flex: 1;
            min-width: 0;

            .article-item {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
                padding: 20px;
                margin-bottom: 20px;
                display: flex;
                gap: 20px;

                .info {
                    flex: 1;
                    min-width: 0;

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