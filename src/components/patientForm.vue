<template>
  <div class="info-box">
    <span class="base-box">
      <el-divider content-position="left">基本信息</el-divider>
      <div class="outter-box">
        <el-form
          class="inner-box"
          size="mini"
          ref="patientFormRef"
          :model="patient"
          label-width="100px"
          :rules="patientFormRule"
          status-icon
        >
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
        </el-form>
      </div>
    </span>
    <span class="base-box">
      <el-divider content-position="left">切片信息</el-divider>
      <div class="outter-box">
        <div class="inner-box">
          <el-upload
            list-type="picture-card"
            :auto-upload="false"
            action="#"
            multiple
            accept="image/*"
            :on-change="sliceChange"
            :on-remove="sliceChange"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
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
      patient: {
        name: '',
        gender: null,
        birthday: null,
        regionId: null,
        departmentId: null,
        bedId: null
      },
      slice: [],
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
  computed: {
    ...mapState(['regions', 'departments'])
  },
  methods: {
    getPatient() {
      let res = this.patient
      this.$refs.patientFormRef.validate((valid) => {
        if (!valid) res = null
      })
      if (this.slice.length === 0) {
        res = null
        this.$msg.error('请至少上传一张切片')
      }
      return res
    },
    getSlice() {
      return this.slice
    },
    sliceChange(file, fileList) {
      this.slice = fileList
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
