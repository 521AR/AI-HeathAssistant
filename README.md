````markdown
# AI 心理健康助手

## 项目简介

AI 心理健康助手是一个基于 Vue 3 开发的心理健康管理系统，旨在为用户提供情绪记录、心理咨询、健康知识等服务，帮助用户更好地管理心理健康。

## 功能特性

### 前端功能

- **情绪日志**：记录和管理用户的情绪状态
- **心理咨询**：提供在线咨询服务
- **健康知识**：展示心理健康相关文章
- **个人中心**：用户信息管理

### 后台管理

- **文章管理**：发布和管理健康知识文章
- **用户管理**：管理用户信息
- **咨询管理**：处理用户咨询请求

## 技术栈

- **前端框架**：Vue 3 + Vite
- **UI 库**：Element Plus
- **状态管理**：Pinia
- **路由管理**：Vue Router
- **HTTP 客户端**：Axios
- **图表库**：ECharts
- **富文本编辑器**：WangEditor
- **样式预处理器**：Sass

## 项目结构

```
ai-vue/
├── public/              # 静态资源
├── src/
│   ├── api/            # API 接口
│   │   ├── admin.js    # 后台 API
│   │   └── frontend.js # 前端 API
│   ├── assets/         # 资源文件
│   │   ├── images/     # 图片资源
│   │   └── ...
│   ├── components/     # 组件
│   ├── config/         # 配置文件
│   ├── router/         # 路由配置
│   ├── stores/         # 状态管理
│   ├── utils/          # 工具函数
│   ├── views/          # 页面视图
│   ├── App.vue         # 根组件
│   ├── main.js         # 入口文件
│   └── style.css       # 全局样式
├── .gitignore          # Git 忽略文件
├── index.html          # HTML 模板
├── package.json        # 项目配置
├── vite.config.js      # Vite 配置
└── README.md           # 项目说明
```

## 安装部署

### 环境要求

- Node.js 14.0+
- npm 6.0+

### 安装依赖

```bash
npm install
```

### 安装特定依赖

如果需要单独安装某个依赖，可以使用以下命令：

```bash
# 安装 Element Plus
npm install element-plus @element-plus/icons-vue

# 安装 Pinia
npm install pinia

# 安装 Vue Router
npm install vue-router

# 安装 Axios
npm install axios

# 安装 ECharts
npm install echarts

# 安装 WangEditor
npm install @wangeditor/editor @wangeditor/editor-for-vue

# 安装 Sass
npm install sass --save-dev
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 核心功能模块

### 1. 情绪日志

- 记录每日情绪状态
- 查看情绪变化趋势
- 情绪分析与建议

### 2. 心理咨询

- 在线咨询服务
- 咨询历史记录
- 专业心理指导

### 3. 健康知识

- 分类展示健康文章
- 文章详情阅读
- 阅读量统计

### 4. 后台管理

- 文章发布与管理
- 用户信息管理
- 咨询请求处理

## API 接口

### 前端 API

- `getSessionList`：获取心理咨询会话列表
- `getKnowLedgeList`：获取健康知识文章列表
- `getKnowledgeDetail`：获取文章详情

### 后台 API

- 文章管理接口
- 用户管理接口
- 咨询管理接口

## 项目特色

1. **响应式设计**：适配不同设备屏幕
2. **用户友好**：简洁直观的界面设计
3. **功能完整**：涵盖心理健康管理的主要功能
4. **技术先进**：使用 Vue 3 最新特性
5. **易于扩展**：模块化的代码结构

## 未来规划

- 增加 AI 情绪分析功能
- 集成更多心理健康评估工具
- 开发移动端应用
- 增加社区互动功能

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT

````

