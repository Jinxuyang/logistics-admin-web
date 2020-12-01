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
        <el-button style="float: right" @click="showCreateDialog">添加新订单</el-button>
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
              label="体积"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.volume}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="重量"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.weight}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="到达时间"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.earliestPickTime.substring(0,16)+"--"+scope.row.latestPickTime.substring(0,16)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="车辆ID"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.carId}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="路径"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.pathId}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="工人ID"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.workerId}}</span>
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
        <el-form-item label="活动区域">
          <el-select placeholder="请选择路径ID" v-model="temp.pathId" >
            <el-option v-for="path in this.pathList"  :label="path.id" :key="path.id"  :value="path.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" >
          <el-input  v-model="temp.quantity"></el-input>
        </el-form-item>
        <el-form-item label="体积" >
          <el-input  v-model="temp.volume"></el-input>
        </el-form-item>
        <el-form-item label="重量" >
          <el-input  v-model="temp.weight"></el-input>
        </el-form-item>
        <el-form-item label="拣货时间区间">
          <div class="block">
            <el-date-picker
              v-model="pickDateRange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="最早到达时间"
              end-placeholder="最晚到达时间">
            </el-date-picker>
          </div>
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
      volume: [],
      weight: [],
      tableData: [],
      temp: {
        id: undefined,
        quantity: '',
        volume: '',
        weight: '',
        earliestPickTime: '',
        latestPickTime: '',
        pathId: '',
        carId: ''
      },
      pathList: [],
      dialogFormVisible: false,
      dialogStatus: '',
      searchContent: '',
      pageCnt: 0,
      arrDateRange: [],
      pickDateRange: [],
      placeMap: ['',
        '北京市朝阳区新源西里社区东街甲10号',
        '北京市昌平区沙河镇巩华大街',
        '北京市朝阳区民族园路2号',
        '北京市朝阳区望京路广顺北街33号',
        '北京市顺义区南法信府前街47号',
        '北京市通州区马驹桥镇柏福村北500米（柏福物流）',
        '北京市通州区漷县镇大香仪村幼儿园西侧',
        '北京市通州区通胡大街甲3号',
        '北京市通州区于家务乡渠头村头东口通卅联盟产业园',
        '北京市顺义区李桥镇沿河村滨沿路2号',
        '北京市朝阳区黑庄户乡大鲁店甲一号',
        '北京市朝阳区双桥桥关西侧',
        '北京市朝阳区东三环南路弘燕南一路华森新世纪广场',
        '北京市海淀区西四环北路117号',
        '1021云岗店',
        '北京市大兴区西红门宏福路与欣旺大街交汇处',
        '北京市大兴区旧宫镇小红门路39号',
        '北京市长阳镇四大队水四路北京太阳葡萄酒有限公司对面院内',
        '北京市顺义区高丽营镇金马工业区19号圣士鑫建材有限公司',
        '北京市顺义区赵全营镇白庙村东路路北500米（二层小黄楼）',
        '北京市朝阳区崔各庄乡南皋村南皋路123号B座']
    }
  },
  created () {
    this.getForm()
  },
  methods: {
    getForm (keyword = '', pageNum = 1) {
      this.$http.get('/path/get/notgenerate').then(res => {
        if (res.data.status === 'success') {
          this.pathList = res.data.data
          console.log(this.pathList)
        } else {
          this.$message.error('获取列表失败')
        }
      })
      this.$http.get('/order/get/' + keyword + '?pageNum=' + pageNum).then(res => {
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
      this.temp.earliestArrTime = this.arrDateRange[0]
      this.temp.latestArrTime = this.arrDateRange[1]
      this.temp.earliestPickTime = this.pickDateRange[0]
      this.temp.latestPickTime = this.pickDateRange[1]
      console.log(this.temp)
      const param = JSON.stringify(this.temp)
      if (status === 'update') {
        this.$http.put('/order/update/' + this.temp.id, param, { headers: { 'Content-Type': 'application/json' } }).then(res => {
          this.dialogFormVisible = false
          this.getForm()
        }).catch(res => {
          console.log(res)
        })
      } else if (status === 'create') {
        this.$http.post('/order/insert', param, { headers: { 'Content-Type': 'application/json' } }).then(res => {
          this.dialogFormVisible = false
          this.getForm()
        }).catch(res => {
          console.log(res)
        })
      }
    },
    handleDelete (index, row) {
      this.$http.delete('/order/delete/' + row.id).then(res => {
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
