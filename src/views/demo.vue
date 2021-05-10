<template>
  <section class="demo">
    <el-form
      :label-position="labelPosition"
      label-width="500px"
      :model="formLabelAlign"
    >
      <!-- 输入一 start -->
      <el-form-item class="upload-item" label="细胞核图片">
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
      <el-tooltip
        class="item"
        effect="light"
        content="单位为像素顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶"
        placement="top-start"
        :offset="-300"
      >
        <el-form-item label="细胞核识别范围">
          <el-slider v-model="object1_range" range :max="100"> </el-slider>
        </el-form-item>
      </el-tooltip>
      <el-form-item label="是否丢弃直径范围之外的细胞核">
        <el-tooltip :content="'丢弃了会怎样'" placement="top">
          <el-switch
            v-model="object1.exclude_size"
            active-value="是"
            inactive-value="否"
          >
          </el-switch>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="是否丢弃在图像边界的细胞核">
        <el-switch v-model="object1.exclude_border_objects"> </el-switch>
      </el-form-item>
      <!-- 输入一 end -->
      <!-- 输入二 start -->
      <el-form-item class="upload-item" label="细胞体图片">
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
      <el-form-item label="细胞体的 threshold_smoothing_scale">
        <el-tooltip
          :content="'细胞体的 threshold_smoothing_scale'"
          placement="top"
          effect="light"
        >
          <el-slider
            v-model="object2.threshold_smoothing_scale"
            :format-tooltip="formatTooltip"
          ></el-slider>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="细胞体的 threshold_correction_factor">
        <el-tooltip
          :content="'细胞体的 threshold_correction_factor'"
          placement="top"
          effect="light"
        >
          <el-slider
            v-model="object2.threshold_correction_factor"
            :format-tooltip="formatTooltip"
          ></el-slider>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="细胞体的 min max">
        <el-tooltip
          :content="'细胞体的 min max'"
          placement="top"
          effect="light"
        >
          <el-slider
            v-model="object2_range"
            range
            :step="0.01"
            :max="1"
          ></el-slider>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="细胞体的 regularization_factor">
        <el-tooltip
          :content="'细胞体的 regularization_factor'"
          placement="top"
          effect="light"
        >
          <el-slider
            v-model="object2.regularization_factor"
            :format-tooltip="formatTooltip"
          ></el-slider>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="细胞体的 fill_holes">
        <el-tooltip :content="'细胞体的 fill_holes'" placement="top">
          <el-switch
            v-model="object2.fill_holes"
            active-value="是"
            inactive-value="否"
          >
          </el-switch>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="细胞体的 wants_discard_edge">
        <el-switch v-model="object2.wants_discard_edge"> </el-switch>
      </el-form-item>
      <!-- 输入二 end -->
    </el-form>
  </section>
</template>

<script>
import { uploadSliceImg } from '@/service/uploadImg.js'
export default {
  data() {
    return {
      object1: {
        input_img_name: '',
        Min: 10,
        Max: 40,
        exclude_size: true,
        exclude_border_objects: true
      },
      object1_range: [10, 40], //object1的 Min Max
      object2: {
        threshold_scope: 'Global',
        threshold_smoothing_scale: 0.0,
        threshold_correction_factor: 1.0,
        Min: 0.0,
        Max: 1.0,
        regularization_factor: 0.05,
        fill_holes: true,
        wants_discard_edge: false
      },
      object2_range: [0, 1], //object2的 Min Max
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  },
  methods: {
    formatTooltip(val) {
      return Number(val) / 100
    },
    async uploadImg(data) {
      await uploadSliceImg(data)
    },
    closeDialog() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scope>
.demo {
  // width: 50%;
  width: calc(360px + 500px);
  padding: 30px;
}
</style>


<style lang="less">
.demo .upload-item .el-form-item__label {
  line-height: 180px;
}
.demo .el-form-item__label {
  padding: 0 30px 0 0;
}
</style>