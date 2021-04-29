<template>
  <section>
    <button @click="dialogVisible = true">点我上传图片</button>
    <upload-slice-img
      :dialogVisible="dialogVisible"
      @on-close="closeDialog"
    ></upload-slice-img>
  </section>
</template>

<script>
import UploadSliceImg from '../components/uploadSliceImg.vue'
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
    closeDialog() {
      this.dialogVisible = false
    }
  }
}
</script>