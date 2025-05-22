import request from '@/utils/request'

// 查询参数列表
export function listFile(query) {
  return request({
    url: '/qrcode/file/list',
    method: 'get',
    params: query
  })
}

// 单个上传文件
export function uploadFile(data) {
  return request({
    url: '/qrcode/file/upload',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data
  })
}

// 批量上传
export function uploadFiles(data) {
  return request({
    url: '/qrcode/file/uploads',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data
  })
}

// 删除某张图片
export function deleteFile(fileId) {
  return request({
    url: '/qrcode/file/' + fileId,
    method: 'delete'
  })
}

// 绑定域名
export function bindingDomain(data) {
  return request({
    url: '/qrcode/edit',
    method: 'post',
    data: data
  })
}
