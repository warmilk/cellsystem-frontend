<template>
  <section class="demo">
    <el-form
      :label-position="labelPosition"
      label-width="120px"
      :model="formLabelAlign"
    >
      <el-form-item label="细胞核图片">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="识别范围">
        <el-slider v-model="value9" range show-stops :max="10"> </el-slider>
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
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      value9: [4, 8]
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

<style lang="less">
.demo {
  width: 50%;
  padding: 30px;
}
</style>