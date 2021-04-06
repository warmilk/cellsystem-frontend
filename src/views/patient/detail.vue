<template>
  <div class="detail-container">
    <div class="preview-box">
      <el-divider content-position="left">切片列表</el-divider>
      <div class="outter-box">
        <div class="inner-box">
          <img
            v-for="(item, index) in currSlice"
            :src="item + '.jpg'"
            :key="item"
            :class="index == currSelect ? 'active' : ''"
            @click="handleSelectSlice(index)"
          />
        </div>
      </div>
    </div>
    <div class="slice-box">
      <slice-canvas
        :sliceSrc="currSlice[currSelect]"
        :sliceJson="currCellJson[currSelect]"
      />
    </div>
    <div class="cell-box">
      <el-table :data="currCell" size="mini" height="fill">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="数量" prop="num" />
        <el-table-column label="颜色" prop="color">
          <template slot-scope="scope">
            <div :style="'background-color:' + scope.row.color">·</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { queryJson, modifyCellLabel } from '@/service/cell'
import { mapState } from 'vuex'
import { staticsCell } from '@/utils/util'
import { BASE_SLICE_URL } from '@/utils/config'

import SliceCanvas from '@/components/sliceCanvas.vue'
import Anchor from '@/utils/anchor'

export default {
  data() {
    return {
      currSelect: 0,
      currCellJson: []
    }
  },
  props: {
    sliceId: String,
    sliceNum: Number
  },
  computed: {
    ...mapState(['cells']),
    currSlice() {
      const slices = []
      for (let i = 0; i < this.sliceNum; i++) {
        slices.push(BASE_SLICE_URL + this.sliceId + '/' + i)
      }
      return slices
    },
    currCell() {
      if (this.currCellJson.length !== this.sliceNum) return []
      return staticsCell(this.cells, this.currCellJson[this.currSelect])
    }
  },
  created() {
    this.getCurrCellJson()
    this.handleSelectSlice(0)
  },
  methods: {
    handleSelectSlice(index) {
      this.currSelect = index
    },
    async getCurrCellJson() {
      this.currCellJson = []
      for (let i = 0; i < this.sliceNum; i++) {
        const res = await queryJson(this.sliceId, i)
        this.currCellJson.push(res)
      }
    },
    async handleModifyCellLabel(cellIdx, newLabel) {
      this.currCellJson[this.currSelect].shapes[cellIdx].label = newLabel
      const res = await modifyCellLabel(
        this.sliceId,
        this.currSelect,
        this.currCellJson[this.currSelect]
      )
      if (res === null) return
      this.getCurrCellJson()
      Anchor.$emit('handleRefreshSelectPatient', this.sliceId)
      this.$msg.success(res.message)
    }
  },
  components: {
    SliceCanvas
  }
}
</script>

<style lang="less" scoped>
.detail-container {
  height: 100%;
  width: 100%;

  display: flex;
  padding: 0.5rem;
  box-sizing: border-box;
}
.preview-box {
  width: 10%;
  height: 100%;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  display: flex;
  flex-direction: column;

  .outter-box {
    height: 100%;
    position: relative;

    .inner-box {
      position: absolute;
      top: 0rem;
      bottom: 0rem;
      left: 0rem;
      right: 0rem;

      overflow: auto;

      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 90%;
        margin: 0.25rem 0rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        border: 2px #fff solid;
        box-sizing: border-box;
      }
      img.active {
        border: 2px #409eff solid;
      }
    }
  }
}
.slice-box {
  width: 65%;
  margin: 0 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  // display: flex;
  // justify-content: center;

  overflow: auto;

  // img {
  //   border: 1px red solid;
  //   box-sizing: border-box;
  // }
}
.cell-box {
  width: 25%;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .el-table {
    height: 100%;
  }
}
</style>
