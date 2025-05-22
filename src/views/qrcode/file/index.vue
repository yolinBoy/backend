<template>
   <div class="app-container">
      <el-row :gutter="10" class="mb8">
         <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
         </el-col>
         <right-toolbar :search="false" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table :data="typeList">
         <el-table-column label="图片名称" align="center" prop="name" :show-overflow-tooltip="true" />
         <el-table-column label="绑定域名" prop="domain"></el-table-column>
         <el-table-column label="预览" align="center" prop="status">
            <template #default="scope">
               <el-image style="width: 100px; height: 100px" :src="'https://47.98.39.222:8443' + scope.row.path"
                  fit="cover" @click="showPreview = true; initialIndex = scope.$index">
                  <template #progress="{ activeIndex, total }">
                     <span>{{ activeIndex + 1 + '-' + total }}</span>
                  </template>
               </el-image>
            </template>
         </el-table-column>
         <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">绑定域名</el-button>
               <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
            </template>
         </el-table-column>
      </el-table>

      <el-image-viewer v-if="showPreview" :url-list="srcList" show-progress :initial-index="initialIndex" teleported
         @close="showPreview = false" />

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
         v-model:limit="queryParams.pageSize" @pagination="getList" />
   </div>
   <addDialog ref="addDialogRef" />
   <bindingDomain ref="bindingDomainRef" />
</template>

<script setup lang="jsx" name="Dict">
import addDialog from './components/addDialog.vue'
import bindingDomain from './components/bindingDomain.vue'
import { listFile, deleteFile } from '@/api/qrcode/file'
const { proxy } = getCurrentInstance()
const typeList = ref([])
const addDialogRef = ref()
const total = ref(0)
const showPreview = ref(false)
const initialIndex = ref(1)
const srcList = ref([])
const bindingDomainRef = ref()

const data = reactive({
   form: {},
   queryParams: {
      pageNum: 1,
      pageSize: 10
   }
})

const { queryParams, form, rules } = toRefs(data)

/** 查询字典类型列表 */
function getList() {
   listFile().then(response => {
      typeList.value = response.rows
      total.value = response.total
      srcList.value = response.rows.map(item => {
         return 'https://47.98.39.222:8443' + item.path
      })
   })
}


/** 表单重置 */
function reset() {
   form.value = {
      dictId: undefined,
      dictName: undefined,
      dictType: undefined,
      status: "0",
      remark: undefined
   }
   proxy.resetForm("dictRef")
}

/** 搜索按钮操作 */
function handleQuery() {
   queryParams.value.pageNum = 1
   getList()
}

/** 重置按钮操作 */
function resetQuery() {
   dateRange.value = []
   handleQuery()
}

/** 新增按钮操作 */
function handleAdd() {
   addDialogRef.value.open().then(() => [
      getList()
   ])
}



/** 删除按钮操作 */
function handleDelete(row) {
   const name = row.name
   proxy.$modal.confirm('是否确认删除图片名称为"' + name + '"的数据项？').then(function () {
      return deleteFile(row.id)
   }).then(() => {
      getList()
      proxy.$modal.msgSuccess("删除成功")
   }).catch(() => { })
}

const handleUpdate = (row) => {
   bindingDomainRef.value.open(row).then(() => {
      proxy.$modal.msgSuccess("绑定成功")
      getList()
   })
}



getList()
</script>