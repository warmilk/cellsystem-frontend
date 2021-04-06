<template>
  <div class="slice-canvas">
    <img :src="sliceSrc + '.jpg'" />
    <canvas ref="canvasRef" @click="handleClick" />
    <el-dialog title="修改标签" :visible.sync="dialogVisible" width="30%">
      <span>
        <el-form>
          <el-form-item>
            <el-select v-model="nowLabel">
              <el-option
                v-for="item in cells"
                :label="item.name"
                :value="item.label"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyCellLabel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { findCell } from '@/utils/util'
export default {
  props: {
    sliceSrc: String,
    sliceJson: Object
  },
  data() {
    return {
      dialogVisible: false,
      cellIdx: -1,
      nowLabel: ''
    }
  },
  computed: {
    ...mapState(['cells']),
    cellColor() {
      const colors = {}
      for (let i = 0; i < this.cells.length; i++) {
        colors[this.cells[i].label] = this.cells[i].color
      }
      return colors
    }
  },
  methods: {
    handleClick(event) {
      this.cellIdx = findCell(
        this.sliceJson.shapes,
        event.offsetX,
        event.offsetY
      )
      if (this.cellIdx < 0) return
      this.nowLabel = this.sliceJson.shapes[this.cellIdx].label
      this.dialogVisible = true
    },
    modifyCellLabel() {
      this.$parent.handleModifyCellLabel(this.cellIdx, this.nowLabel)
      this.dialogVisible = false
    }
  },
  watch: {
    sliceJson: {
      handler(newVal) {
        if (!newVal) return
        const cvs = this.$refs.canvasRef
        cvs.height = newVal.imageHeight
        cvs.width = newVal.imageWidth
        const ctx = cvs.getContext('2d')
        const shapes = this.sliceJson.shapes
        for (let i = 0; i < shapes.length; i++) {
          const points = shapes[i].points
          ctx.fillStyle = this.cellColor[shapes[i].label]
          ctx.beginPath()
          ctx.moveTo(points[0][0], points[0][1])
          for (let j = 0; j < points.length; j++) {
            ctx.lineTo(points[j][0], points[j][1])
          }
          ctx.fill()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.slice-canvas {
  position: relative;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
