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
          content="这个设置非常重要，有两个原因:首先，模块使用它来计算某些自动设置，以便正确地识别感兴趣的对象。\n第二，当与直径范围外的对象一起使用,通过下面的设置，您可以选择删除这里提供的尺寸范围之外的对象。"
          placement="top-start"
          :offset="-300"
        >
          <el-form-item label="选择细胞核直径范围（单位：像素）">
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
        <el-form-item label="是否丢弃范围之外的物体">
          <el-tooltip
            :content="'选择“是”，以像素单位(最小，最大)设置丢弃在典型对象直径范围之外的对象，以排除小物体(如灰尘、噪音和碎片)或大物体。选择“No”以忽略该标准。'"
            placement="top"
          >
            <el-switch v-model="object1.excludeSize"> </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="是否丢弃图像边界的细胞核">
          <el-tooltip
            :content="'选择“是”放弃触摸图像边界的对象。选择“No”忽略这个标准。当您不想对不完全在视场内的对象进行下游测量时，删除接触图像边框的对象是有用的。例如，测量一个局部物体的面积是不准确的。'"
            placement="top"
          >
            <el-switch v-model="object1.excludeBorderObjects"> </el-switch>
          </el-tooltip>
        </el-form-item>
        <!-- 输入一 end -->
        <!-- 输入二 start -->
        <el-form-item class="upload-item" label="细胞体图片">
          <my-upload @onUpload="handleUpload2"></my-upload>
        </el-form-item>
        <el-form-item label="Threshold smoothing scale">
          <el-tooltip
            :content="'此设置控制在应用阈值之前用于平滑输入图像的比例。输入图像可以选择性地平滑之前的阈值。平滑可以通过去除图像中由噪声引起的孔洞和锯齿状边缘来提高得到的目标的均匀性。'"
            placement="top"
            effect="light"
          >
            <el-slider
              v-model="object2.threshold_smoothing_scale"
              :format-tooltip="formatTooltip"
            ></el-slider>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Threshold correction factor">
          <el-tooltip
            :content="'通过此设置，您可以根据上述方法计算出的阈值进行调整。这里输入的值通过将其乘以这个值来向上或向下调整阈值。取值为1表示不进行调整，0到1表示阈值比较宽松，>到1表示阈值比较严格。'"
            placement="top"
            effect="light"
          >
            <el-slider
              v-model="object2.threshold_correction_factor"
              :format-tooltip="formatTooltip"
            ></el-slider>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="阈值的上下限">
          <el-tooltip
            :content="'输入允许的最小和最大阈值，取值范围为0到1。这是一项有益的安全预防措施:当自动计算的阈值明显超出合理范围时，允许的最小/最大阈值将覆盖自动阈值。'"
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
        <el-form-item label="正则化因子">
          <el-tooltip
            :content="'正则化因子λ可以在0到无穷范围内的任何地方。该方法考虑了两个因素在哪里绘制两个接触次要物体的分界线:距离最近的主要物体的距离和次要物体图像的强度。正规化因素控制着这两个因素之间的平衡:①λ值为0表示忽略到最近主目标的距离，完全根据两个竞争主目标之间的强度梯度来做出决策。②λ值越大，两个物体之间的距离的权重就越大。这种关系是这样的λ的微小变化将有相当不同的结果(例如，0.01 vs 0.001)。然而，在远远大于1的λ处，强度图像几乎完全被忽略。③在无穷远处，结果看起来像距离- B，被次级染色图像掩盖了。'"
            placement="top"
          >
            <el-slider
              v-model="object2.regularization_factor"
              :format-tooltip="formatTooltip"
            ></el-slider>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="是否填充物体？">
          <el-tooltip :content="'选择Yes以填充物体内部的任何洞。请注意，如果一个对象位于一个洞中，并且该选项被启用，那么当洞被填充时，该对象将丢失。'" placement="top">
            <el-switch v-model="object2.fill_holes"> </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="是否丢弃接触图像边界的细胞体">
           <el-tooltip :content="'选择“是”将丢弃接触图像边界的次要对象。选择“否”以保留对象，无论它们是否接触图像边缘。'" placement="top">
          <el-switch v-model="object2.wants_discard_edge"> </el-switch>
          </el-tooltip>
        </el-form-item>
        <!-- 输入二 end -->
        <!-- 输入三 start -->
        <el-form-item label="是否计算zernikes形状特征">
           <el-tooltip :content="'选择Yes计算Zernike形状特征。因为前10个zernikes多项式(从0阶到9阶)是计算出来的，所以如果图像中包含大量的对象，这个操作会很耗时。如果您正在使用此模块测量3D对象，请选择No。'" placement="top">
          <el-switch v-model="object3.calculate_zernikes"> </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="是否选择高级计算">
           <el-tooltip :content="'选择Yes来计算图像中物体力矩和intertia张量的额外统计。这些特性不需要太多额外的计算时间，但是会向结果输出文件添加许多额外的列。'" placement="top">
          <el-switch v-model="object3.calculate_advanced"> </el-switch>
          </el-tooltip>
        </el-form-item>
        <!-- 输入三 end -->
        <!--输入四 start-->

        <el-form-item label="输出文件名">
          <el-input
            v-model="object4.output_image_name"
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
        <el-tag>细胞核识别结果</el-tag>
        <el-table :data="table1" border style="width: 100%">
          <el-table-column prop="Feature_nucleus" label="特征" width="204">
          </el-table-column>
          <el-table-column prop="value_nucleus" label="值" width="204">
          </el-table-column>
        </el-table>
        <el-tag>细胞形态信息</el-tag>
        <el-table :data="table2" border style="width: 100%">
          <el-table-column prop="Object" label="对象" width="80">
          </el-table-column>
          <el-table-column prop="Feature" label="特征" width="80">
          </el-table-column>
          <el-table-column prop="Mean" label="平均值" width="80">
          </el-table-column>
          <el-table-column prop="Media" label="中值" width="80">
          </el-table-column>
          <el-table-column prop="STD" label="标准差" width="80">
          </el-table-column>
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
        output_image_name: 'OrigOverlay',
        save_pathname: ''
      },
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      table1: [
        {
          Feature_nucleus: '',
          value_nucleus: ''
        }
      ],
      table2: [
        {
          Object: '',
          Feature: '',
          Mean: '',
          Media: '',
          STD: ''
        }
      ]
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
        //this.resImg = res.data.jin
        let restable = res.data.data
        console.log(restable)
        Message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        })
      }
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