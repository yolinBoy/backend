<template>
    <el-dialog title="绑定域名" v-model="visible" width="500px" append-to-body>
        <el-select v-model="form.domain" placeholder="请选择域名" clearable style="width: 300px">
            <el-option
                v-for="item in domainList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            ></el-option>
       </el-select>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup name="addPhoto">
import { bindingDomain } from '@/api/qrcode/file'
import { domainList } from '@/config/type-config'
const { proxy } = getCurrentInstance()

const visible = ref(false)
let openResolve = null
const form = ref({})
const open = (row) => {
    return new Promise((resolve, reject) => {
        form.value.domain = row.domain
        form.value.id = row.id
        visible.value = true
        openResolve = resolve
    })
}
const submitForm = () => {
    bindingDomain(form.value).then((res) => {
        openResolve()
    })
}
const cancel = () => {
    visible.value = false
}

defineExpose({
    open
})
</script>
<style lang="scss" scoped>
</style>