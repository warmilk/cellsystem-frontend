<template>
  <section>
    <!-- <button @click="dialogVisible = true">点我上传图片</button>
    <upload-slice-img
      :dialogVisible="dialogVisible"
      @uploadImg="uploadImg"
      @close="closeDialog"
    ></upload-slice-img> -->
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <el-form-item label="名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
    </el-form>
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