<template>
  <div class="cell-container">
    <div class="tool-box">
      <el-button
        v-if="!isEdit"
        icon="el-icon-edit"
        circle
        @click="handleEdit"
      ></el-button>
      <el-button
        v-if="isEdit"
        icon="el-icon-check"
        circle
        @click="handleEdit"
      ></el-button>
      <el-button icon="el-icon-plus" circle @click="handleAdd"></el-button>
      <el-button icon="el-icon-delete" circle @click="handleDelete"></el-button>
    </div>
    <el-table
      @selection-change="handleSelectChange"
      :data="cellData"
      height="fill"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="名称" width="200" prop="name">
        <template slot-scope="scope">
          <el-input
            v-if="isEdit && scope.row.select"
            v-model="scope.row.name"
          />
          <div v-if="!isEdit || !scope.row.select">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="颜色" width="200" prop="color">
        <template slot-scope="scope">
          <el-color-picker
            v-model="scope.row.color"
            color-format="hex"
            show-alpha
            :disabled="!isEdit || !scope.row.select"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      cellData: [],
      isEdit: false
    }
  },
  computed: {
    ...mapState(['cells'])
  },
  mounted() {
    this.cellData = JSON.parse(JSON.stringify(this.cells))
    for (let i = 0; i < this.cellData.length; i++) {
      this.cellData[i].select = false
    }
  },
  methods: {
    handleAdd() {
      console.log(this.cells, this.cellData)
    },
    handleEdit() {
      this.isEdit = !this.isEdit
    },
    handleDelete() {},
    handleSelectChange(selection) {
      console.log('selectChange', selection)
      for (let i = 0; i < this.cellData.length; i++) {
        this.cellData[i].select = false
      }
      for (let i = 0; i < selection.length; i++) {
        selection[i].select = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cell-container {
  height: 100%;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
}
.tool-box {
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  padding: 0.5rem;
  box-sizing: border-box;
}
.el-table {
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  height: 100%;
}
</style>
