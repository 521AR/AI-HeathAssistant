<template>  
    <el-dialog title="文章详情" 
    v-model="dialogVisible"
        width="50%"
        @close="handleClose"
        >
        <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="formData.title" placeholder="请输入文章标题"  maxlength="200" show-word-limit clearable/>
          </el-form-item>
          <el-form-item label="所属分类" prop="categoryId">
            <el-select v-model="formData.categoryId" placeholder="请选择分类">
              <el-option v-for="item in props.categories" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="文章摘要" prop="summary">
            <el-input type="textarea" v-model="formData.summary" placeholder="请输入文章摘要(可选)"  maxlength="1000" show-word-limit :rows="4"/>
          </el-form-item>
          <el-form-item label="标签" prop="tags">
            <el-select v-model="formData.tagArray" placeholder="请输入文章标签(逗号分隔)"  
            multiple filterable allow-create style="width:100% ">
                <el-option v-for="tag in commonTags" :key="tag" :label="tag" :value="tag" />
            </el-select>
          </el-form-item>
          <el-form-item label="封面图片">
            <div class="cover-upload">
                <el-upload
                    class="avatar-uploader"
                    action="#"
                    :before-upload="beforeUpload"
                    :http-request="handleUploadRequest"
                    :show-file-list="false"
                    accept="image/*"
                    >
                    <div v-if="!imgUrl" class="cover-placeholder">
                        <p>点击上传封面封面</p>
                    </div>
                    <img v-else :src="imgUrl" class="cover-image"   alt="封面图片"/>
                </el-upload>
                <div v-if="imgUrl" class="cover-remove" >
                  <button style="color: red; border-radius: 0% solid 0;" type="danger" size="mini" @click="handleRemove">移除封面</button>
                </div>
            </div>
          </el-form-item>
          <el-form-item label="文章内容" prop="content">
            <RichTextEditor v-model="formData.content" 
            placeholder="请输入文章内容,支持富文本格式、你\n\n可以使用加粗、斜体、列表、标题等格式来丰富文章内容" 
            :maxCharCount="5000"
            @change="handleContentChange"
            @created="handleEditorCreated"
            min-height="400px"
            />
          </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>
import { reactive } from 'vue'
import { ref, computed ,nextTick} from 'vue'
import { ElMessage } from 'element-plus'
import { uploadFile } from '../api/admin' 
import {fileBaseUrl} from '../config/index.js'
import RichTextEditor from '@/components/RichTextEditor.vue'
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    categories: {
        type: Array,
        default: () => []
    }
})
const emit = defineEmits(['update:modelValue'])

const dialogVisible = computed({
    get: () => {
      return props.modelValue
    } ,
    set: (value) => emit('update:modelValue', value)
})

const handleClose = () => {
    emit('update:modelValue', false)
}
//表单数据
const formData = reactive({
    "title":'',
    "content": "",
    "coverImage":"",
    "categoryId":1,
    "summary":"",
    "tags":"",
    "id":""
})
const rules = reactive({
    title: [
      { required: true, message: '请输入文章标题', trigger: 'blur' },
      { max: 200, message: '长度200 个字符', trigger: 'blur' }
    ],
    categoryId: [
      { required: true, message: '请选择文章分类', trigger: 'change' }
    ],
})

const commonTags=[
     '情绪管理','焦虑','抑郁','压力','睡眠',
     '冥想','正念','放松','心里健康','自我成长',
     '人际关系','工作压力','学习方法','生活技巧'
]
   

//上传封面图片
const coverUpload=ref(null)

const imgUrl=ref('')

const beforeUpload=(file)=>{
    //针对上传的文件进行校验
    const isImage = file.type.startsWith('image/')
    const isLt5M=file.size/1024/1024<5
    if(!isImage){
        ElMessage.error('请上传图片文件')
        return false
    }
    if(!isLt5M){
        ElMessage.error('请上传小于5M的图片文件')
        return false
    }
    return true
}
 
const handleUploadRequest=async ({file})=>{
  //UUID生成
  const businessId=crypto.randomUUID()
  formData.coverImage=businessId
    const fileRes=await uploadFile(file,{
      businessId:businessId,
    })
    console.log(fileRes)
    //拼接完整的图片地址
    //如果上传失败，返回空字符串
    if(!fileRes.filePath){
        ElMessage.error('上传失败')
        return
    }
    //URL拼接完整的图片地址，两种方法
    //imgUrl.value=fileBaseUrl+fileRes.filePath
    imgUrl.value=`${fileBaseUrl}${fileRes.filePath}`
    formData.coverImage=fileRes.filePath
}

//富文本内容改变时触发
const handleContentChange=(data)=>{
    formData.content=data.html
}
const editorInstance=ref(null)
const handleEditorCreated=(editor)=>{
  editorRef.value=editor
  //编辑
    if(formData.content&& editor){
        nextTick(()=>{
            editor.setHtml(formData.content)
        })
    }
}

const handleRemove=()=>{
    imgUrl.value=''
    formData.coverImage=''
}

</script>

<style scoped lang="scss">
.cover-upload{
    .cover-placeholder{
      width: 200px;
      height: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #8b949e;
      background: #f6f8fa;
    }
    .cover-image{
        width: 200px;
        height: 120px;
        display: block;
    }
}
</style>