<template>
  <div class="info-box">
    <span class="base-box">
      <el-divider content-position="left">基本信息</el-divider>
      <div class="outter-box">
        <el-form
          v-if="patient"
          class="inner-box"
          size="mini"
          ref="patientFormRef"
          :model="patient"
          label-width="100px"
          :rules="patientFormRule"
        >
          <el-form-item label="住院号">
            <el-input v-model="patient.patientId" disabled />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="patient.name" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="patient.gender">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="patient.birthday"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="病床号" prop="bedId">
            <el-input v-model="patient.bedId" />
          </el-form-item>
          <el-form-item label="送检部门" prop="departmentId">
            <el-select v-model="patient.departmentId">
              <el-option
                v-for="item in departments"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="取材部位" prop="regionId">
            <el-select v-model="patient.regionId">
              <el-option
                v-for="item in regions"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="切片状态" prop="sliceState">
            <el-select v-model="patient.sliceState" disabled>
              <el-option label="未检测" :value="0" />
              <el-option label="检测中" :value="1" />
              <el-option label="己检测" :value="2" />
              <el-option label="检测失败" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="切片号">
            <el-input v-model="patient.sliceId" disabled />
          </el-form-item>
          <el-form-item label="切片数">
            <el-input v-model="patient.sliceNum" disabled />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="patient.createTime"
              type="datetime"
              disabled
            />
          </el-form-item>
          <el-form-item v-if="patient.sliceState !== 0" label="检查时间">
            <el-date-picker
              v-model="patient.checkTime"
              type="datetime"
              disabled
            />
          </el-form-item>
          <el-form-item v-if="patient.sliceState !== 0" label="模型">
            <el-select v-model="patient.modelId" disabled>
              <el-option label="无" :value="0" />
              <el-option
                v-for="item in models"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </span>
    <span class="base-box">
      <el-divider content-position="left">切片信息</el-divider>
      <div class="outter-box">
        <div class="inner-box">
          <img @click="handleCLickSlice" v-for="item in slice" :src="item + '.jpg'" :key="item" />
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      patientFormRule: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        birthday: [
          { required: true, message: '请选择出生日期', trigger: 'blur' }
        ],
        bedId: [{ required: true, message: '请输入病床号', trigger: 'blur' }],
        departmentId: [
          { required: true, message: '请选择送检部门', trigger: 'blur' }
        ],
        regionId: [
          { required: true, message: '请选择取材部位', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    slice: Array,
    patient: Object
  },
  computed: {
    ...mapState(['regions', 'models', 'departments'])
  },
  methods: {
    getPatient() {
      if (this.patient === null) {
        this.$msg.error('请选择病患')
        return null
      }
      let res = this.patient
      this.$refs.patientFormRef.validate((valid) => {
        if (!valid) res = null
      })
      return res
    },
    handleCLickSlice() {
      this.$parent.enterDetail()
    }
  }
}
</script>

<style lang="less" scoped>
.info-box {
  height: 100%;

  display: flex;
  justify-content: space-between;

  .base-box {
    width: 49%;

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

        img {
          width: 48%;
          margin: 0.125rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        }
      }
    }
  }
}
</style>
