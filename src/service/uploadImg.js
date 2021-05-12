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


export function uploadForm(object1, object2, object3, object4) {
    return request({
        url: '/msg/modifiy',
        method: 'post',
        data: {
            object1: object1,
            object2: object2,
            object3: object3,
            object4: object4,
        }
    })
}