import request from '@/plugins/request'
import qs from 'qs'



export function uploadSliceImg(fileBlobData) {
    let formData = new FormData();
    formData.append('file', fileBlobData, 'filename');
    return request({
        url: '/file/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}
