<template>
    <el-dialog :title="title" v-model="visible" width="500px" append-to-body>
        <el-upload
            v-model:file-list="fileList"
            list-type="picture-card"
            multiple
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
        >
            <el-icon><Plus /></el-icon>
        </el-upload>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </template>
        <el-dialog v-model="dialogVisible" width="700px" title="图片预览">
            <div class="dialog-image-preview">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="max-width: 700px; max-height: 700px;"/>
            </div>
        </el-dialog>
    </el-dialog>
</template>
<script setup name="addPhoto">
import { uploadFile } from '@/api/qrcode/file'
const { proxy } = getCurrentInstance()

const visible = ref(false)
let openResolve = null
const fileList = ref([])
const title = ref("上传图片")
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const open = () => {
    return new Promise((resolve, reject) => {
        fileList.value = []
        visible.value = true
        openResolve = resolve
    })
}
const submitForm = () => {
    let formData = new FormData()
    fileList.value.forEach(file => {
        formData.append('file', file.raw, file.name)
    })
    uploadFile(formData).then(res => {
        proxy.$message.success("上传成功")
        visible.value = false
        openResolve(res)
    })
}
const cancel = () => {
    visible.value = false
}
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
defineExpose({
    open
})
</script>
<style lang="scss" scoped>
.dialog-image-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>