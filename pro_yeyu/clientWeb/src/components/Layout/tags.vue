<template>
  <div class="tags">
    <div class="left_btn">
      <i class="el-icon-d-arrow-left"></i>
    </div>
    <ul>
      <li class="tags-li" v-for="(item,index) in this.$store.state.tagsList" :class="isActive(item.path)" :key="item.path">
        <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
        <span class="tags-li-icon" v-if="item.title != '首页'" @click="closeTags(index)">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>
    <div class="right_btn">
      <el-dropdown @command="handleTags">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="other">关闭其他页签</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有页签</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="right_btn">
      <i class="el-icon-d-arrow-right"></i>
    </div>

  </div>
</template>

<script>
export default {
  name: 'name',
  data () {
    return {}
  },
  components: {},
  props: {},
  computed: {
    isActive () {
      return function (path) {
        return path === this.$route.fullPath ? 'active' : ''
      }
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 关闭单个页签
    closeTags (ind) {
      this.$store.commit('delTagsItem', { ind })
      const newItem = this.$store.state.tagsList[ind] ? this.$store.state.tagsList[ind] : this.$store.state.tagsList[ind - 1]
      if (newItem) {
        this.$router.push(newItem.path)
      }
    },
    // 下拉菜单事件监听
    handleTags (command) {
      if (command === 'all') {
        this.$store.commit('clearTags')
        this.$router.push('/main/index')
      } else if (command === 'other') {
        let data = []
        for (let i = 0; i < this.$store.state.tagsList.length; i++) {
          if (this.$store.state.tagsList[i].path === this.$route.fullPath) {
            data.push(this.$store.state.tagsList[i])
          }
        }
        this.$store.commit('closeTagsOther', data[0])
      }
    }
  }
}
</script>

<style scoped lang="less">
.tags {
  background-color: #ffffff;
  height: 42px;
  margin-top: 5px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
  .left_btn {
    cursor: pointer;
    height: 42px;
    width: 42px;
    text-align: center;
    line-height: 42px;
    color: #000000;
    font-size: 22px;
    font-weight: bolder;
    float: left;
  }
  .right_btn {
    text-align: center;
    cursor: pointer;
    height: 42px;
    width: 42px;
    line-height: 42px;
    color: #000000;
    font-size: 22px;
    float: right;
    font-weight: bolder;
    /deep/ .el-dropdown {
      height: 42px;
      width: 42px;
      line-height: 42px;
      span {
        cursor: pointer;
        display: block;
        height: 42px;
        line-height: 42px;
        width: 100%;
        color: #000000;
        font-size: 22px;
        text-align: center;
      }
    }
  }
  ul {
    float: left;
    height: 42px;
    padding: 0;
    margin: 0;
    li.tags-li {
      cursor: pointer !important;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      padding: 0 10px;
      list-style: none;
      border-bottom: 2px solid #ffffff;
      transition: all 0.8s;
      a {
        display: inline-block;
        font-size: 14px;
        color: #000000;
        font-weight: bolder;
        text-decoration: none;
      }
      i.el-icon-close {
        padding: 2px;
        font-size: 10px;
        font-weight: bolder;
        color: #000000;
      }
    }
    li.active {
      border-bottom: 2px solid #40A0FA;
      a {
        color: #40A0FA;
      }
      i.el-icon-close {
        color: #40A0FA;
      }
      i.el-icon-close:hover {
        border-radius: 50%;
        background-color: red;
        color: #ffffff;
        transition: all 0.2s;
      }
    }
    li:hover {
      border-bottom: 2px solid #40A0FA;
      a {
        color: #40A0FA;
      }
      i.el-icon-close {
        color: #40A0FA;
      }
      i.el-icon-close:hover {
        border-radius: 50%;
        background-color: red;
        color: #ffffff;
        transition: all 0.2s;
      }
    }
  }
}
</style>
