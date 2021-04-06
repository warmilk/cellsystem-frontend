<template>
  <div class="report-container">
    <!-- <el-button @click="handlePrint">打印</el-button> -->
    <div class="outter" ref="reportRegionRef">
      <div v-if="patient" class="report-box">
        <div class="title-box">报告单</div>
        <el-divider />
        <div class="info-box">
          <div class="row-box">
            <span class="item-box small"
              >姓名：<span class="content">{{ patient.name }}</span></span
            >
            <span class="item-box small"
              >性别：<span class="content">{{
                ['男', '女'][patient.gender]
              }}</span></span
            >
            <span class="item-box small"
              >年龄：<span class="content">{{
                new Date(patient.createTime).getYear() -
                new Date(patient.birthday).getYear()
              }}</span></span
            >
            <span class="item-box large"
              >住院号：<span class="content">{{
                patient.patientId
              }}</span></span
            >
            <span class="item-box large"
              >切片号：<span class="content">{{ patient.sliceId }}</span></span
            >
          </div>
          <div class="row-box">
            <span class="item-box large"
              >科室：<span class="content">{{ patient.department }}</span></span
            >
            <span class="item-box small"
              >床号：<span class="content">{{ patient.bedId }}</span></span
            >
            <span class="item-box large"
              >送检医生：<span class="content">{{
                patient.checkUser
              }}</span></span
            >
            <span class="item-box large"
              >送检日期：<span class="content">{{
                patient.checkTime.substring(0, 10)
              }}</span></span
            >
          </div>
          <div class="row-box">
            <span class="item-box large"
              >取材部位：<span class="content">{{ patient.region }}</span></span
            >
          </div>
        </div>
        <el-divider />
        <div class="check-box">
          <div class="statics-box">
            <table>
              <tr>
                <td>细胞名称</td>
                <td>血片%</td>
                <td>髓片%</td>
                <td>参考值</td>
              </tr>
              <tr v-for="item in cellStatics" :key="item.id">
                <td>{{ item.name }}</td>
                <td></td>
                <td>{{ item.percent.toFixed(2) }}</td>
                <td>{{ item.reference }}</td>
              </tr>
            </table>
          </div>
          <div class="slice-box">
            <img
              v-for="(item, index) in slices"
              :src="item + '.jpg'"
              :key="index"
            />
          </div>
        </div>
        <el-divider />
        <div class="row-box">
          <span class="item-box large">报告医生：{{ userInfo.name }}</span>
          <span class="small"></span>
          <span class="item-box large">审核医生：</span>
          <span class="item-box large">审核日期：</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryReadablePatientById } from '@/service/patient'
import { queryJson } from '@/service/cell'
import { mapState } from 'vuex'
import { BASE_SLICE_URL } from '@/utils/config'
import { staticsCells } from '@/utils/util'

export default {
  props: {
    id: Number
  },
  data() {
    return {
      patient: null,
      cellJsons: [],
      cellStatics: []
    }
  },
  async created() {
    const res = await queryReadablePatientById(this.id)
    if (res === null) return
    this.patient = res.data
    this.cellJsons = []
    for (let i = 0; i < this.patient.sliceNum; i++) {
      const cellJson = await queryJson(this.patient.sliceId, i)
      this.cellJsons.push(cellJson)
    }
    this.cellStatics = staticsCells(this.cells, this.cellJsons)
    let total = 0
    for (let i = 0; i < this.cellStatics.length; i++) {
      total += this.cellStatics[i].num
    }
    for (let i = 0; i < this.cellStatics.length; i++) {
      this.cellStatics[i].percent = this.cellStatics[i].num / total
    }
  },
  computed: {
    ...mapState(['userInfo', 'cells']),
    slices() {
      if (this.patient === null) return []
      const tmp = []
      for (let i = 0; i < this.patient.sliceNum; i++) {
        tmp.push(BASE_SLICE_URL + this.patient.sliceId + '/' + i)
      }
      return tmp
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.report-container {
  height: 100%;
  padding: 0.5rem;
  box-sizing: border-box;

  display: flex;
}
.outter {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;

  overflow: auto;
}
.report-box {
  width: 794px;
  height: 1196px;
  border: 1px solid #000;
  padding: 32px 48px;

  display: flex;
  flex-direction: column;

  .el-divider {
    margin: 12px 0;
    height: 1px;
    background-color: #333;
  }
  font-weight: 100;
  font-size: 14px;
  font-family: SimSun;
}
.title-box {
  font-family: LiSu;
  font-size: 32px;
  font-weight: 700;

  display: flex;
  justify-content: center;
}
.row-box {
  padding: 0 24px;
  display: flex;
  .item-box {
    padding: 4px;
    width: 20%;

    .content {
      color: #409eff;
    }
  }
  .large {
    width: 30%;
  }
  .small {
    width: 15%;
  }
  .middle {
    width: 20%;
  }
}
.check-box {
  padding: 0 24px;
  height: 100%;
  display: flex;
  .statics-box {
    width: 50%;
    table {
      width: 100%;
      border-top: 1px solid #333;
      border-left: 1px solid #333;
      border-spacing: 0;
    }
    table td {
      border-bottom: 1px solid #333;
      border-right: 1px solid #333;
    }
  }
  .slice-box {
    padding: 2px;
    box-sizing: border-box;
    width: 50%;
    img {
      width: 50%;
      padding: 2px;
      box-sizing: border-box;
    }
  }
}
</style>
