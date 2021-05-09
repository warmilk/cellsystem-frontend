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


export function uploadForm(p, p1, p2, p3) {
    return request({
        url: '/msg/modifiy',
        method: 'post',
        data: {
            p: p,
            p1: p1,
            p2: p2,
            p3: p3,
        }
    })
}