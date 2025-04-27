<template>
   <div class="app-container">
      <el-row :gutter="10" class="mb8">
         <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate">修改</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete">删除</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button type="danger" plain icon="Refresh" @click="handleRefreshCache">刷新缓存</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table v-loading="loading" :data="typeList" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" align="center" />
         <el-table-column label="图片名称" align="center" prop="dictName" :show-overflow-tooltip="true" />
         <el-table-column label="预览" align="center" prop="status">
            <template #default="scope">
               <el-image style="width: 100px; height: 100px" :src="url" fit="cover" @click="onPhotoClick(scope.$index)">
                  <template #progress="{ activeIndex, total }">
                     <span>{{ activeIndex + 1 + '-' + total }}</span>
                  </template>
               </el-image>
            </template>
         </el-table-column>
         <!-- <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" /> -->
         <el-table-column label="上传时间" align="center" prop="createTime" width="180">
            <template #default="scope">
               <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
         </el-table-column>
         <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
               <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
            </template>
         </el-table-column>
      </el-table>

      <el-image-viewer
        v-if="showPreview"
        :url-list="srcList"
        show-progress
        :initial-index="initialIndex"
        teleported
        @close="showPreview = false"
      />

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
         v-model:limit="queryParams.pageSize" @pagination="getList" />
   </div>
   <addDialog ref="addDialogRef" />
</template>

<script setup name="Dict">
impoer addDialog from './components/addDialog.vue'
import useDictStore from '@/store/modules/dict'
import { listType, getType, delType, addType, updateType, refreshCache } from "@/api/system/dict/type"

const { proxy } = getCurrentInstance()
const { sys_normal_disable } = proxy.useDict("sys_normal_disable")

const typeList = ref([])
const addDialogRef = ref()
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const ids = ref([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const dateRange = ref([])
const showPreview = ref(false)
const initialIndex = ref(1)

const data = reactive({
   form: {},
   queryParams: {
      pageNum: 1,
      pageSize: 10,
      dictName: undefined,
      dictType: undefined,
      status: undefined
   },
   rules: {
      dictName: [{ required: true, message: "字典名称不能为空", trigger: "blur" }],
      dictType: [{ required: true, message: "字典类型不能为空", trigger: "blur" }]
   },
})

const { queryParams, form, rules } = toRefs(data)

/** 查询字典类型列表 */
function getList() {
   loading.value = true
   listType(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
      typeList.value = response.rows
      total.value = response.total
      loading.value = false
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
   proxy.resetForm("queryRef")
   handleQuery()
}

/** 新增按钮操作 */
function handleAdd() {
   addDialogRef.value.open().then(() => [
      
   ])
}

/** 多选框选中数据 */
function handleSelectionChange(selection) {
   ids.value = selection.map(item => item.dictId)
   single.value = selection.length != 1
   multiple.value = !selection.length
}



/** 删除按钮操作 */
function handleDelete(row) {
   const dictIds = row.dictId || ids.value
   proxy.$modal.confirm('是否确认删除字典编号为"' + dictIds + '"的数据项？').then(function () {
      return delType(dictIds)
   }).then(() => {
      getList()
      proxy.$modal.msgSuccess("删除成功")
   }).catch(() => { })
}


/** 刷新缓存按钮操作 */
function handleRefreshCache() {
   refreshCache().then(() => {
      proxy.$modal.msgSuccess("刷新成功")
      useDictStore().cleanDict()
   })
}

const handleUpdate = () => {
}

const onPhotoClick = (index) => {
   initialIndex.value = index
   showPreview.value = true
}


const url =
   'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const srcList = [
   'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
   'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
   'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
   'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
   'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
   'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
   'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]

getList()
</script>
