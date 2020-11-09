<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          :router="true">
          <el-menu-item index="/car">
            <i class="el-icon-user"></i>
            <span slot="title">车辆管理</span>
          </el-menu-item>
          <el-menu-item index="/order">
            <i class="el-icon-s-claim"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="/road">
            <i class="el-icon-s-flag"></i>
            <span slot="title">路线管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
  }
}
</script>

<style scoped>

</style>
