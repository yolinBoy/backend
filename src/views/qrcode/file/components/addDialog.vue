<template>
    <el-dialog :title="title" v-model="visible" width="500px" append-to-body>
        <el-upload
            v-model:file-list="fileList"
            list-type="picture-card"
            multiple
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
        >
            <el-icon><Plus /></el-icon>
        </el-upload>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup name="addPhoto">
import { uploadFiles } from '@/api/qrcode/file'
const { proxy } = getCurrentInstance()

const visible = ref(false)
let openResolve = null
const fileList = ref([])
const title = ref("上传图片")
const open = () => {
    return new Promise((resolve, reject) => {
        fileList.value = []
        visible.value = true
        openResolve = resolve
    })
}
const submitForm = () => {
    let formData = new FormData()
    const fileNameBase = 'additionalProp'
    fileList.value.forEach((file, index) => {
        formData.append(`${fileNameBase}${index + 1}`, file.raw, file.name)
    })
    uploadFiles(formData).then(res => {
        proxy.$message.success("上传成功")
        visible.value = false
        openResolve(res)
    })
}
const cancel = () => {
    visible.value = false
}
defineExpose({
    open
})

</script>