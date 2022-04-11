<template>
  <div id="deptCantainer">
    <div class="leftBox">
      <div class="treeTitle"><i style="position:absolute;left:7px;top:0px;" class="el-icon-s-home"></i>Sparrower网络科技有限公司</div>
      <el-button size="small" type="primary" style="margin: 0px 0px 10px 10px;" @click="createDept">新建一级部门</el-button>
      <el-tree
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        :highlight-current="true"
        node-key="deptId"
        :current-node-key="currentNodekey"
        @node-click="handleNodeClick"
        ref="tree">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <div id="hoverBtnBox" class="oper">
            <i class="el-icon-plus" @click="createChildDept(data)"></i>
            <i class="el-icon-edit" @click="editDept(data)"></i>
            <i class="el-icon-delete" @click="delDept(data)"></i>
          </div>
        </span>
      </el-tree>
    </div>
    <div class="rightBox">
      <el-form :label-position="labelPosition" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item>
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-document-remove"></i>
                  <span>部门名称:</span>
                </span>
              </span>
              <div class="formData">{{editTreeForm.departmentName}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-edit-outline"></i>
                  <span>部门描述:</span>
                </span>
              </span>
              <el-popover
                placement="bottom"
                title=""
                width="240"
                trigger="click"
                :content="editTreeForm.deptDesc">
                <div slot="reference" class="formData">{{editTreeForm.deptDesc}}</div>
              </el-popover>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item>
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-document"></i>
                  <span>父级部门:</span>
                </span>
              </span>
              <div class="formData">{{editTreeForm.deptPname}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <span slot="label">
                <span class="span-box">
                  <i class="el-icon-date"></i>
                  <span>创建时间:</span>
                </span>
              </span>
              <div class="formData">{{formatDateTime(editTreeForm.createDate)}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </el-form>
      <div>
        <el-button size="small" style="margin:15px;" type="primary" @click="selectUser">选择用户</el-button>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
          <el-table-column prop="createDate" label="创建时间" width="120">
          </el-table-column>
          <el-table-column prop="fullName" label="用户名称" width="150">
          </el-table-column>
          <el-table-column prop="userDesc" label="个性签名">
          </el-table-column>
          <el-table-column width="230" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success" v-if="showBtn(scope.row)" @click="handleActive(scope.$index, scope.row)">激活</el-button>
              <el-button size="mini" type="primary" v-if="showBtns(scope.row)" @click="handleRemove(scope.$index, scope.row)">移除部门</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top:15px;">
          <el-pagination background align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="新建部门" :visible.sync="createDialogFormVisible" append-to-body center>
      <el-form ref="addTreeForm" label-width="100px">
        <el-form-item label="部门名称" prop="departmentName">
          <el-input v-model="addTreeForm.departmentName"></el-input>
        </el-form-item>
        <el-form-item label="部门描述" prop="deptDesc">
           <el-input type="textarea" v-model="addTreeForm.deptDesc"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createDate">
          <el-date-picker v-model="addTreeForm.createDate" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="createClick">确 定</el-button>
        <el-button size="small" @click="createDialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新建子级部门" :visible.sync="childDialogFormVisible" append-to-body center>
      <el-form ref="childTreeForm" label-width="100px">
        <el-form-item label="父级部门" prop="deptPname">
          <el-input v-model="childTreeForm.deptPname" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="departmentName">
          <el-input v-model="childTreeForm.departmentName"></el-input>
        </el-form-item>
        <el-form-item label="部门描述" prop="deptDesc">
           <el-input type="textarea" v-model="childTreeForm.deptDesc"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createDate">
          <el-date-picker v-model="childTreeForm.createDate" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="ChildDeptClick">确 定</el-button>
        <el-button size="small" @click="childDialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑部门" :visible.sync="editDialogFormVisible" append-to-body center>
      <el-form ref="editTreeForm" label-width="100px">
        <el-form-item label="父级部门" prop="deptPname">
          <el-input v-model="editTreeForm.deptPname" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="departmentName">
          <el-input v-model="editTreeForm.departmentName"></el-input>
        </el-form-item>
        <el-form-item label="部门描述" prop="deptDesc">
           <el-input type="textarea" v-model="editTreeForm.deptDesc"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createDate">
          <el-date-picker v-model="editTreeForm.createDate" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="editDeptClick">保存</el-button>
        <el-button size="small" @click="editDialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择用户" width="70%" :visible.sync="selectDialogFormVisible" @close='closeDialog' append-to-body center>
      <el-table
        ref="multipleTable"
        :data="selectUserData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="120">
        </el-table-column>
        <el-table-column prop="fullName" label="用户名称" width="120">
        </el-table-column>
        <el-table-column prop="userDesc" label="个性签名">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="selectUserClick">保存</el-button>
        <el-button size="small" @click="cancelUserClick">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dept',
  data () {
    return {
      tableData: [],
      currentPage: 1, // 当前页码
      // total: 20, // 总条数
      pageSize: 5, // 每页的数据条数
      treeData: [],
      diguiDeptId: [],
      selectUserData: [],
      checkedIds: [],
      userIds: '',
      createDialogFormVisible: false,
      childDialogFormVisible: false,
      editDialogFormVisible: false,
      selectDialogFormVisible: false,
      labelPosition: 'left',
      defaultProps: {
        children: 'children',
        label: 'departmentName',
        deptId: 'deptId',
        deptPid: 'deptPid',
        deptPname: 'deptPname',
        deptDesc: 'deptDesc',
        createDate: 'createDate'
      },
      currentNodekey: '',
      childTreeForm: {
        departmentName: '',
        deptDesc: '',
        deptPid: '',
        deptPname: '',
        createDate: ''
      },
      editTreeForm: {
        departmentName: '',
        deptDesc: '',
        deptPid: '',
        deptPname: '',
        createDate: '',
        deptId: '',
        userPrivs: ''
      },
      addTreeForm: {
        departmentName: '',
        deptDesc: '',
        deptPid: '',
        deptPname: '',
        createDate: ''
      }
    }
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.getTable()
  },
  methods: {
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    // 获取左侧菜单数据
    getTable () {
      const that = this
      this.$axios
        .post('/dept/getDeptData')
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.treeData = res.data
            if (that.treeData.length > 0) {
              that.currentNodekey = that.treeData[0].deptId
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
    // 添加一级部门
    createDept () {
      this.createDialogFormVisible = true
    },
    createClick () {
      let firstForm = {}
      firstForm.departmentName = this.addTreeForm.departmentName
      firstForm.deptDesc = this.addTreeForm.deptDesc
      firstForm.deptPid = '0'
      firstForm.deptPname = '一级部门无父级'
      if (this.addTreeForm.createDate !== '' && this.addTreeForm.createDate !== undefined) {
        firstForm.createDate = this.formatDateTime(this.addTreeForm.createDate)
      } else {
        firstForm.createDate = ''
      }
      const that = this
      if (firstForm.departmentName === '' || firstForm.departmentName === undefined || firstForm.departmentName === null) {
        that.$message.error('请填写部门名称')
        return false
      } else if (firstForm.deptDesc === '' || firstForm.deptDesc === undefined || firstForm.deptDesc === null) {
        that.$message.error('请填写部门描述')
        return false
      } else {
        this.$axios
          .post('/dept/addFirstDept', firstForm)
          .then(function (result) {
            let res = result.data
            if (res.status === '0') {
              that.createDialogFormVisible = false
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
    // 添加子级部门
    createChildDept (data) {
      this.childDialogFormVisible = true
      this.childTreeForm.deptPname = data.departmentName
      this.childTreeForm.deptPid = data.deptId
      this.childTreeForm.deptId = ''
      this.childTreeForm.departmentName = ''
      this.childTreeForm.createDate = ''
      this.childTreeForm.deptDesc = ''
    },
    ChildDeptClick () {
      let childForm = {}
      childForm.departmentName = this.childTreeForm.departmentName
      childForm.deptDesc = this.childTreeForm.deptDesc
      childForm.deptPid = this.childTreeForm.deptPid
      childForm.deptPname = this.childTreeForm.deptPname
      if (this.childTreeForm.createDate !== '' && this.childTreeForm.createDate !== undefined) {
        childForm.createDate = this.formatDateTime(this.childTreeForm.createDate)
      } else {
        childForm.createDate = ''
      }
      const that = this
      if (childForm.departmentName === '' || childForm.departmentName === undefined || childForm.departmentName === null) {
        that.$message.error('请填写部门名称')
        return false
      } else if (childForm.deptDesc === '' || childForm.deptDesc === undefined || childForm.deptDesc === null) {
        that.$message.error('请填写部门描述')
        return false
      } else {
        this.$axios
          .post('/dept/addChildDept', childForm)
          .then(function (result) {
            let res = result.data
            if (res.status === '0') {
              that.childDialogFormVisible = false
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
    // 编辑部门
    editDept (data) {
      this.editDialogFormVisible = true
      this.editTreeForm.deptPname = data.deptPname
      this.editTreeForm.deptPid = data.deptPid
      this.editTreeForm.deptId = data.deptId
      this.editTreeForm.departmentName = data.departmentName
      this.editTreeForm.createDate = data.createDate
      this.editTreeForm.deptDesc = data.deptDesc
    },
    editDeptClick () {
      let editForm = {}
      editForm.deptPname = this.editTreeForm.deptPname
      editForm.deptDesc = this.editTreeForm.deptDesc
      editForm.deptId = this.editTreeForm.deptId
      editForm.deptPid = this.editTreeForm.deptPid
      editForm.departmentName = this.editTreeForm.departmentName
      if (this.editTreeForm.createDate !== '' && this.editTreeForm.createDate !== undefined) {
        editForm.createDate = this.formatDateTime(this.editTreeForm.createDate)
      } else {
        editForm.createDate = ''
      }
      const that = this
      if (editForm.departmentName === '' || editForm.departmentName === undefined || editForm.departmentName === null) {
        that.$message.error('请填写部门名称')
        return false
      } else if (editForm.deptDesc === '' || editForm.deptDesc === undefined || editForm.deptDesc === null) {
        that.$message.error('请填写部门描述')
        return false
      } else {
        this.$axios
          .post('/dept/editDept', editForm)
          .then(function (result) {
            let res = result.data
            if (res.status === '0') {
              that.editDialogFormVisible = false
              that.$message({
                message: res.msg,
                center: true
              })
              that.changeNode(res.data[0])
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
    // 删除部门
    delDept (data) {
      this.diguiDeptId.push(data.deptId)
      if (data.children.length > 0) {
        this.getDeptId(data.children, data.deptId)
      }
      let ids = ''
      for (let item of this.diguiDeptId) {
        ids += item + ','
      }
      const that = this
      this.$confirm('确定能删除吗?存在的子级也会删除!', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$axios
          .post('/dept/delDept', { deptIds: ids })
          .then(function (result) {
            let res = result.data
            if (res.status === '0') {
              that.$message({
                message: res.msg,
                center: true
              })
              that.getTable()
              that.diguiDeptId = []
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
        that.diguiDeptId = []
      })
    },
    // 点击tree节点切换数据
    changeNode (data) {
      this.editTreeForm.deptPname = data.deptPname
      this.editTreeForm.deptPid = data.deptPid
      this.editTreeForm.deptId = data.deptId
      this.editTreeForm.departmentName = data.departmentName
      this.editTreeForm.createDate = data.createDate
      this.editTreeForm.deptDesc = data.deptDesc
      this.editTreeForm.userPrivs = data.userPrivs
      this.userIds = data.userPrivs
      const that = this
      that.$axios
        .post('/dept/getDeptUser', { userPrivs: data.userPrivs })
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.tableData = res.data
            that.currentPage = 1
            that.pageSize = 5
            // that.$message({
            //   message: res.msg,
            //   center: true
            // })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 选择用户
    selectUser () {
      const that = this
      that.selectDialogFormVisible = true
      that.$axios
        .post('/users/getUser')
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.selectUserData = that.returnData(res.data, that.tableData)
            // that.selectUserData = res.data
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    selectUserClick () {
      const that = this
      const selectForm = {}
      selectForm.deptId = that.editTreeForm.deptId
      selectForm.userIds = that.userIds
      that.$axios
        .post('/dept/userInsertDept', selectForm)
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.selectDialogFormVisible = false
            that.tableData = res.data
            that.currentPage = 1
            that.pageSize = 5
            that.$message({
              message: res.msg,
              center: true
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    cancelUserClick () {
      const that = this
      that.selectDialogFormVisible = false
    },
    closeDialog () {
      const that = this
      that.selectDialogFormVisible = false
    },
    handleSelectionChange (value) {
      let ids = ''
      if (value.length > 0) {
        for (let val of value) {
          ids += val.id + ','
        }
        ids = ids.substr(0, ids.length - 1)
      } else {
        ids = ''
      }
      this.userIds = ids
    },
    returnData (odata, ndata) {
      odata.sort(this.sortData)
      ndata.sort(this.sortData)
      let lengtha = odata.length
      let lengthb = ndata.length
      for (let i = 0; i < lengtha; i++) {
        for (let j = 0; j < lengthb; j++) {
          // 判断添加的数组是否为空了
          if (lengtha > 0) {
            if (odata[i]['id'] === ndata[j]['id']) {
              // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
              odata.splice(i, 1)
              lengtha--
            }
          }
        }
      }
      return odata
    },
    sortData (a, b) {
      return Number(a.id) - Number(b.id)
    },
    // 激活本部门用户
    handleActive (index, data) {
      const that = this
      const activeForm = {}
      activeForm.deptId = that.editTreeForm.deptId
      activeForm.departmentName = that.editTreeForm.departmentName
      activeForm.id = data.id
      that.$axios
        .post('/dept/activeDeptUser', activeForm)
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.$message({
              message: res.msg,
              center: true
            })
            that.tableData = res.data
            that.currentPage = 1
            that.pageSize = 5
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
    },
    // 移除本部门用户
    handleRemove (index, data) {
      const that = this
      const removeForm = {}
      removeForm.deptId = that.editTreeForm.deptId
      removeForm.departmentName = that.editTreeForm.departmentName
      removeForm.userId = data.id
      that.$axios
        .post('/dept/removeDept', removeForm)
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.$message({
              message: res.msg,
              center: true
            })
            that.tableData = res.data
            that.currentPage = 1
            that.pageSize = 5
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
    },
    showBtn (data) {
      if (data.deptId !== null && data.deptId !== '' && data.deptId.indexOf(this.editTreeForm.deptId) > -1) {
        return false
      }
      return true
    },
    showBtns (data) {
      if (data.deptId !== null && data.deptId !== '' && data.deptId.indexOf(this.editTreeForm.deptId) > -1) {
        return true
      }
      return false
    },
    // 递归获取子级deptid
    getDeptId (dataArr, id) {
      for (let item of dataArr) {
        if (id === item.deptPid) {
          this.diguiDeptId.push(item.deptId)
        } else if (item.children.length > 0) {
          this.getDeptId(item.children, item.deptId)
        }
      }
    },
    // 时间转换
    formatDateTime (dates) {
      const date = new Date(dates)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let min = date.getMinutes()
      min = min < 10 ? '0' + min : min
      let s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
    }

    // diaload 表格复选框回显
    // :row-key="getkey"
    // setTimeout(function () {
    //           that.toggleSelection(that.returnData(res.data, that.tableData))
    //         }, 500)
    // that.$refs.multipleTable.clearSelection()
    // toggleSelection (rows) {
    //   const that = this
    //   if (rows) {
    //     rows.forEach((row) => {
    //       that.$nextTick().then(function () {
    //         that.$refs.multipleTable.toggleRowSelection(row, true)
    //       })
    //     })
    //   } else {
    //     that.$refs.multipleTable.clearSelection()
    //   }
    // },
    // getkey (row) {
    //   return row.id
    // },
    // returnData (odata, ndata) {
    //   let arr = []
    //   for (let item of odata) {
    //     for (let _item of ndata) {
    //       if (item.id === _item.id) {
    //         arr.push(item)
    //       }
    //     }
    //   }
    //   return arr
    // },
    // diaload 表格复选框回显
  }
}
</script>

<style scoped lang="less">
#deptCantainer{
  display: flex;
  height: 100%;
  .leftBox{
    height: calc(100% - 170px);
    width: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
    border-radius: 5px;
    position: fixed;
    .treeTitle{
      text-align: left;
      margin-top: 5px;
      position: relative;
      height: 40px;
      font-size: 16px;
      line-height: 20px;
      text-align: left;
      color: #40A0FA;
      font-weight: bolder;
      padding-left: 30px;
      padding-right: 7px;
    }
    .filter-tree{
      width: 280px;
      padding: 0 10px 10px 10px;
      background-color: transparent;
      /deep/ .el-tree-node__content{
        position: relative;
      }
      .el-tree-node__content:hover #hoverBtnBox{
        display: flex;
      }
      #hoverBtnBox{
        display: none;
        position: absolute;
        right: 15px;
        top: 1.5px;
        z-index: 99999;
        background-color: #ffffff;
        color: #40A0FA;
        font-weight: bolder;
        padding: 3px;
        border-radius: 4px;
        justify-content: space-around;
        box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
        i{
          margin: 0 5px;
        }
      }
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
    margin-left: 320px;
    width: calc(100% - 320px);
    flex: 1;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    .el-row{
      margin: 0px!important;
      .el-col{
        height: 40px;
        margin: 5px 0;
        i{
          color: #409eff;
        }
        .formData{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .el-divider--horizontal{
      margin: 0px!important;
    }
  }
}
</style>
