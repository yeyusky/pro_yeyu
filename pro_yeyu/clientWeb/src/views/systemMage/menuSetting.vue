<template>
  <div id="menuCantainer">
    <div class="leftBox">
      <div class="treeTitle">菜单目录</div>
      <el-tree
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        :highlight-current="true"
        node-key="id"
        :current-node-key="currentNodekey"
        @node-click="handleNodeClick"
        ref="tree">
      </el-tree>
    </div>
    <div class="rightBox">
      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-plus"></i> 新增一级目录</span>
          <el-form class="formBox" ref="addTreeForm" :model="addTreeForm" label-width="100px">
            <!-- <el-form-item label="父级目录" v-if="this.isFirst">
              <el-input v-model="treeForm.parentName"></el-input>
            </el-form-item> -->
            <el-form-item label="名称">
              <el-input v-model="addTreeForm.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
              <el-input v-model="addTreeForm.icon"></el-input>
            </el-form-item>
            <el-form-item label="路径">
              <el-input v-model="addTreeForm.path"></el-input>
            </el-form-item>
            <el-form-item label="组件描述">
              <el-input type="textarea" v-model="addTreeForm.menuDesc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="parentSubmit">确认</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane v-if="this.treeData.length !== 0">
          <span slot="label"><i class="el-icon-circle-plus-outline"></i> 新增子级目录</span>
          <el-form class="formBox" ref="childTreeForm" :model="childTreeForm" label-width="100px">
            <el-form-item label="父级目录">
              <el-input v-model="childTreeForm.parentName" disabled></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="childTreeForm.name"></el-input>
            </el-form-item>
            <!-- <el-form-item label="图标">
              <el-input v-model="childTreeForm.icon"></el-input>
            </el-form-item> -->
            <el-form-item label="路径">
              <el-input v-model="childTreeForm.path"></el-input>
            </el-form-item>
            <el-form-item label="组件描述">
              <el-input type="textarea" v-model="childTreeForm.menuDesc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="childSubmit">确认</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane v-if="this.treeData.length !== 0">
          <span slot="label"><i class="el-icon-edit"></i> 编辑</span>
          <el-form class="formBox" ref="treeForm" :model="treeForm" label-width="100px">
            <el-form-item label="父级目录">
              <el-input v-model="treeForm.parentName" disabled></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="treeForm.name"></el-input>
            </el-form-item>
            <el-form-item label="图标" v-if="treeForm.pid === 0">
              <el-input v-model="treeForm.icon"></el-input>
            </el-form-item>
            <el-form-item label="路径">
              <el-input v-model="treeForm.path"></el-input>
            </el-form-item>
            <el-form-item label="组件描述">
              <el-input type="textarea" v-model="treeForm.menuDesc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="editSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane v-if="this.treeData.length !== 0">
          <span slot="label"><i class="el-icon-circle-close"></i> 删除</span>
          <el-tree
            :data="treeData"
            show-checkbox
            node-key="id"
            ref="deltree"
            highlight-current
            :props="deldefaultProps">
          </el-tree>
          <el-button size="small" type="primary" class="delBtn" @click="delSubmit">确定</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menus',
  data () {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id',
        pid: 'pid',
        path: 'path',
        icon: 'icon'
      },
      deldefaultProps: {
        children: 'children',
        label: 'name',
        id: 'id',
        pid: 'pid',
        path: 'path',
        icon: 'icon'
      },
      currentNodekey: '',
      childTreeForm: {
        name: '',
        path: '',
        id: '',
        pid: '',
        parentName: '',
        menuDesc: ''
      },
      treeForm: {
        name: '',
        icon: '',
        path: '',
        id: '',
        pid: '',
        parentName: '',
        menuDesc: ''
      },
      addTreeForm: {
        name: '',
        icon: '',
        path: '',
        pid: '',
        parentName: '',
        menuDesc: ''
      }
    }
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created () {
    this.getTable()
  },
  mounted () {},
  methods: {
    // 获取左侧菜单数据
    getTable () {
      const that = this
      this.$axios
        .post('/menu/getMenuData')
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.treeData = res.data
            if (that.treeData.length > 0) {
              that.currentNodekey = that.treeData[0].id
              that.$nextTick(() => {
                that.$refs.tree.setCurrentKey(that.currentNodekey)
              })
            }
            that.changeNode(that.treeData[0])
          } else {
            console.log('查询失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 点击节点事件
    handleNodeClick (data) {
      this.changeNode(data)
    },
    // tabs切换事件
    handleClick (tab, event) {
      if (tab.index === '0' || tab.index === 0) {
        // this.isFirst = false
      }
      if (tab.index === '1' || tab.index === 1) {
        // this.isFirst = true
      }
      if (tab.index === '2' || tab.index === 2) {
        // this.isFirst = true
      }
    },
    // 添加一级目录
    parentSubmit () {
      let firstForm = {}
      firstForm.name = this.addTreeForm.name
      firstForm.menuDesc = this.addTreeForm.menuDesc
      firstForm.pid = '0'
      firstForm.parentName = '无父级目录'
      firstForm.icon = this.addTreeForm.icon
      firstForm.path = this.addTreeForm.path
      const that = this
      if (firstForm.name === '' || firstForm.name === undefined || firstForm.name === null) {
        that.$message.error('请填写名称')
        return false
      } else if (firstForm.icon === '' || firstForm.icon === undefined || firstForm.icon === null) {
        that.$message.error('请填写图标')
        return false
      } else if (firstForm.path === '' || firstForm.path === undefined || firstForm.path === null) {
        that.$message.error('请填写路径')
        return false
      } else {
        this.$axios
          .post('/menu/addMenu', firstForm)
          .then(function (result) {
            let res = result.data
            if (res.status === '0') {
              that.$message({
                message: res.msg,
                center: true
              })
              that.getTable()
            } else {
              that.$message({
                message: res.msg,
                center: true
              })
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    // 添加子级目录
    childSubmit () {
      let childForm = {}
      childForm.name = this.childTreeForm.name
      childForm.menuDesc = this.childTreeForm.menuDesc
      childForm.pid = this.childTreeForm.pid
      childForm.parentName = this.childTreeForm.parentName
      childForm.path = this.childTreeForm.path
      const that = this
      if (childForm.name === '' || childForm.name === undefined || childForm.name === null) {
        that.$message.error('请填写名称')
        return false
      } else if (childForm.path === '' || childForm.path === undefined || childForm.path === null) {
        that.$message.error('请填写路径')
        return false
      } else {
        this.$axios
          .post('/menu/addChildMenu', childForm)
          .then(function (result) {
            let res = result.data
            if (res.status === '0') {
              that.$message({
                message: res.msg,
                center: true
              })
              that.getTable()
            } else {
              that.$message({
                message: res.msg,
                center: true
              })
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    // 修改目录
    editSubmit () {
      let editForm = {}
      editForm.name = this.treeForm.name
      editForm.menuDesc = this.treeForm.menuDesc
      editForm.icon = this.treeForm.icon
      editForm.path = this.treeForm.path
      editForm.id = this.treeForm.id
      const that = this
      if (editForm.name === '' || editForm.name === undefined || editForm.name === null) {
        that.$message.error('请填写名称')
        return false
      } else if (editForm.path === '' || editForm.path === undefined || editForm.path === null) {
        that.$message.error('请填写路径')
        return false
      } else if ((this.treeForm.pid === 0 && (editForm.icon === '' || editForm.icon === undefined || editForm.icon === null)) || (this.treeForm.pid === '0' && (editForm.icon === '' || editForm.icon === undefined || editForm.icon === null))) {
        that.$message.error('请填写图标')
        return false
      } else {
        this.$axios
          .post('/menu/editMenu', editForm)
          .then(function (result) {
            let res = result.data
            if (res.status === '0') {
              that.$message({
                message: res.msg,
                center: true
              })
              // that.getTable()
            } else {
              that.$message({
                message: res.msg,
                center: true
              })
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    // 删除目录
    delSubmit () {
      const idArr = this.$refs.deltree.getCheckedKeys()
      let ids = ''
      for (let menuId of idArr) {
        ids += menuId + ','
      }
      ids = ids.substr(0, ids.length - 1)
      const that = this
      this.$confirm('确定能删除吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$axios
          .post('/menu/delMenu', { ids: ids })
          .then(function (result) {
            let res = result.data
            if (res.status === '0') {
              that.$message({
                message: res.msg,
                center: true
              })
              that.getTable()
            } else {
              that.$message({
                message: res.msg,
                center: true
              })
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          center: true
        })
      })
    },
    // 点击tree节点切换数据
    changeNode (data) {
      this.treeForm = data
      this.childTreeForm.parentName = data.name
      this.childTreeForm.pid = data.id
      this.childTreeForm.id = ''
      this.childTreeForm.name = ''
      this.childTreeForm.path = ''
      this.childTreeForm.icon = ''
      this.childTreeForm.menuDesc = ''
    }
  }
}
</script>

<style scoped lang="less">
#menuCantainer{
  display: flex;
  height: 100%;
  .leftBox{
    height: calc(100% - 170px);
    width: 220px;
    overflow-x: hidden;
    overflow-y: auto;
    box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
    border-radius: 5px;
    position: fixed;
    .treeTitle{
      position: relative;
      height: 40px;
      font-size: 18px;
      line-height: 40px;
      text-align: left;
      color: #40A0FA;
      font-weight: bolder;
      padding-left: 15px;
    }
    .filter-tree{
      width: 200px;
      padding: 10px 10px;
      background-color: transparent;
    }
     /* 改变被点击节点背景颜色，字体颜色 */
    // /deep/ .el-tree-node:focus > .el-tree-node__content {
    //   background-color: #4a9de7 !important;
    //   color: #fff !important;
    // }
    /*节点失焦时的背景颜色*/
    /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content{
      background-color: #4a9de7 !important;
      color: #fff !important;
    }
  }
  .leftBox::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(144, 147, 153, 0.3);
  }

  /*定义滚动条轨道 内阴影+圆角*/
  .leftBox::-webkit-scrollbar-track {
    background-color: #ffffff;
  }

  /*定义滑块 内阴影+圆角*/
  .leftBox::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(144, 147, 153, 0.3);
    transition: background-color 0.3s;
  }
  .rightBox{
    margin-left: 240px;
    flex: 1;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    .formBox{
      width: 70%;
      margin: 10px auto;
    }
    .el-tree{
      max-width: 500px;
      margin: auto;
    }
    .delBtn{
      position: relative;
      left: 50%;
      margin-top: 20px;
      margin-left: -35px;
    }
  }
}
</style>
