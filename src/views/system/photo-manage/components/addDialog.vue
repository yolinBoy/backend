<template>
    <el-dialog :title="title" v-model="visible" width="500px" append-to-body>
        <el-form ref="dictRef" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="字典名称" prop="dictName">
                <el-input v-model="form.dictName" placeholder="请输入字典名称" />
            </el-form-item>
            <el-form-item label="字典类型" prop="dictType">
                <el-input v-model="form.dictType" placeholder="请输入字典类型" />
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :value="dict.value">{{ dict.label
                        }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup name="addPhoto">
const visible = ref(false)
let openResolve = null
const open = () => {
    return new Promise((resolve, reject) => {
        visible.value = true
        openResolve = resolve
    })
}


</script>