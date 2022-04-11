<template>
  <div id="container-login" :class="bgs | classFilters">
    <div class="login-box">
      <el-row class="login-logo">
        <div class="logo"></div>
      </el-row>
      <el-form :model="user" class="login-form">
        <el-form-item>
          <el-input prefix-icon="el-icon-user" v-model="user.username" class="login-input" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" prefix-icon="el-icon-lock" v-model="user.password" class="login-input" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" class="login-btn" @click="onSubmit()">登录</el-button>
        </el-form-item>
        <el-form-item>
          <div class="regBox">还未注册？ <span @click="register()">立即注册</span></div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import aesCryptos from '../../utils/secret.js'
export default {
  name: 'name',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      bgs: 0, // 控制显示类名 背景图
      timer: ''
    }
  },
  components: {
  },
  props: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // 初始化页面完成后 调用方法
    this.myClass()
  },
  methods: {
    onSubmit () {
      const $router = this.$router
      let that = this
      that.$axios
        .post('/users/login', {
          username: that.user.username,
          password: aesCryptos.aesEncrypt(that.user.password)
        })
        .then(function (result) {
          let res = result.data
          that.$store.state.userMsg = res.data
          if (res.status === '0') {
            that.$message({
              message: res.msg,
              center: true
            })
            $router.replace('/main')
            if (
              that.$route.fullPath === '/main' ||
              that.$route.fullPath === '/'
            ) {
              let arr = [
                {
                  path: '/main/index',
                  title: '首页'
                }
              ]
              that.$store.state.tagsList = arr
              sessionStorage.setItem(
                'state',
                JSON.stringify(that.$store.state)
              )
            }
            let isFull =
              document.mozFullScreen ||
              document.fullScreen ||
              // 谷歌浏览器及Webkit内核浏览器
              document.webkitIsFullScreen ||
              document.webkitRequestFullScreen ||
              document.mozRequestFullScreen ||
              document.msFullscreenEnabled
            if (isFull === undefined) {
              that.$store.state.isFullscreen = false
            } else {
              that.$store.state.isFullscreen = true
            }
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
    // 定时改变bgs的值 控制显示那个类名 方法
    myClass () {
      setInterval(() => {
        let ind = this.bgs
        if (ind === 0) {
          this.bgs = 1
        } else if (ind === 1) {
          this.bgs = 2
        } else if (ind === 2) {
          this.bgs = 3
        } else if (ind === 3) {
          this.bgs = 0
        }
      }, 10000)
    },
    // 注册
    register () {
      this.$router.push('/register')
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  filters: {
    // 过滤器返回哪个类名展示哪个图片
    classFilters (ind) {
      if (ind === 0) {
        return 'login_bgo'
      } else if (ind === 1) {
        return 'login_bgt'
      } else if (ind === 2) {
        return 'login_bgs'
      } else if (ind === 3) {
        return 'login_bgf'
      }
    }
  }
}
</script>

<style scoped lang="less">
.login_bgo {
  background: url("./images/login_bgo.png") no-repeat;
  -webkit-transition: all 1s;
  -moz-transition: all 1s;
  -ms-transition: all 1s;
  -o-transition: all 1s;
  transition: all 1s;
  opacity: 1;
}
.login_bgt {
  background: url("./images/login_bgt.png") no-repeat;
  -webkit-transition: all 1s;
  -moz-transition: all 1s;
  -ms-transition: all 1s;
  -o-transition: all 1s;
  transition: all 1s;
  opacity: 1;
}
.login_bgs {
  background: url("./images/login_bgs.png") no-repeat;
  -webkit-transition: all 1s;
  -moz-transition: all 1s;
  -ms-transition: all 1s;
  -o-transition: all 1s;
  transition: all 1s;
  opacity: 1;
}
.login_bgf {
  background: url("./images/login_bgf.png") no-repeat;
  -webkit-transition: all 1s;
  -moz-transition: all 1s;
  -ms-transition: all 1s;
  -o-transition: all 1s;
  transition: all 1s;
  opacity: 1;
}
#container-login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-size: cover;
  .login-box {
    width: 300px;
    padding: 20px 50px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 5px #cccccc;
    .login-logo {
      display: inline-block;
      width: 200px;
      height: 50px;
      left: 50%;
      margin-left: -100px;
      background: url("./images/LOGO.png") no-repeat;
    }
    .login-form {
      margin-top: 22px;
      .login-btn {
        width: 100%;
      }
      .regBox{
        text-align: center;
        span{
          color: #409EFF;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
