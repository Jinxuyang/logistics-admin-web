<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="car">车辆管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--Card-->
    <el-card class="box-card">
      <!--列表上方-->
      <div slot="header" class="clearfix">
        <span>项目管理</span>
        <el-input v-model="searchContent" style="width: 15%;margin-left: 1%" placeholder="请输入内容"></el-input>
        <el-button @click="handleSearch(searchContent)" style="margin-left: 1%">检索</el-button>
        <el-button style="float: right" @click="showCreateDialog">添加新项目</el-button>
      </div>
      <!--列表-->
      <div class="text item">
        <template>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="id"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="汽车型号"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.model}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="最大装载重量"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.maxWeight}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="最大装载体积"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.maxVolume}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="起步价"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.startPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="点位费"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.pointFee}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!--分页-->
      <div class="block">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="pageCnt"
          @current-change="handleCurrentPageChange">
        </el-pagination>
      </div>
    </el-card>
    <!--修改信息Dialog-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="temp">
        <el-form-item label="ID" >
          <el-input  v-model="temp.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="汽车型号" >
          <el-input  v-model="temp.model"></el-input>
        </el-form-item>
        <el-form-item label="最大装载重量" >
          <el-input  v-model="temp.maxWeight"></el-input>
        </el-form-item>
        <el-form-item label="最大装载体积" >
          <el-input  v-model="temp.maxVolume"></el-input>
        </el-form-item>
        <el-form-item label="起步价" >
          <el-input  v-model="temp.startPrice"></el-input>
        </el-form-item>
        <el-form-item label="点位费" >
          <el-input  v-model="temp.pointFee"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit(dialogStatus);">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Car',
  data () {
    return {
      textMap: {
        update: '更新',
        create: '新增'
      },
      tableData: [],
      temp: {
        id: undefined,
        model: '',
        maxWeight: '',
        maxVolume: '',
        startPrice: '',
        pointFee: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      searchContent: '',
      pageCnt: 0
    }
  },
  created () {
    this.getForm()
  },
  methods: {
    getForm (keyword = '', pageNum = 1) {
      this.$http.get('/car/get/' + keyword + '?pageNum=' + pageNum).then(res => {
        if (res.data.status === 'success') {
          this.tableData = res.data.data.list
          this.pageCnt = res.data.data.pageCnt
        } else {
          this.$message.error('获取列表失败')
        }
      }).catch(res => {
        console.log(res)
        this.$message.error('获取列表失败')
      })
    },
    showEditDialog (index, row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.temp = row
    },
    showCreateDialog () {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleEdit (status) {
      const param = JSON.stringify(this.temp)
      if (status === 'update') {
        this.$http.put('/car/update/' + this.temp.id, param, { headers: { 'Content-Type': 'application/json' } }).then(res => {
          console.log(res)
          this.dialogFormVisible = false
          this.getForm()
        }).catch(res => {
          console.log(res)
        })
      } else if (status === 'create') {
        console.log(this.temp)
        this.$http.post('/car/insert', param, { headers: { 'Content-Type': 'application/json' } }).then(res => {
          console.log(res)
          this.dialogFormVisible = false
          this.getForm()
        }).catch(res => {
          console.log(res)
        })
      }
    },
    handleDelete (index, row) {
      this.$http.delete('/car/delete/' + row.id).then(res => {
        if (res.data.status === 'success') {
          this.$message.success('删除成功')
          this.getForm()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    handleSearch (searchContent) {
      this.getForm(searchContent)
    },
    handleCurrentPageChange (page) {
      this.getForm('', page)
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  margin-top: 1.2%;
}
</style>
