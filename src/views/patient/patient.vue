<template>
  <div class="patient-container">
    <span class="patient-box">
      <el-input
        v-model="patientTable.keyword"
        prefix-icon="el-icon-search"
        placeholder="住院号|姓名"
        @change="handleSearch"
      />
      <el-table
        ref="patientTableRef"
        :data="patients"
        size="mini"
        height="fill"
        @sort-change="handleSortPatient"
        @row-click="handleSelect"
        highlight-current-row
        id="patientTable"
      >
        <el-table-column
          sortable="custom"
          fixed
          label="住院号"
          width="120"
          prop="patientId"
        />
        <el-table-column sortable="custom" label="姓名" prop="name" />
        <el-table-column sortable="custom" label="性别" prop="gender">
          <template slot-scope="scope">
            {{ scope.row.gender === 0 ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column sortable="custom" label="年龄" prop="birthday">
          <template slot-scope="scope">
            {{
              new Date(scope.row.createTime).getYear() -
              new Date(scope.row.birthday).getYear()
            }}
          </template>
        </el-table-column>
        <el-table-column
          sortable="custom"
          label="切片状态"
          prop="sliceState"
          width="100"
        >
          <template slot-scope="scope">
            <div :class="'state' + scope.row.sliceState">
              {{
                ['未检查', '检查中', '已检查', '检查失败'][scope.row.sliceState]
              }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="patientTable.totalNum"
        :page-size="patientTable.pageSize"
        :current-page="patientTable.currPage"
        @current-change="handleChangePage"
      />
    </span>
    <span class="detail-box">
      <div class="tool-box">
        <el-button icon="el-icon-edit" size="mini" @click="handleSave"
          >存入</el-button
        >
        <el-button icon="el-icon-plus" size="mini" @click="handleAdd"
          >新增</el-button
        >
        <el-button icon="el-icon-caret-right" size="mini" @click="handleCheck"
          >检查</el-button
        >
        <el-button icon="el-icon-tickets" size="mini" @click="handleReport"
          >报告单</el-button
        >
      </div>
      <patient-detail
        ref="patientDetailRef"
        v-if="!needAdd"
        :patient="currPatient"
        :slice="currSlice"
      />
      <patient-form ref="patientFormRef" v-if="needAdd" />
    </span>
    <span class="cell-box">
      <el-table :data="currCell" size="mini" height="fill">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="数量" prop="num" />
      </el-table>
    </span>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import {
  queryPatient,
  queryPatientById,
  modifyPatient,
  insertPatient,
  checkPatient
} from '@/service/patient'
import { queryJson } from '@/service/cell'
import { staticsCells, stdOrderParam } from '@/utils/util'
import { BASE_SLICE_URL } from '@/utils/config'
import PatientDetail from '@/components/patientDetail.vue'
import PatientForm from '@/components/patientForm.vue'
import Anchor from '@/utils/anchor'

export default {
  data() {
    return {
      patients: [],
      patientTable: {
        currPage: 1,
        totalNum: 0,
        keyword: '',
        column: 'create_time',
        order: 'desc'
      },
      currPatient: null,
      currPatientId: -1,
      currCell: [],
      needAdd: false
    }
  },
  created() {
    this.patientTable.pageSize = this.pageSize
    this.getPatient()
  },
  computed: {
    ...mapState(['pageSize', 'cells', 'userInfo']),
    currSlice() {
      if (!this.currPatient) return []
      const slices = []
      for (let i = 0; i < this.currPatient.sliceNum; i++) {
        slices.push(BASE_SLICE_URL + this.currPatient.sliceId + '/' + i)
      }
      return slices
    }
  },
  mounted() {
    Anchor.$on('handleRefreshSelectPatient', (sliceId) => {
      if (this.currPatient === null) return
      if (this.currPatient.sliceId !== sliceId) return
      this.getCurrPatient()
    })
  },
  methods: {
    ...mapMutations(['ADD_TAB']),
    async getPatient() {
      const res = await queryPatient(this.patientTable)
      this.patientTable.totalNum = res.data.total
      this.patients = res.data.patients
    },
    async getCurrPatient() {
      this.currCellJson = []
      this.currCell = []
      if (this.currPatientId <= 0) {
        this.currPatient = null
        return
      }
      const res = await queryPatientById(this.currPatientId)
      if (res === null) return
      this.currPatient = res.data
      if (this.currPatient.sliceState !== 2) return
      for (let i = 0; i < this.currPatient.sliceNum; i++) {
        const res = await queryJson(this.currPatient.sliceId, i)
        this.currCellJson.push(res)
      }
      this.currCell = staticsCells(this.cells, this.currCellJson)
    },
    handleChangePage(page) {
      this.patientTable.currPage = page
      this.getPatient()
    },
    handleSortPatient(params) {
      const stdParam = stdOrderParam(params)
      this.patientTable.column = stdParam.prop
      this.patientTable.order = stdParam.order
      this.getPatient()
    },
    handleSearch() {
      this.getPatient()
    },
    async handleSelect(row) {
      this.currPatientId = row.id
      this.getCurrPatient()
      this.needAdd = false
    },
    async handleSave() {
      let patientForm = null
      let res = null
      if (this.needAdd) {
        patientForm = this.$refs.patientFormRef.getPatient()
        if (patientForm === null) return
        patientForm.createUid = this.userInfo.id
        const uploadSlice = this.$refs.patientFormRef.getSlice()
        res = await insertPatient(patientForm, uploadSlice)
        this.needAdd = false
      } else {
        patientForm = this.$refs.patientDetailRef.getPatient()
        if (patientForm === null) return
        res = await modifyPatient(patientForm)
      }
      if (res === null) return
      this.getPatient()
      this.$msg.success(res.message)
    },
    handleAdd() {
      this.needAdd = true
      this.$refs.patientTableRef.setCurrentRow()
      this.currPatientId = -1
      this.getCurrPatient()
    },
    async handleCheck() {
      /**if (this.currPatient === null) {
        this.$msg.error('请选择病患')
        return
      }**/
      const loading = this.$loading.service()
      this.currPatient.sliceId="1"
      this.currPatient.sliceNum="2"
      this.userInfo.id="3"
      const res = await checkPatient(this.currPatient.sliceId, this.currPatient.sliceNum, this.userInfo.id)
      loading.close()
      this.getPatient()
      this.getCurrPatient()
      if (res === null) return
      this.$msg.success(res.message)
    },
    handleReport() {
      if (this.currPatient === null) {
        this.$msg.error('请选择病患')
        return
      }
      if (this.currPatient.sliceState !== 2) {
        this.$msg.error('该切片未检查')
        return
      }
      this.ADD_TAB({
        label: this.currPatient.name + ' 报告单',
        name: 'report' + this.currPatient.sliceId,
        component: 'report',
        params: {
          id: this.currPatient.id
        }
      })
    },
    enterDetail() {
      if (this.currPatient.sliceState !== 2) {
        this.$msg.error('该切片未检查')
        return
      }
      this.ADD_TAB({
        label: this.currPatient.name + ' 切片',
        name: 'detail' + this.currPatient.sliceId,
        component: 'detail',
        params: {
          sliceId: this.currPatient.sliceId,
          sliceNum: this.currPatient.sliceNum
        }
      })
    }
  },
  components: {
    PatientDetail,
    PatientForm
  }
}
</script>

<style lang="less" scoped>
.patient-container {
  height: 100%;
  width: 100%;

  display: flex;
  padding: 0.5rem;
  box-sizing: border-box;
}
.patient-box {
  width: 20%;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  display: flex;
  flex-direction: column;

  .el-table {
    height: 100%;

    .state0 {
      color: red;
    }
    .state1 {
      color: blue;
    }
    .state2 {
      color: green;
    }
    .state3 {
      color: gray;
    }
  }
}
.detail-box {
  width: 60%;
  margin: 0 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  display: flex;
  flex-direction: column;

  .tool-box {
    margin: 0.5rem;
  }
}
.cell-box {
  width: 20%;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .el-table {
    height: 100%;
  }
}
</style>
