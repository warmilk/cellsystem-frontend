<template>
  <section class="demo">
    <el-tag>{{ tag1 }}</el-tag>
    <el-input v-model="p" placeholder="请输入内容"></el-input>
    <el-input v-model="p1" placeholder="请输入内容"></el-input>
    <el-input v-model="p2" placeholder="请输入内容"></el-input>
    <el-input v-model="p3" placeholder="请输入内容"></el-input>
    <el-tag>{{ tag1 }}</el-tag>
    
    <img :src="image_path" />

    <el-form
      :label-position="labelPosition"
      label-width="500px"
      :model="formLabelAlign"
    >
      <!-- 输入一 start -->
      <el-form-item class="upload-item" label="细胞核图片">
        <my-upload></my-upload>
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
          <el-input v-model="object1.range_min" placeholder="最小像素" ></el-input>
          <el-input v-model="object1.range_max" placeholder="最大像素" ></el-input>
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
            :step="0.001"
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
      <!-- 输入三 start -->
      <el-form-item label="calculate_zernikes">
        <el-switch v-model="object3.calculate_zernikes"> </el-switch>
      </el-form-item>
      <el-form-item label="calculate_advanced">
        <el-switch v-model="object3.calculate_advanced"> </el-switch>
      </el-form-item>
      <!-- 输入三 end -->
      <!--输入四 start-->

        <el-form-item label="输出文件名">
          <el-input v-model="object4.output_pathname" placeholder="OverLay"></el-input>
        </el-form-item>
        <el-form-item label="保存文件路径">
          <el-input v-model="object4.save_pathname" placeholder=""></el-input>
        </el-form-item>
         <el-form-item label="">
          <el-button type="primary" round @click="submit">提交</el-button>
        </el-form-item>
    </el-form>
    
  </section>
</template>

<script>


import { uploadSliceImg, uploadForm } from '@/service/uploadImg.js'
import { Message } from 'element-ui'
export default {
  components: {
    'my-upload': myUploadImgComponent
  },
  data() {
    return {
      object1: {
        input_img_name: '',
        Min: 10,
        Max: 40,
        exclude_size: true,
        exclude_border_objects: true,
        range_min:10,
        range_max:40,
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
      object3: {
        calculate_zernikes: true,
        calculate_advanced: false
      },
      object4: {
        output_pathname:'',
        save_pathname:'',
      },
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
    
    closeDialog() {
      this.dialogVisible = false
    },
    async submit() {
      this.object1.range_min=Number(this.object1.range_min)
      this.object1.range_max=Number(this.object1.range_max)
      let res = await uploadForm(this.object1, this.object2, this.object3, this.object4)
      console.log(res.data)
      Message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })},
    formatTooltip(val) {
      return Number(val) / 100
    },
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