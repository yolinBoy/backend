import request from '@/utils/request'


// 获取照片列表
export function getPhotoList(postId) {
    return request({
      url: '/system/post/list',
      method: 'get',
      params: {
        pageNum: 1,
        pageSize: 10
      }
    })
}