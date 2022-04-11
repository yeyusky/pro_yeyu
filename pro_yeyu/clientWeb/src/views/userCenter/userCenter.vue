<template>
  <div id="userCenter" v-loading="loading">
    <el-tabs :tab-position="tabPosition" style="height: 100%;">
      <el-tab-pane>
        <span slot="label"><i style="color:#409eff" class="el-icon-s-order"></i>&nbsp;&nbsp;&nbsp;基本信息</span>
        <el-row :gutter="0">
          <el-col class="colLeft" :span="7">
            <div class="avatarBox">
              <div class="avatarImg">
                <img v-if="userPic" :src="userPic" class="avatar">
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              </div>
              <div class="avatarTxt">欢迎，{{fullName}}</div>
            </div>
          </el-col>
          <el-col class="colRight scroll" :span="17">
            <div class="boxR">
              <div class="titleR">个人资料：</div>
              <div class="contR">
                <el-form :label-position="labelPosition" label-width="100px">
                  <el-form-item>
                    <span slot="label">
                     <span class="span-box">
                       <i class="el-icon-postcard"></i>
                       <span>用户名:</span>
                     </span>
                    </span>
                    <div class="formData">{{userData.username}}</div>
                  </el-form-item>
                  <el-form-item>
                    <span slot="label">
                     <span class="span-box">
                       <i class="el-icon-user"></i>
                       <span>姓名:</span>
                     </span>
                    </span>
                    <div class="formData">{{userData.fullName}}</div>
                  </el-form-item>
                  <el-form-item>
                    <span slot="label">
                     <span class="span-box">
                       <i class="el-icon-coin"></i>
                       <span>年龄:</span>
                     </span>
                    </span>
                    <div class="formData">{{userData.age | undeNull}}</div>
                  </el-form-item>
                  <el-form-item>
                    <span slot="label">
                     <span class="span-box">
                       <i class="el-icon-date"></i>
                       <span>出生年月:</span>
                     </span>
                    </span>
                    <div class="formData">{{formatDateTime(userData.birthday) | undeNull}}</div>
                  </el-form-item>
                  <el-form-item>
                    <span slot="label">
                     <span class="span-box">
                       <i class="el-icon-male"></i>
                       <span>性别:</span>
                     </span>
                    </span>
                    <div class="formData">{{userData.sex === '1'?'男':'女' | undeNull}}</div>
                  </el-form-item>
                  <el-form-item>
                    <span slot="label">
                     <span class="span-box">
                       <i class="el-icon-mobile-phone"></i>
                       <span>手机:</span>
                     </span>
                    </span>
                    <div class="formData">{{userData.mobilePhone | undeNull}}</div>
                  </el-form-item>
                  <el-form-item>
                    <span slot="label">
                     <span class="span-box">
                       <i class="el-icon-message"></i>
                       <span>邮箱:</span>
                     </span>
                    </span>
                    <div class="formData">{{userData.email | undeNull}}</div>
                  </el-form-item>
                  <el-form-item>
                    <span slot="label">
                     <span class="span-box">
                       <i class="el-icon-map-location"></i>
                       <span>地址:</span>
                     </span>
                    </span>
                    <div class="formData">{{userData.address | undeNull}}</div>
                  </el-form-item>
                  <el-form-item>
                    <span slot="label">
                     <span class="span-box">
                       <i class="el-icon-office-building"></i>
                       <span>所属部门:</span>
                     </span>
                    </span>
                    <div class="formData" v-if="userData.deptNames.length">
                      <el-tooltip v-for="(item, i) in userData.deptNames" :key="i" placement="top" effect="light">
                        <div slot="content">用户所在的部门:{{ item }}</div>
                        <el-tag effect="dark">{{ item }}</el-tag>
                      </el-tooltip>
                    </div>
                    <div class="formData" v-else>{{'' | undeNull}}</div>
                  </el-form-item>
                  <el-form-item>
                    <span slot="label">
                     <span class="span-box">
                       <i class="el-icon-price-tag"></i>
                       <span>个性签名:</span>
                     </span>
                    </span>
                    <div class="formData">{{userData.userDesc | undeNull}}</div>
                  </el-form-item>
                  <el-form-item>
                    <span slot="label">
                     <span class="span-box">
                       <i class="el-icon-magic-stick"></i>
                       <span>爱好:</span>
                     </span>
                    </span>
                    <div class="formData">{{userData.hobby | undeNull}}</div>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i style="color:#67c23a" class="el-icon-s-tools"></i>&nbsp;&nbsp;&nbsp;完善设置</span>
        <el-form class="perfect-form scroll" :model="perfectForm" label-width="100px">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="perfectForm.username" disabled></el-input>
        </el-form-item>
         <el-form-item label="姓名:" prop="fullName">
          <el-input v-model="perfectForm.fullName"></el-input>
        </el-form-item>
        <el-form-item label="头像:" prop="userPic">
          <el-tooltip class="item" effect="dark" content="点击，可修改头像。" placement="right">
            <el-upload id="uplo" class="avatar-uploader" action="http://localhost:3066/pic/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="perfectForm.userPic" :src="perfectForm.userPic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-select v-model="perfectForm.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄:" prop="age">
          <el-input v-model.number="perfectForm.age"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker v-model="perfectForm.birthday" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机:" prop="mobilePhone">
          <el-input v-model.number="perfectForm.mobilePhone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="perfectForm.email"></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-cascader ref="cascader" clearable size="large" :options="options" v-model="perfectForm.selectedOptions" @change="handleChange">
          </el-cascader>
        </el-form-item>
        <!-- <el-form-item label="所属部门:" prop="departmentName">
          <el-input v-model="perfectForm.departmentName" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="爱好:" prop="hobby">
          <el-input v-model="perfectForm.hobby"></el-input>
        </el-form-item>
        <el-form-item label="个性描述:" prop="userDesc">
          <el-input type="textarea" v-model="perfectForm.userDesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="saveForm">保存</el-button>
        </el-form-item>
      </el-form>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i style="color:rgb(245, 151, 195)" class="el-icon-s-help"></i>&nbsp;&nbsp;&nbsp;密码修改</span>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="orPassword">
            <el-input type="password" v-model="ruleForm.orPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i style="color:#1DB9C3" class="el-icon-s-custom"></i>&nbsp;&nbsp;&nbsp;好友列表</span>
        <div class="friendList">
          <div class="leftBox scroll">
            <ul class="friBox">
              <li :class="activeClass == ind ? 'friActive':''" v-for="(item, ind) in friList" @click="getDateCls(ind, item)" :key="ind">
                <img :src="item.userPic" alt=""/>
                <div class='li-content'>{{item.fullName}}</div>
              </li>
            </ul>
          </div>
          <div class="rightBox scroll">
            <div v-if="friDetailData.fullName !== ''" class="friDetail">
              <div class="friTitle">
                <div class="friTitle_left">
                  <h2>
                    <i v-if="friDetailData.sex == 1" style="color:#409EFF" class="el-icon-male"></i>
                    <i v-else style="color:#F56C6C" class="el-icon-female"></i>
                    {{friDetailData.fullName}}
                  </h2>
                  <span>{{friDetailData.userDesc}}</span>
                </div>
                <div class="friTitle_right">
                  <img :src="friDetailData.userPic" alt=""/>
                </div>
              </div>
              <el-divider></el-divider>
              <div class="friContent">
                <el-form label-width="60px">
                  <el-form-item label="备注" prop="memo">
                    <div class="friItem">
                      <el-input v-model="friDetailData.memo" @blur="handleBlur(friDetailData.memo)" @focus="handleFocus(friDetailData.memo)" placeholder="点击添加备注" autocomplete="off"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="手机号">
                    <div class="friItem">{{friDetailData.mobilePhone}}</div>
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <div class="friItem">{{friDetailData.email}}</div>
                  </el-form-item>
                </el-form>
              </div>
              <el-divider></el-divider>
              <div class="friBtn">
                <el-button size="small" type="success" @click="handleSend()">发消息</el-button>
              </div>
            </div>
            <div v-else class="showHide">
              <h3>Sparrower</h3>
              <div>好友 <span style="color:red;">{{friList.length}}</span> 人</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i style="color:#9FD8DF" class="el-icon-s-ticket"></i>&nbsp;&nbsp;&nbsp;操作日志</span>
        <el-button size="small" type="primary" @click="sendClick">发送</el-button>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i style="color:#e6a23c" class="el-icon-s-flag"></i>&nbsp;&nbsp;&nbsp;我的收藏</span>
        我的收藏
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import aesCryptos from '../../utils/secret.js'
export default {
  name: 'userCenter',
  data () {
    // 验证第一次密码
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
          callback()
        }
        callback()
      }
    }
    // 验证第二次密码是否相同
    const chevalidatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      activeClass: -1,
      tabPosition: 'left',
      labelPosition: 'left',
      userPic: '',
      fullName: '',
      userData: {
        username: '',
        fullName: '',
        age: '',
        sex: '',
        email: '',
        birthday: '',
        mobilePhone: '',
        departmentName: '',
        deptId: '',
        userDesc: '',
        hobby: '',
        address: '',
        addressCode: '',
        deptNames: []
      },
      ruleForm: {
        username: '',
        password: '',
        checkPassword: '',
        orPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        orPassword: [{ required: true, message: '请输入原始密码', trigger: 'blur' }],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, validator: chevalidatePass, trigger: 'blur' }
        ]
      },
      perfectForm: {
        username: '',
        fullName: '',
        age: '',
        sex: '',
        email: '',
        birthday: '',
        mobilePhone: '',
        departmentName: '',
        deptId: '',
        userDesc: '',
        hobby: '',
        address: '',
        addressCode: '',
        city: '',
        userPic: '',
        provinces: '',
        area: '',
        selectedOptions: []
      },
      options: regionData,
      loading: false,
      friList: [],
      friDetailData: {
        id: '',
        fullName: '',
        sex: '',
        userDesc: '',
        mobilePhone: '',
        email: '',
        address: '',
        userPic: '',
        memo: ''
      }
    }
  },
  sockets: {
    connect: function () { // 这里是监听connect事件
      let info = {
        msg: '连接成功'
      }
      this.txt = '已连接...'
      this.$socket.emit('connSuc', info)
    },
    broadcastMsg (data) {
    },
    disconnect () {
      this.txt = '未连接...'
      console.log('断开连接')
    },
    send (data) {
      console.log(data)
    }
  },
  components: {},
  props: {},
  computed: {},
  filters: { // 过滤器
    undeNull (val) {
      if (val !== '' && val !== undefined && val !== null) {
        return val
      }
      return '未设置'
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.getUserData()
    this.getAllUserData()
  },
  methods: {
    // 获取用户信息数据
    getUserData () {
      const that = this
      this.$axios
        .post('/userc/getUserInfo', { username: this.$store.state.userMsg[0].username })
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.userData = res.data[0]
            that.userData.deptNames = that.returnDeptArr(res.data[0].departmentName)
            that.perfectForm = res.data[0]
            let codeArr = []
            if (res.data[0].addressCode !== '' && res.data[0].addressCode !== undefined && res.data[0].addressCode !== null) {
              for (let code of res.data[0].addressCode.split('/')) {
                codeArr.push(code)
              }
              that.perfectForm.selectedOptions = codeArr
            } else {
              that.perfectForm.selectedOptions = []
            }
            if (res.data[0].address !== '' && res.data[0].address !== undefined && res.data[0].address !== null) {
              let addressArr = res.data[0].address.split('/')
              that.perfectForm.provinces = addressArr[0]
              that.perfectForm.city = addressArr[1]
              that.perfectForm.area = addressArr[2]
            } else {
              that.perfectForm.provinces = ''
              that.perfectForm.city = ''
              that.perfectForm.area = ''
            }
            that.userPic = res.data[0].userPic
            that.fullName = res.data[0].fullName
          } else {
            console.log('查询失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 获取用户信息数据
    getAllUserData () {
      const that = this
      this.$axios
        .post('/users/getUser')
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.friList = res.data
          } else {
            console.log('查询失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 修改密码提交操作
    submitForm (formName) {
      const that = this
      let formData = {}
      formData.username = this.ruleForm.username
      formData.password = aesCryptos.aesEncrypt(this.ruleForm.orPassword)
      formData.newPassword = aesCryptos.aesEncrypt(this.ruleForm.password)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/userc/resetPass', formData)
            .then(function (result) {
              let res = result.data
              if (res.status === '0') {
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
        } else {
          that.$message({
            message: '必填项未填!',
            center: true
          })
          return false
        }
      })
    },
    // 修改密码重置操作
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 地址省市区三级联动
    handleChange () {
      this.perfectForm.provinces = CodeToText[this.perfectForm.selectedOptions[0]]
      this.perfectForm.city = CodeToText[this.perfectForm.selectedOptions[1]]
      this.perfectForm.area = CodeToText[this.perfectForm.selectedOptions[2]]
    },
    // 上传头像操作
    handleAvatarSuccess (res, file) {
      let that = this
      if (res.status === '0') {
        that.$message({
          message: res.msg,
          center: true
        })
        this.getBase64(file.raw).then((url) => {
          this.perfectForm.userPic = url
        })
      } else {
        that.$message({
          message: res.msg,
          center: true
        })
      }
    },
    // 上传头像限制
    beforeAvatarUpload (file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        'image/jpg' ||
        'image/webp' ||
        'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片格式不正确!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    getBase64 (file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
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
      return y + '-' + m + '-' + d
    },
    // 保存设置操作
    saveForm () {
      const that = this
      that.loading = true
      const RegExpEmail = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,}$/
      const RegExpPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      let formData = {}
      formData.id = this.perfectForm.id
      formData.username = this.perfectForm.username
      formData.fullName = this.perfectForm.fullName
      formData.age = this.perfectForm.age
      formData.sex = this.perfectForm.sex
      formData.mobilePhone = this.perfectForm.mobilePhone
      if (!RegExpPhone.test(formData.mobilePhone)) {
        that.$message.error('请填写正确的手机号')
        return false
      }
      formData.email = this.perfectForm.email
      if (!RegExpEmail.test(formData.email)) {
        that.$message.error('请填写正确的邮箱')
        return false
      }
      formData.departmentName = this.perfectForm.departmentName
      formData.deptId = this.perfectForm.deptId
      formData.userDesc = this.perfectForm.userDesc
      formData.hobby = this.perfectForm.hobby
      formData.userPic = this.perfectForm.userPic
      formData.hobby = this.perfectForm.hobby
      formData.address = this.perfectForm.address
      if (this.perfectForm.birthday !== '' && this.perfectForm.birthday !== undefined) {
        formData.birthday = this.formatDateTime(this.perfectForm.birthday)
      } else {
        formData.birthday = ''
      }
      formData.address =
        this.perfectForm.provinces +
        '/' +
        this.perfectForm.city +
        '/' +
        this.perfectForm.area
      formData.addressCode =
        this.perfectForm.selectedOptions[0] +
        '/' +
        this.perfectForm.selectedOptions[1] +
        '/' +
        this.perfectForm.selectedOptions[2]
      this.$axios
        .post('/userc/editUserInfo', formData)
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.loading = false
            that.$message({
              message: res.msg,
              center: true
            })
            that.$store.state.userMsg[0].fullName = formData.fullName
            that.$store.state.userMsg[0].userPic = formData.userPic
            that.$router.go(0)
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
    sendClick () {
      let sendObj = {
        type: 'send',
        name: '张三丰',
        msg: '你好呀'
      }
      // this.sendMsg = ''
      this.$socket.emit('send', sendObj)
    },
    // 返回部门数组
    returnDeptArr (deptName) {
      let deptNameArr = []
      if (deptName !== '' && deptName !== null && deptName !== undefined) {
        for (let item of deptName.split(',')) {
          if (item !== '') {
            deptNameArr.push(item)
          }
        }
      }
      return deptNameArr
    },
    // 好友列表切换
    getDateCls (index, data) {
      // 把当前点击元素的index，赋值给activeClass
      this.activeClass = index
      const that = this
      this.$axios
        .post('/userc/getUserData', { id: data.id })
        .then(function (result) {
          debugger
          let res = result.data
          if (res.status === '0') {
            that.friDetailData.id = res.data[0].id
            that.friDetailData.fullName = res.data[0].fullName
            that.friDetailData.sex = res.data[0].sex
            that.friDetailData.userDesc = res.data[0].userDesc
            that.friDetailData.mobilePhone = res.data[0].mobilePhone
            that.friDetailData.email = res.data[0].email
            that.friDetailData.address = res.data[0].address
            that.friDetailData.userPic = res.data[0].userPic
            if (res.data[0].memo !== '' && res.data[0].memo !== undefined && res.data[0].memo !== null) {
              that.friDetailData.memo = res.data[0].memo
            } else {
              that.friDetailData.memo = ''
            }
          } else {
            console.log('查询失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 获取、失去焦点事件
    handleFocus (val) {
      // if (val.trim() === '点击添加备注') {
      //   this.friDetailData.memo = ''
      // }
    },
    handleBlur (val) {
      // if (val.trim() === '点击添加备注') {
      //   this.friDetailData.memo = ''
      // }
      const that = this
      this.$axios
        .post('/userc/editMemo', {id: that.friDetailData.id, memo: that.friDetailData.memo})
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.loading = false
            console.log(res.msg)
          } else {
            console.log(res.msg)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="less">
#userCenter{
  height: 100%;
  /deep/ .el-tabs__header{
    width: 200px;
    .el-tabs__item{
      text-align: left;
      font-size: 15px;
      font-weight: bolder;
      color: #a8a6a6;
      padding-left: 40px;
      i{
        font-size: 16px;
      }
    }
    .el-tabs__item.is-active{
      color: #a8a6a6;
      background-color: #ebeef5;
    }
  }
  #uplo {
    width:52px;
    height: 52px;
  }
  #uplo /deep/ .el-upload {
    border: 1px dashed #d9d9d9!important;
    border-radius: 6px!important;
    cursor: pointer!important;
    position: relative!important;
    overflow: hidden!important;
  }
  #uplo /deep/ .el-upload:hover {
    border-color: #409eff!important;
  }
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
  /deep/ .el-tabs__content{
    height: 100%;
    .el-tab-pane{
      height: calc(100% - 30px);
      .el-row {
        margin: 15px!important;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        border: 1px solid #ebeef5;
        border-radius: 4px;
        height: 100%;
        .el-col.colLeft{
          overflow: hidden;
          height: 100%;
          background-color: rgb(245, 245, 245);
          .avatarBox{
            height: 50%;
            position: relative;
            background: url('./../../assets/image/avatarBg.png') no-repeat;
            background-size: 100% 100%;
            .avatarImg{
              position: absolute;
              width: 80px;
              height: 80px;
              left: 50%;
              margin-left: -42px;
              bottom: -42px;
              z-index: 9999;
              border-radius: 50%;
              border: 2px solid #40A0FA;
              background-color: #ffffff;
              overflow: hidden;
              img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            .avatarTxt{
              position: absolute;
              width: 100%;
              height: 20px;
              bottom: -80px;
              text-align: center;
              font-size: 16px;
              line-height: 20px;
              font-family: Impact;
              font-weight: bolder;
            }
          }
        }
        .el-col.colRight{
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          .boxR{
            margin: 0 10px;
            div.titleR{
              height: 32px;
              line-height: 32px;
              font-size: 14px;
              color: #a8a6a6;
              border-bottom: 1px solid #DCDFE6;
              font-weight: bolder;
            }
            div.contR{
              margin: 0 20px;
              .el-form-item{
                margin: 5px 0!important;
                span.el-tag{
                  cursor: pointer;
                  margin: 0 5px;
                  color: #ffffff;
                }
                span{
                  font-weight: bolder;
                  color: #a8a6a6;
                }
                i{
                  color: #409eff;
                }
                .formData{
                  text-align: right;
                  // margin: 0 30px;
                  border-bottom: 1px solid #DCDFE6;
                }
              }
            }
          }
        }
      }
      .ruleForm{
        width: 500px;
        margin: 20px auto;
      }
      .perfect-form{
        margin: 15px;
        .el-form-item{
          margin-right: 30px;
        }
        .el-select {
          width: 100% !important;
        }
        .el-date-editor.el-input {
          width: 100% !important;
        }
        .el-cascader {
          width: 100% !important;
        }
      }
      .friendList{
        display: flex;
        height: 100%;
        margin: 15px 0;
        .leftBox{
          height: calc(100% - 200px);
          width: 240px;
          overflow-x: hidden;
          overflow-y: auto;
          box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
          border-radius: 5px;
          position: fixed;
          background-color: #e9e9e9;
          .friBox{
            padding: 0;
            width: 100%;
            list-style: none;
          }
          .friBox>li{
            position: relative;
            width: 100%;
            height: 60px;
            background-color: #e9e9e9;
            display: flex;
          }
          .friBox>li:hover{
            background-color: #d3d3d3;
          }
          .friBox>li.friActive{
            background-color: #a9a9a9;
          }
          .friBox>li>img{
            width: 50px;
            height: 50px;
            margin: 5px 10px;
            border-radius: 3px;
          }
          .friBox>li>.li-content{
            flex: 1;
            display: flex;
            justify-content: left;
            align-items: center;
            line-height: 60px;
            cursor: default;
          }
          .friBox>li>.mongolia{
            position: absolute;
            width: 200px;
            height: 80px;
            background-image: linear-gradient(to right, rgb(255,255,255,0), #ffffff);
          }
        }
        .rightBox{
          position: relative;
          margin-left: 260px;
          width: calc(100% - 260px);
          flex: 1;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          background-color: #f9f9f9;
          .friDetail{
            width: 70%;
            margin: 0 auto;
            margin-top: 30px;
            .friTitle{
              width: 100%;
              height: 70px;
              margin-bottom: 20px;
              .friTitle_left{
                float: left;
                width: 75%;
                height: 70px;
                h2{
                  width: 100%;
                  margin: 0;
                  line-height: 40px;
                  font-size: 20px;
                  color: #303133;
                }
                span{
                  width: 100%;
                  margin: 0;
                  line-height: 25px;
                  font-size: 14px;
                  color: #909399;
                }
              }
              .friTitle_right{
                float: left;
                width: 25%;
                height: 70px;
                img{
                  width: 60px;
                  height: 60px;
                  margin: 5px;
                  float: right;
                  border-radius: 3px;
                  cursor: pointer;
                }
              }
            }
            .friContent{
              margin: 20px 0;
              .el-form .el-form-item{
                margin: 0;
                .el-form-item__label{
                  font-size: 14px;
                  color: #909399;
                  text-align:justify;
                  text-align-last: justify;
                  line-height: 40px;
                }
                .friItem{
                  padding-left: 50px;
                  color: #303133;
                  input{
                    border: none;
                    padding: 0;
                    background-color: #f9f9f9;
                  }
                }
              }
            }
            .friBtn{
              position: relative;
              margin: 20px 0;
              width: 100%;
              button{
                position: absolute;
                width: 120px;
                text-align: center;
                left: 50%;
                margin-left: -60px;
              }
            }
          }
          .showHide{
            width: 100%;
            position: absolute;
            height: 80px;
            top: 50%;
            margin-top: -40px;
            h3{
              width: 100%;
              height: 50px;
              margin: 0;
              line-height: 50px;
              text-align: center;
              font-size: 26px;
              font-weight: bolder;
            }
            div{
              width: 100%;
              height: 30px;
              margin: 0;
              line-height: 30px;
              text-align: center;
              font-size: 20px;
              font-weight: bolder;
            }
          }
          .el-divider--horizontal{
            margin: 0px!important;
          }
        }
      }
    }
  }
  .scroll{
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .scroll::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(144, 147, 153, 0.3);
  }

  /*定义滚动条轨道 内阴影+圆角*/
  .scroll::-webkit-scrollbar-track {
    background-color: #ffffff;
  }

  /*定义滑块 内阴影+圆角*/
  .scroll::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(144, 147, 153, 0.3);
    transition: background-color 0.3s;
  }
}
</style>
