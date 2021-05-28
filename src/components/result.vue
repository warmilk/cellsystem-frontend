<template>
  <!-- 右侧结果展示 -->

  <section class="container card" v-if="hasData">
    <img :src="require('@/assets/result.png')" alt="" />
    <el-collapse v-model="activeNames" class="mycollapse">
      <el-collapse-item title="细胞核识别结果" name="1">
        <table>
          <thead>
            <tr>
              <th>特征</th>
              <th>值</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in infoArray.slice(0, 15)" :key="index">
              <td>{{ item[0] }}</td>
              <td>{{ item[1] }}</td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
      <el-collapse-item title="细胞体形态信息" name="2">
        <table>
          <thead>
            <tr>
              <th>对象</th>
              <th>特征</th>
              <th>平均值</th>
              <th>中值</th>
              <th>标准差</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in infoArray.slice(16, infoArray.length)"
              :key="index"
            >
              <td>
                <el-tag
                  v-if="item[0] == '细胞核'"
                  size="small"
                  type="warning"
                  >{{ item[0] }}</el-tag
                >
                <el-tag
                  v-if="item[0] == '细胞体'"
                  size="small"
                  type="success"
                  >{{ item[0] }}</el-tag
                >
              </td>
              <td>{{ item[1] }}</td>
              <td>{{ item[2] }}</td>
              <td>{{ item[3] }}</td>
              <td>{{ item[4] }}</td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script>
export default {
  props: {
    infoArray: {
      type: Array
    },
    hasData: {
        type: Boolean
    }
  },
  data() {
    return {
      activeNames: ['1'],
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
}
.loadingcard {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.card {
  width: 80%;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  padding: 30px;
  box-sizing: border-box;
  background: white;
  & > img {
    width: 100%;
    margin-bottom: 50px;
  }
}
.mycollapse {
  width: 100%;
}
table {
  border-collapse: collapse;
  width: 100%;
  //   margin-top: 10px;
}
thead {
  background: #409eff;
  color: #fff;
  > tr > th {
    font-weight: normal;
  }
  > tr > th:nth-child(1) {
    border-top-left-radius: 5px;
  }
  > tr > th:last-child {
    border-top-right-radius: 5px;
  }
}
tr {
  height: 40px;
}
tbody {
  background: #e4e7ed52;
  tr {
    text-align: center;
  }
}
</style>
