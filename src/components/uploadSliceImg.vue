<template>
  <div>
    <el-dialog
      class="avatar-uploader quying-dialog"
      title="修改图片"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :close-on-click-modal="true"
      ref="editAvatar"
    >
      <!-- 真正的图片选择器input -->
      <input
        type="file"
        v-show="false"
        ref="fileinput"
        accept="image/jpg, image/jpeg, image/png, image/tif,
  image/tiff"
        multiple
        @change.prevent="handleChange"
      />
      <!-- 真正的图片选择器input -->

      <div class="avatar-uploader-wrap">
        <!-- step1 -->
        <div
          class="avatar-uploader__choose avatar-uploader_left"
          v-show="!isFinishStep1"
        >
          <button class="avatar-uploader_left__btn" @click="handleClick">
            +选择图片
          </button>
          <p>只支持 JPG, JPEG, TIF 大小不超过5M</p>
        </div>
        <!-- step2 -->
        <div class="avatar-uploader__edit" v-show="isFinishStep1">
          <div class="avatar-uploader_left avatar-uploader__edit-area">
            <vueCropper
              ref="cropper"
              :img="cropper.img"
              :info="false"
              :autoCrop="cropper.autoCrop"
              :autoCropWidth="cropper.autoCropWidth"
              :autoCropHeight="cropper.autoCropHeight"
              :fixedBox="cropper.fixedBox"
              @realTime="realTime"
              :outputType="cropper.outputType"
              :fixed="cropper.fixed"
              :fixedNumber="cropper.fixedNumber"
            ></vueCropper>
          </div>
          <button class="avatar-uploader_left__btn" @click="handleClick">
            +重新选择
          </button>
          <button
            class="avatar-uploader_left__btn"
            @click.prevent="rotateRight"
          >
            +旋转90°
          </button>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="summitImg()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vueCropper from 'vue-cropper'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cropper: {
        img: '',
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: false,
        fixed: false,
        outputType: 'jpg'
      },
      isFinishStep1: false,
      cropImgBlob: null,
      previewsImgObj: {}
    }
  },
  components: {
    vueCropper
  },
  methods: {
    // 点击按钮打开文件资源窗口
    handleClick(e) {
      if (e.target !== this.$refs.fileinput) {
        if (document.activeElement !== this.$refs) {
          this.$refs.fileinput.click()
        }
      }
    },
    // 检测选择的文件是否合适
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
    // 设置图片源
    setSourceImg(file) {
      let that = this
      let fr = new FileReader()
      fr.readAsDataURL(file)
      // fr.readAsArrayBuffer(file)
      fr.onload = function (e) {
        that.cropper.img = fr.result
      }
    },
    // 触发input框的change事件选择图片
    // event
    handleChange(e) {
      console.log(e)
      let files = e.target.files || e.dataTransfer.files
      this.$refs.cropper.rotate = 0 //重置要裁剪的图片的旋转角度
      this.isFinishStep1 = true
      if (this.checkFile(files[0])) {
        this.setSourceImg(files[0])
      }
    },
    // 点击向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    // 点击关闭弹窗
    handleClose() {
      this.$emit('close')
      this.cropper.img = ''
    },
    // 实时预览
    realTime(data) {
      this.previewsImgObj = data
    },
    //点击确定上传裁剪完的图片图片（blob类型）
    summitImg() {
      this.$refs.cropper.getCropBlob((blobData) => {
        this.$emit('uploadImg', blobData)
        this.handleClose()
      })
    }
  },
  watch: {
    // 实时预览
    previewsImgObj: function () {
      this.$refs.cropper.getCropData((data) => {
        this.previewsImgObj.url = data
      })
    }
  },
  activated() {
    this.isFinishStep1 = false
  }
}
</script>

<style lang="less" scoped>
@area-height: 100%;
.avatar-uploader {
  &-wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
  &_left {
    height: @area-height;
    width: @area-height;
    font-size: 13px;
    color: #999999;
    position: relative;
    background: #ecf2f6;
    &__btn {
      color: #999999;
      width: 88px;
      height: 34px;
      border: none;
      background: #fff;
      outline: none;
      border: 1px solid #cecece;
      border-radius: 82px;
    }
  }
  &__choose {
    p {
      margin-top: 59%;
      width: 100%;
      text-align: center;
    }
    button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &__edit {
    &-area {
      overflow: hidden;
      &-img {
        object-fit: cover;
      }
    }
    button {
      margin-top: 13px;
    }
    button:last-child {
      float: right;
    }
  }
}
</style>

<style lang="less">
// 小的弹窗用el-messagebox，大弹窗有复杂交互的用el-dialog
// 弹窗（el-dialog）样式修改
.quying-dialog {
  .el-dialog__body {
    padding: 5px 20px;
    overflow: hidden;
  }
  .el-dialog__headerbtn .el-dialog__close {
    font-size: 20px;
  }
  .el-dialog__footer {
    text-align: center;
    padding: 20px 20px 30px 20px;
  }
}
</style>
