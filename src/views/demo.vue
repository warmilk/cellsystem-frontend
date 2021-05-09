<template>
  <section>
    <button @click="dialogVisible = true">点我上传图片</button>
    <upload-slice-img
      :dialogVisible="dialogVisible"
      @uploadImg="uploadImg"
      @close="closeDialog"
    ></upload-slice-img>
    <el-tag>{{tag1}}</el-tag><el-input v-model="p" placeholder="请输入内容"></el-input>
    <el-input v-model="p1" placeholder="请输入内容"></el-input>
    <el-input v-model="p2" placeholder="请输入内容"></el-input>
    <el-input v-model="p3" placeholder="请输入内容"></el-input>
    <el-tag>{{tag1}}</el-tag>
    <el-button type="primary" round @click="submit">提交</el-button>
    <img :src="image_path" />
  </section>
</template>

<script>
import UploadSliceImg from '../components/uploadSliceImg.vue'
import { uploadSliceImg, uploadForm } from '@/service/uploadImg.js'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      dialogVisible: false,
      p: '1',
      p1: '2',
      p2: '3',
      p3: '4',
      image_path: "",
      tag1: '',
    }
  },
  components: {
    'upload-slice-img': UploadSliceImg
  },
  methods: {
    async submit() {
      let res = await uploadForm(this.p, this.p1, this.p2, this.p3)
      console.log(res.data)
      Message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    },
    async uploadImg(data) {
      let res = await uploadSliceImg(data)
      console.log(this);
      this.image_path = res.data.imgUrl
      this.tag1=res.data.imgUrl
    },
    closeDialog() {
      this.dialogVisible = false
    }
  }
}
</script>