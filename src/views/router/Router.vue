<template>
<div class="container" style="margin-top: 10%">
  <div>
    <h2 style="text-align: center;margin-bottom: 3%">物流信息系统后台</h2>
  </div>
  <el-row >
    <el-col :span="7"><div class="grid-content "></div></el-col>
    <el-col :span="5">
      <div class="grid-content ">
        <a href="/index">
          <img style="text-align: center" src="~@/assets/plan.jpg" width="260px" height="234px">
        </a>
        <h3 style="margin-left: 21%">人员排班系统</h3>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ">
        <a href="/index">
          <img style="text-align: center" src="~@/assets/car.jpg" width="340px" height="234px">
        </a>
        <h3 style="margin-left: 27%">车辆路线管理系统</h3>
      </div>
    </el-col>
    <el-col :span="6"><div class="grid-content "></div></el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'Router'
}
</script>

<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  background: #d3dce6;
}
</style>
