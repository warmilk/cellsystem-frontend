<template>
  <section>
    <button @click="dialogVisible = true">点我上传图片</button>
    <upload-slice-img
      :dialogVisible="dialogVisible"
      @uploadImg="uploadImg"
      @close="closeDialog"
    ></upload-slice-img>
  </section>
</template>

<script>
import UploadSliceImg from '../components/uploadSliceImg.vue'
import { uploadSliceImg } from '@/service/uploadImg.js'
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  components: {
    'upload-slice-img': UploadSliceImg
  },
  methods: {
    async uploadImg(data) {
      await uploadSliceImg(data)
    },
    closeDialog() {
      this.dialogVisible = false
    }
  }
}
</script>