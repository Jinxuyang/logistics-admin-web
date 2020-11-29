<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="car">订单路线管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!--Card-->
    <el-card class="box-card">
      <!--列表上方-->
      <div slot="header" class="clearfix">
        <span>路线管理</span>
        <!--<el-input v-model="searchContent" style="width: 15%;margin-left: 1%" placeholder="请输入内容"></el-input>
        <el-button @click="handleSearch(searchContent)" style="margin-left: 1%">检索</el-button>-->
        <el-button style="float: right" @click="showCreateDialog">添加新路线</el-button>
      </div>

      <table class="gridtable">
        <tr v-for="path in this.pathData" :key="path.id">
          <td>{{ path.id }}</td>
          <td v-for="(place,index) in path.path" :key="index">{{placeMap[place]}}</td>
        </tr>
      </table>
      <!--分页-->
      <div class="block" style="margin-top: 1%">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="pageCnt"
          >
        </el-pagination>
      </div>
    </el-card>
    <!--&lt;!&ndash;修改信息Dialog&ndash;&gt;
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
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  name: 'Car',
  data () {
    return {
      placeMap: ['', '北京市朝阳区新源西里社区东街甲10号', '北京市昌平区沙河镇巩华大街', '北京市朝阳区民族园路2号', '北京市朝阳区望京路广顺北街33号',
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
        '北京市朝阳区崔各庄乡南皋村南皋路123号B座'],
      pageCnt: 0,
      road: [
      ],
      pathData: ''
    }
  },
  created () {
    this.getAllPath()
  },
  methods: {

    getAllPath () {
      this.$http.get('/path/get?pageNum=' + '1').then(res => {
        console.log(res)
        if (res.data.status === 'success') {
          this.pathData = res.data.data.list
          console.log(this.pathData)
        }
      })
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
th,td{
    border: 1px solid #000;
}
table{
  border-collapse: collapse;
}
table.gridtable {font-family: verdana,arial,sans-serif;font-size:11px;color:#333333;border-width: 1px;border-color: #666666;border-collapse: collapse;}

table.gridtable th {border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #dedede;}

table.gridtable td {border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff;}
</style>
