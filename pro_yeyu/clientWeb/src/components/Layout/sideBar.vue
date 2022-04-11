<template>
  <el-menu :default-active="$route.fullPath" unique-opened @open="handleOpen" @close="handleClose" router :collapse="this.$store.state.collapse" text-color="#fff" active-text-color="#ffd04b" class="sidebar">
    <template v-for="item in menuList">
      <template v-if="item.children">
        <el-submenu :index="item.path" :key="item.path">
          <template #title>
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.children">
            <el-submenu v-if="subItem.children" :index="subItem.path" :key="subItem.path">
              <template #title>{{ subItem.title }}</template>
              <el-menu-item v-for="(threeItem, i) in subItem.children" @click="clickMenu(threeItem)" :key="i" :index="threeItem.path">
                {{ threeItem.title }}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="subItem.path" @click="clickMenu(subItem)" :key="subItem.path">{{ subItem.title }}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.path" @click="clickMenu(item)" :key="item.path">
          <i :class="item.icon"></i>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      menuList: []
    }
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created () {
    this.getMenu()
  },
  mounted () {},
  methods: {
    clickMenu (val) {
      this.$store.commit('pushtags', val)
    },
    // 获取左侧菜单数据
    getMenu () {
      const that = this
      this.$axios
        .post('/menu/getSideData')
        .then(function (result) {
          let res = result.data
          if (res.status === '0') {
            that.menuList = res.data
          } else {
            console.log('查询失败')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath);
    }
  }
}
</script>

<style scoped lang="less">
.sidebar {
  background-color: #40A0FA;
  padding: 20px 0 20px 20px;
  overflow-x: hidden;
  overflow-y: scroll;
  border: none;
  margin-top: 50px;
  // li i {
  //   color: #ffffff;
  // }
  // /deep/ li i.el-submenu__icon-arrow {
  //   color: #ffffff;
  //   font-size: 18px;
  //   font-weight: bolder;
  //   background-color: transparent !important;
  // }
  // /deep/ .el-submenu__title {
  //   height: 50px;
  //   border-bottom-left-radius: 30px;
  //   border-top-left-radius: 30px;
  // }
  // /deep/ .el-submenu__title:hover {
  //   background-color: #ffffff;
  //   font-weight: bolder !important;
  //   color: rgb(11, 64, 238) !important;
  // }
  // /deep/ .el-submenu__title:hover i {
  //   font-weight: bolder !important;
  //   color: rgb(11, 64, 238) !important;
  // }
  // /deep/ .el-submenu__title:hover i.el-submenu__icon-arrow {
  //   background-color: #ffffff;
  //   font-weight: bolder !important;
  //   color: rgb(11, 64, 238) !important;
  // }
  // /deep/ .el-menu-item {
  //   height: 50px;
  //   border-bottom-left-radius: 30px;
  //   border-top-left-radius: 30px;
  // }
  // /deep/ .el-menu-item:hover {
  //   background-color: #ffffff;
  //   font-weight: bolder !important;
  //   color: rgb(11, 64, 238) !important;
  // }
  // /deep/ .el-menu-item:hover i {
  //   font-weight: bolder !important;
  //   color: rgb(11, 64, 238) !important;
  // }
  // /deep/ .el-menu-item:hover i.el-submenu__icon-arrow {
  //   background-color: #ffffff;
  //   font-weight: bolder !important;
  //   color: rgb(11, 64, 238) !important;
  // }
  // /deep/ .is-active {
  //   background-color: #ffffff;
  //   font-weight: bolder !important;
  //   color: rgb(11, 64, 238) !important;
  // }
  // /deep/ .is-active i {
  //   font-weight: bolder !important;
  //   color: rgb(11, 64, 238) !important;
  // }
}
/deep/ .el-menu {
  background-color: #40A0FA;
}
.sidebar:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
/deep/ .el-menu--vertical {
  background-color: rgb(11, 15, 26) !important;
}
</style>
