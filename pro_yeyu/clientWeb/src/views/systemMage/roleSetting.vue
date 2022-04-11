<template>
  <div id="main">
    <el-row style="margin-bottom:10px;">
      <el-button size="small" type="primary" @click="createRole">创建角色</el-button>
    </el-row>
    <el-table v-loading="loading" :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
      <el-table-column prop="roleName" label="角色名称" width="120">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述">
      </el-table-column>
      <el-table-column prop="roleStatus" label="角色状态" width="100">
        <template slot-scope="scope">
          {{ scope.row.roleStatus == "1"?'启用':'停用'}}
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="160">
      </el-table-column>
      <el-table-column prop="editDate" label="修改时间" width="160">
      </el-table-column>
      <el-table-column width="330" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="primary" @click="handleMenu(scope.$index, scope.row)">菜单权限</el-button>
          <el-button size="mini" type="primary" @click="handleUser(scope.$index, scope.row)">用户权限</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top:15px;">
      <el-pagination background align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
      </el-pagination>
    </div>
    <el-dialog title="创建角色" :visible.sync="createDialogFormVisible" append-to-body center>
      <el-form ref="roleForm" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
           <el-input type="textarea" v-model="roleForm.roleDesc"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="roleStatus">
          <el-select v-model="roleForm.roleStatus" placeholder="请选择角色状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="createDate">
          <el-date-picker v-model="roleForm.createDate" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
          <!-- <el-date-picker v-model="roleForm.createDate" type="date" placeholder="选择时间">
          </el-date-picker> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="createClick">确 定</el-button>
        <el-button size="small" @click="createDialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改角色信息" :visible.sync="dialogFormVisible" append-to-body center>
      <el-form ref="editRoleForm" label-width="100px">
         <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
           <el-input type="textarea" v-model="editRoleForm.roleDesc"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="roleStatus">
          <el-select v-model="editRoleForm.roleStatus" placeholder="请选择角色状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改时间" prop="editDate">
          <el-date-picker v-model="editRoleForm.editDate" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
          <!-- <el-date-picker v-model="editRoleForm.editDate" type="date" placeholder="选择时间">
          </el-date-picker> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="editClick">确 定</el-button>
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="菜单权限" :visible.sync="menuDialogFormVisible" append-to-body center>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="editClick">确 定</el-button>
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="用户权限" :visible.sync="userDialogFormVisible" append-to-body center>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="editClick">确 定</el-button>
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
export default {
  name: 'role',
  data () {
    return {
      tableData: [],
      currentPage: 1, // 当前页码
      // total: 20, // 总条数
      pageSize: 5, // 每页的数据条数
      dialogFormVisible: false,
      createDialogFormVisible: false,
      userDialogFormVisible: false,
      menuDialogFormVisible: false,
      options: regionData,
      selectedOptions: [],
      roleForm: {
        roleName: '',
        roleDesc: '',
        roleStatus: '',
        createDate: ''
      },
      editRoleForm: {},
      loading: true
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
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    // 获取表格数据
    getTable () {
      const that = this
      this.$axios
        .post('/role/getRoleData')
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.tableData = res.data
            that.loading = false
          } else {
            console.log('查询失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 创建角色
    createRole () {
      this.createDialogFormVisible = true
    },
    // 创建角色确定事件
    createClick () {
      const that = this
      let roleData = {}
      roleData.roleName = this.roleForm.roleName
      roleData.roleDesc = this.roleForm.roleDesc
      roleData.roleStatus = this.roleForm.roleStatus
      if (this.roleForm.createDate !== '' && this.roleForm.createDate !== undefined) {
        roleData.createDate = this.formatDateTime(this.roleForm.createDate)
      } else {
        roleData.createDate = ''
      }
      this.$axios
        .post('/role/createRole', roleData)
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.createDialogFormVisible = false
            that.getTable()
            that.currentPage = 1
            that.pageSize = 5
            that.$message({
              message: res.msg,
              center: true
            })
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
    // 表格行内操作
    handleEdit (index, data) {
      this.dialogFormVisible = true
      this.editRoleForm = data
    },
    // 修改角色确认事件
    editClick () {
      const that = this
      if (this.editRoleForm.editDate !== '' && this.editRoleForm.editDate !== undefined) {
        this.editRoleForm.editDate = that.formatDateTime(this.editRoleForm.editDate)
      } else {
        this.editRoleForm.editDate = ''
      }
      this.$axios
        .post('/role/editRole', this.editRoleForm)
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.dialogFormVisible = false
            that.getTable()
            that.currentPage = 1
            that.pageSize = 5
            that.$message({
              message: res.msg,
              center: true
            })
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
    handleMenu () {
      this.menuDialogFormVisible = true
    },
    handleUser () {
      this.userDialogFormVisible = true
    },
    handleDelete (index, data) {
      const that = this
      this.$confirm('确定能删除吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$axios
          .post('/role/delRole', { roleId: data.roleId })
          .then(function (result) {
            let res = result.data
            if (res.status === '0') {
              that.$message({
                message: res.msg,
                center: true
              })
              that.getTable()
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          center: true
        })
      })
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
  }
}
</script>

<style scoped lang="less">
#main {
  padding: 5px;
  /deep/ .el-button+.el-button{
    margin-left: 5px;
  }
}
</style>
