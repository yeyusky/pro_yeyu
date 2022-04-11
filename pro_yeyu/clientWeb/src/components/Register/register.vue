<template>
  <div id="containar">
    <div class="reg-box" v-loading="loading">
      <el-row class="reg-logo">
        <div class="logo"></div>
      </el-row>
      <el-form class="reg-form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="ruleForm.checkPassword"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="fullName">
          <el-input v-model="ruleForm.fullName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="adress">
          <el-cascader ref="cascader" clearable size="large" :options="options" v-model="ruleForm.selectedOptions" @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="个性描述" prop="userDesc">
          <el-input type="textarea" v-model="ruleForm.userDesc"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="userPic">
          <el-upload id="uplo" class="avatar-uploader" action="http://localhost:3066/pic/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.userPic" :src="ruleForm.userPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item id="btnBox">
          <el-button size="small" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
          <div id="back">老朋友？ <span @click="back()">请登录...</span></div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import aesCryptos from '../../utils/secret.js'
const loadingimg = require('../../assets/image/admin.png')
export default {
  name: 'register',
  data () {
    // 验证年龄
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      } else {
        callback()
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 1000)
    }
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
      ruleForm: {
        username: '',
        password: '',
        checkPassword: '',
        fullName: '',
        sex: '',
        age: '',
        userDesc: '',
        city: '',
        userPic: '',
        provinces: '',
        area: '',
        selectedOptions: []
      },
      loading: false,
      options: regionData,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur'
          }
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        date: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, validator: chevalidatePass, trigger: 'blur' }
        ],
        age: [{ required: true, validator: checkAge, trigger: 'blur' }]
      }
    }
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 地址省市区三级联动
    handleChange () {
      this.ruleForm.provinces = CodeToText[this.ruleForm.selectedOptions[0]]
      this.ruleForm.city = CodeToText[this.ruleForm.selectedOptions[1]]
      this.ruleForm.area = CodeToText[this.ruleForm.selectedOptions[2]]
    },
    // 提交操作
    submitForm (formName) {
      let that = this
      that.loading = true
      let formData = {}
      formData.username = this.ruleForm.username
      formData.password = aesCryptos.aesEncrypt(this.ruleForm.password)
      formData.fullName = this.ruleForm.fullName
      formData.sex = this.ruleForm.sex
      formData.age = this.ruleForm.age
      if (this.ruleForm.birthday !== '' && this.ruleForm.birthday !== undefined) {
        formData.birthday = this.formatDateTime(this.ruleForm.birthday)
      } else {
        formData.birthday = ''
      }
      if (this.ruleForm.userPic !== '') {
        formData.userPic = this.ruleForm.userPic
      } else {
        formData.userPic = loadingimg
      }
      formData.userDesc = this.ruleForm.userDesc
      if (this.ruleForm.provinces !== '') {
        formData.address =
          this.ruleForm.provinces +
          '/' +
          this.ruleForm.city +
          '/' +
          this.ruleForm.area
        formData.addressCode =
          this.ruleForm.selectedOptions[0] +
          '/' +
          this.ruleForm.selectedOptions[1] +
          '/' +
          this.ruleForm.selectedOptions[2]
      } else {
        formData.address = ''
        formData.addressCode = ''
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/users/register', formData)
            .then(function (result) {
              let res = result.data
              if (res.status === '0') {
                that.$axios
                  .post('/pic/uploadPic', {
                    avatar: res.data[0].userPic,
                    userId: res.data[0].username
                  })
                  .then(function (result) {
                    that.loading = false
                    that.$message({
                      message: '注册成功',
                      center: true
                    })
                    that.$router.push('/')
                    // let res = result.data;
                    // if (res.status == "0") {
                    //   that.$message({
                    //     message: res.msg,
                    //     center: true,
                    //   });
                    // } else {
                    //   that.$message({
                    //     message: res.msg,
                    //     center: true,
                    //   });
                    // }
                  })
                  .catch(function (error) {
                    console.log(error)
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
    // 重置数据操作
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.selectedOptions = []
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
          this.ruleForm.userPic = url
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
    // 返回登录操作
    back () {
      this.$router.push('/')
    },
    // 时间转换
    formatDateTime (date) {
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      return y + '-' + m + '-' + d
    }
  }
}
</script>

<style scoped lang="less">
#containar {
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .reg-box {
    width: 600px;
    padding: 20px 50px;
    border-radius: 5px;
    box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);
    .reg-logo {
      display: inline-block;
      width: 200px;
      height: 50px;
      left: 50%;
      margin-left: -100px;
      background: url("../Login/images/LOGO.png") no-repeat;
    }
    .reg-form {
      margin-top: 22px;
      .el-select {
        width: 100% !important;
      }
      .el-date-editor.el-input {
        width: 100% !important;
      }
      .el-cascader {
        width: 100% !important;
      }
      #uplo /deep/ .el-upload {
        border: 1px dashed #d9d9d9 !important;
        border-radius: 6px !important;
        cursor: pointer !important;
        position: relative !important;
        overflow: hidden !important;
      }
      #uplo /deep/ .el-upload:hover {
        border-color: #409eff !important;
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
      #btnBox {
        text-align: center;
        #back {
          display: inline-block;
          margin-left: 10px;
          color: rgba(136, 136, 136);
          span {
            cursor: pointer;
            color: #409eff;
          }
        }
      }
    }
  }
}
</style>
