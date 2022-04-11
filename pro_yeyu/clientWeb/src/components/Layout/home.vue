<template>
  <div id="mainCon">
    <div class="shadows">
      <el-container>
        <div class="logoBox">
          <div v-if="!this.$store.state.collapse" class="logo"></div>
          <div v-else class="logos"></div>
        </div>
        <sidebar></sidebar>
        <el-container>
          <el-header class="head">
            <headers></headers>
          </el-header>
          <tags></tags>
          <el-main class="main">
            <keep-alive>
              <!-- 这个router-view里的内容未来要切换，所以给他加上keep-alive -->
              <router-view :key="$router.fullPath"></router-view>
            </keep-alive>
          </el-main>
          <el-footer class="foot">
            <footers></footers>
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import sidebar from '../Layout/sideBar.vue'
import headers from '../Layout/header.vue'
import footers from '../Layout/footer.vue'
import tags from '../Layout/tags.vue'
export default {
  name: 'home',
  data () {
    return {}
  },
  components: { sidebar, headers, footers, tags },
  props: {},
  computed: {},
  watch: {},
  created () {
    if (this.$route.fullPath === '/main') {
      this.$router.push('/main/index')
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style lang='css'>
@import "../../assets/css/main.css";
</style>
<style scoped lang="less">
#mainCon {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 10px 8px;
  background-color: rgb(226, 248, 232);
  .shadows {
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 25px;
    overflow: hidden;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);
    background-color: rgb(244, 245, 247);
    .logoBox {
      border-top-left-radius: 25px;
      position: absolute;
      padding: 0 20px;
      min-width: 200px;
      height: 49px;
      background-color: #40A0FA;
      .logo {
        height: 50px;
        background: url("../../components/Login/images/sparrows.png") no-repeat;
      }
      .logos{
        width: 50px;
        height: 50px;
        margin-left: 14px;
        background: url("../../components/Login/images/LOGOS.png") no-repeat;
      }
    }
    .head {
      height: 50px !important;
      border-bottom: 1px solid #fff;
      background-color: #40A0FA;
      z-index: 10;
    }
    .main {
      padding: 0;
      margin: 5px;
      background-color: #ffffff;
    }
    // .main::-webkit-scrollbar {
    //   width: 0;
    // }
    .main::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: rgba(144, 147, 153, 0.3);
    }

    /*定义滚动条轨道 内阴影+圆角*/
    .main::-webkit-scrollbar-track {
      background-color: #ffffff;
    }

    /*定义滑块 内阴影+圆角*/
    .main::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgba(144, 147, 153, 0.3);
      transition: background-color 0.3s;
    }
    .foot {
      height: 40px !important;
      background-color: #ffffff;
    }
  }
}
</style>
