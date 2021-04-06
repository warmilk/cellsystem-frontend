<template>
  <el-container>
    <el-header>
      <logo dark />
      <el-menu
        :default-active="tabInfo.currTab"
        mode="horizontal"
        background-color="#303133"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <el-menu-item index="patient">总览</el-menu-item>
        <!-- <el-submenu index="2">
          <template slot="title">设置</template>
          <el-menu-item index="2-1">细胞</el-menu-item>
          <el-menu-item index="2-2">部门</el-menu-item>
          <el-menu-item index="2-3">部位</el-menu-item>
          <el-menu-item index="2-4">其他</el-menu-item>
        </el-submenu> -->
      </el-menu>
      <el-dropdown @command="handleCommand">
        <span>{{ userGroup }} : {{ userInfo.name }}</span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="profile">个人信息</el-dropdown-item> -->
          <!-- <el-dropdown-item command="modify">修改密码</el-dropdown-item> -->
          <el-dropdown-item command="exit">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <el-tabs type="card" v-model="tabInfo.currTab" @tab-remove="handleRemove">
        <el-tab-pane
          v-for="item in tabInfo.tabs"
          :key="item.name"
          :label="item.label"
          :name="item.name"
          :closable="item.closable"
        >
          <component :is="item.component" v-bind="item.params" />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import logo from '@/components/logo.vue'
import Patient from '@/views/patient/patient'
import Detail from '@/views/patient/detail'
import Cell from '@/views/setting/cell'
import Report from '@/views/report'
import { mapMutations, mapState } from 'vuex'
import { queryCell } from '@/service/cell'
import { queryDepartment } from '@/service/department'
import { queryModel } from '@/service/model'
import { queryRegion } from '@/service/region'

export default {
  async created() {
    const cells = await queryCell()
    const departments = await queryDepartment()
    const models = await queryModel()
    const regions = await queryRegion()
    this.SAVE_CELL(cells.data)
    this.SAVE_MODEL(models.data)
    this.SAVE_DEPARTMENT(departments.data)
    this.SAVE_REGION(regions.data)
  },
  computed: {
    ...mapState(['userInfo', 'tabInfo']),
    userGroup() {
      return ['未审核', '未通过', '医生', '管理员'][this.userInfo.groupId]
    }
  },
  methods: {
    ...mapMutations([
      'REMOVE_TAB',
      'CLEAN_ALL',
      'SAVE_CELL',
      'SAVE_MODEL',
      'SAVE_DEPARTMENT',
      'SAVE_REGION'
    ]),
    handleRemove(name) {
      this.REMOVE_TAB(name)
    },
    handleCommand(command) {
      if (command === 'profile') {
      } else if (command === 'modify') {
      } else if (command === 'exit') {
        this.CLEAN_ALL()
        this.$router.push('/')
      }
    }
  },
  components: { logo, Patient, Detail, Cell, Report }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-main {
  padding: 0rem;
  height: 100%;
  .el-tabs {
    height: 100%;
    /deep/ .el-tabs__header {
      margin-bottom: 0rem;
    }

    /deep/ .el-tabs__content {
      height: calc(100% - 41px);
    }
  }
  .el-tab-pane {
    height: 100%;
  }
}
.el-header {
  background-color: #303133;

  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-dropdown span {
    color: #fff;
    cursor: pointer;
  }
}
</style>
