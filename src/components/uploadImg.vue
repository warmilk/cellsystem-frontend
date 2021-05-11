<template>
  <div class="upload">
    <input
      class="input"
      type="file"
      ref="fileinput"
      accept=".jpg, .jpeg, .png, .tif, .tiff"
      multiple
      @change.prevent="handleChange"
    />
    <section class="section" v-if="!isFinishStep1">
      <div><i class="el-icon-upload"></i></div>
      <div class="el-upload__text">点击上传</div>
    </section>
    <section class="section" v-if="isFinishStep1">
      <img :src="imgUrl" alt="" />
    </section>
  </div>
</template>

<script>
import { uploadSliceImg } from '@/service/uploadImg.js'
export default {
  data() {
    return {
      isFinishStep1: false,
      imgUrl: ''
    }
  },
  methods: {
    checkFile(file) {
      // 仅限图片
      if (file.type.indexOf('image') === -1) {
        this.$message({
          message: '请选择合适的文件类型',
          type: 'warning'
        })
        return false
      }
      // 超出大小
      if (file.size / 1024 > 5120) {
        this.$message({
          message: '图片大小超出5MB，请重新选择',
          type: 'warning'
        })
        return false
      } else {
        // console.log((file.size / 1024).toFixed(1) + 'KB')
      }
      return true
    },
    async handleChange(e) {
      let files = e.target.files || e.dataTransfer.files
      if (this.checkFile(files[0])) {
        const res = await uploadSliceImg(files[0])
        if (res.code == 200) {
          this.isFinishStep1 = true
          this.imgUrl = res.data.imgUrl
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.upload {
  width: 360px;
  height: 180px;
  position: relative;
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  overflow: hidden;
  &:hover {
    border: 1px dashed #409eff;
  }
  i {
    font-size: 67px;
    color: #c0c4cc;
    line-height: 50px;
  }
  .el-upload__text {
    color: #606266;
  }
}
.section {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
}
.input {
  cursor: pointer;
  width: 100%;
  height: 100%;
  background: red;
  position: absolute;
  z-index: 3;
//   opacity: 0; //透明度为0，图层在最上面
}
</style>
