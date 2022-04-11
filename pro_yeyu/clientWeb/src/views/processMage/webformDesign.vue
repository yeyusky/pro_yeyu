<template>
  <div id="webFormCon">
    <el-row>
      <el-col :span="6">
        <div class="grid-container">
          <div class="grid-item">
            <i class="el-icon-edit"></i>
            <div>单行文本</div>
          </div>
          <div class="grid-item">
            <i class="el-icon-edit"></i>
            <div>多行文本</div>
          </div>
          <div class="grid-item">
            <i class="el-icon-edit"></i>
            <div>下拉框</div>
          </div>
          <div class="grid-item">
            <i class="el-icon-edit"></i>
            <div>单项选择</div>
          </div>
          <div class="grid-item">
            <i class="el-icon-edit"></i>
            <div>单行文本</div>
          </div>
          <div class="grid-item">
            <i class="el-icon-edit"></i>
            <div>单行文本</div>
          </div>
          <div class="grid-item">
            <i class="el-icon-edit"></i>
            <div>单行文本</div>
          </div>
          <div class="grid-item">
            <i class="el-icon-edit"></i>
            <div>单行文本</div>
          </div>
        </div>
      </el-col>
      <el-col :span="14"><div class="grid-content bg-purple">333</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">4444</div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'webformDesign',
  data () {
    return {}
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
#webFormCon{
  height: 100%;
  .el-row{
    height: 100%;
    .grid-container {
      display: grid;
      grid-column-gap: 0px;
      grid-template-columns: auto auto auto;
      padding: 0px;
      .grid-item {
        border: 2px solid rgba(241, 236, 236, 0.8);
        font-size: 14px;
        padding: 20px 0;
        text-align: center;
        margin:0px -2px -2px 0px ;
        cursor: pointer;
        font-weight: bolder;
        i{
          color: rgb(194, 190, 190);
        }
        div{
          margin-top: 5px;
          color:#000000
        }
      }
    }
  }
}
</style>
