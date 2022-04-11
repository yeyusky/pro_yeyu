<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  created () {
    //   在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('state')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('state'))
        )
      )
    }

    //   页面刷新时将state数据存储到sessionStorage中
    // var arr = [
    //   {
    //     path: "/main/index",
    //     title: "首页",
    //   },
    // ];
    window.addEventListener('beforeunload', () => {
      // let tabs = JSON.stringify(this.$store.state);
      // for (let item of this.$store.state.tagsList) {
      //   if ((item.path === this.$route.fullPath)) {
      //     if(this.$route.fullPath === '/main/index'){

      //     }else{
      //       arr.push(item);
      //     }
      //   }
      // }
      // this.$store.state.tagsList = arr;
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    })
    window.addEventListener(
      'popstate',
      (e) => {
        let that = this
        if (that.$route.fullPath === '/main' || that.$route.fullPath === '/') {
          this.$router.push('/')
          let arr = [
            {
              path: '/main/index',
              title: '首页'
            }
          ]
          this.$store.state.tagsList = arr
          sessionStorage.setItem('state', JSON.stringify(this.$store.state))
        }
      },
      false
    )
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
