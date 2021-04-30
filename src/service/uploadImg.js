import request from '@/plugins/request'

export function uploadSliceImg(fileBlobData) {
    let formData = new FormData();
    formData.append('file', fileBlobData, 'slice.jpg');
    return request({
        url: '/file/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}
