<template>
  <section class="demo">
    <!-- <el-tag>{{ tag1 }}</el-tag>
    <el-input v-model="p" placeholder="请输入内容"></el-input>
    <el-input v-model="p1" placeholder="请输入内容"></el-input>
    <el-input v-model="p2" placeholder="请输入内容"></el-input>
    <el-input v-model="p3" placeholder="请输入内容"></el-input>
    <el-tag>{{ tag1 }}</el-tag>
    
    <img :src="image_path" /> -->
    <!-- 左侧提交区域 -->
    <section class="left">
      <el-form
        :label-position="labelPosition"
        label-width="400px"
        :model="formLabelAlign"
      >
        <!-- 输入一 start -->
        <el-form-item class="upload-item" label="细胞核图片">
          <my-upload @onUpload="handleUpload"></my-upload>
        </el-form-item>
        <el-tooltip
          class="item"
          effect="light"
          content="单位为像素顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶"
          placement="top-start"
          :offset="-300"
        >
          <el-form-item label="细胞核识别范围">
            <el-slider
              v-model="object1_range"
              @input="setObj1range"
              range
              :max="200"
              :step="0.1"
            >
            </el-slider>
          </el-form-item>
        </el-tooltip>
        <el-form-item label="是否丢弃直径范围之外的细胞核">
          <el-tooltip :content="'丢弃了会怎样'" placement="top">
            <el-switch v-model="object1.excludeSize"> </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="是否丢弃在图像边界的细胞核">
          <el-switch v-model="object1.excludeBorderObjects"> </el-switch>
        </el-form-item>
        <!-- 输入一 end -->
        <!-- 输入二 start -->
        <el-form-item class="upload-item" label="细胞体图片">
          <my-upload @onUpload="handleUpload2"></my-upload>
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
              @input="setObj2range"
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
          <el-input
            v-model="object4.output_pathname"
            placeholder="OverLay"
          ></el-input>
        </el-form-item>
        <el-form-item label="保存文件路径">
          <el-input v-model="object4.save_pathname" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" round @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </section>
    <!-- 右侧结果展示 -->
    <section class="right">
      <div class="img">
        <img :src="resImg" alt="" />
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="Object" label="对象" width="100">
          </el-table-column>
          <el-table-column prop="Feature" label="特征" width="100">
          </el-table-column>
          <el-table-column prop="Mean" label="平均值" width="100">
          </el-table-column>
          <el-table-column prop="Media" label="中值" width="100">
          </el-table-column>
          <el-table-column prop="STD" label="标准差"> </el-table-column>
        </el-table>
      </div>
    </section>
  </section>
</template>

<script>
import { uploadSliceImg, uploadForm } from '@/service/uploadImg.js'
import uploadImg from '@/components/uploadImg.vue'
import { Message } from 'element-ui'
export default {
  components: {
    'my-upload': uploadImg
  },
  data() {
    return {
      resImg: require('@/assets/result.png'),
      object1: {
        inputImgName: '细胞核',
        Min: 10.0,
        Max: 40.0,
        excludeSize: true,
        excludeBorderObjects: true,
        imgUrl: ''
      },
      object1_range: [10, 40], //object1的 Min Max
      object2: {
        inputImgName: '细胞质',
        threshold_scope: 'Global',
        threshold_smoothing_scale: 0.0,
        threshold_correction_factor: 1.0,
        Min: 0,
        Max: 1,
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
        output_pathname: '',
        save_pathname: ''
      },
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      tableData: [{
          Object: '细胞核',
          Feature: 'Area',
          Mean: '28.06',
          Media:'22.612',
          STD:"11.851"
        }, ]
    }
  },
  methods: {
    setObj1range(data) {
      this.object1.Min = data[0]
      this.object1.Max = data[1]
    },
    setObj2range(data) {
      this.object2.Min = data[0]
      this.object2.Max = data[1]
    },
    formatTooltip(val) {
      return Number(val) / 100
    },
    handleUpload(imgUrl) {
      console.log(imgUrl)
      this.object1.imgUrl = imgUrl
    },
    handleUpload2(imgUrl) {
      console.log(imgUrl)
      this.object2.imgUrl = imgUrl
    },
    closeDialog() {
      this.dialogVisible = false
    },
    async submit() {
      let res = await uploadForm(
        this.object1,
        this.object2,
        this.object3,
        this.object4
      )
      if (res.code == 200) {
        //正常respone的回调处理
        this.resImg = res.data.jin
        this.tableData = res.data.list;
        Message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        })
      }
    },
    formatTooltip(val) {
      return Number(val) / 100
    }
  }
}
</script>

<style lang="less" scope>
.demo {
  padding: 30px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.left {
  width: calc(360px + 400px);
  padding-right: 30px;
}
.right {
  background: rgba(0, 255, 76, 0.096);
  flex: 1;
  display: flex;
  justify-content: center;
  .img {
    width: 80%;
    &img {
      width: 100%;
    }
  }
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