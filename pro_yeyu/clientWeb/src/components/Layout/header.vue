<template>
  <div id="header-main">
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!this.$store.state.collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="collapse-btn" @click="refreshClick">
      <i class="el-icon-refresh"></i>
    </div>
    <div class="btnShadow">
      <div class="right-btn" @click="fullScreen">
        <i v-if="!this.$store.state.isFullscreen" class="el-icon-full-screen"></i>
        <i v-else class="el-icon-rank"></i>
      </div>
      <div class="right-btn">
        <i class="el-icon-bell"></i>
      </div>
      <div class="right-btn" @click="loginOut">
        <i class="el-icon-switch-button"></i>
      </div>
      <div class="avabox">
        <div class="avatars">
          <img :src="url" alt="" class="avatarImg">
        </div>
        <span>Hello {{fullName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headers',
  data () {
    return {
      url: this.$store.state.userMsg[0].userPic,
      fullName: this.$store.state.userMsg[0].fullName
    }
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created () {
    let that = this
    window.onresize = function () {
      if (!that.checkFull()) {
        // 退出全屏后要执行的动作
        that.$store.state.isFullscreen = false
      }
    }
  },
  mounted () {},
  methods: {
    collapseChage () {
      let collapses
      if (this.$store.state.collapse) {
        collapses = false
      } else {
        collapses = true
      }
      this.$store.commit('handleCollapse', collapses)
    },
    // 全屏效果
    checkFull () {
      // 判断浏览器是否处于全屏状态 （需要考虑兼容问题）
      // 火狐浏览器
      var isFull =
        document.mozFullScreen ||
        document.fullScreen ||
        // 谷歌浏览器及Webkit内核浏览器
        document.webkitIsFullScreen ||
        document.webkitRequestFullScreen ||
        document.mozRequestFullScreen ||
        document.msFullscreenEnabled
      if (isFull === undefined) {
        isFull = false
      }
      return isFull
    },
    fullScreen () {
      let element = document.documentElement
      if (this.$store.state.isFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.$store.state.isFullscreen = !this.$store.state.isFullscreen
    },
    // 退出
    loginOut () {
      this.$router.push('/')
    },
    // 刷新操作
    refreshClick () {
      this.$router.go(0)
    }
  }
}
</script>

<style scoped lang="less">
#header-main {
  height: 50px;
  width: 100%;
  .collapse-btn {
    font-size: 24px;
    float: left;
    padding: 0 10px 0 20px;
    cursor: pointer;
    line-height: 50px;
    color: #ffffff;
  }
  .btnShadow {
    position: absolute;
    padding: 5px 0;
    background-color: #ffffff;
    right: 35px;
    top: 2px;
    border-radius: 8px;
    box-shadow: 0 10px 20px 0 rgb(32 33 36 / 28%);
    .right-btn {
      font-size: 24px;
      float: left;
      padding: 0 10px;
      cursor: pointer;
      line-height: 50px;
      color: #40A0FA;
    }
    .avabox {
      float: left;
      margin-right: 10px;
      line-height: 50px;
      .avatars {
        cursor: pointer;
        float: left;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        border: 2px solid #40A0FA;
        padding: 2px;
        background-color: #ffffff;
        margin-right: 10px;
        .avatarImg{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      span {
        font-family: Impact;
        color: #40A0FA;
      }
    }
  }
}
</style>
