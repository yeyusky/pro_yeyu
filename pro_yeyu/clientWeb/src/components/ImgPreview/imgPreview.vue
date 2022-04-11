<template>
  <el-dialog :visible.sync="isShowImageDialog" @closed="clearImg">
    <el-carousel indicator-position="outside" height="600px">
      <el-carousel-item>
        <img :src="src" style="max-width: 100%;max-height: 100%;display: block; margin: 0 auto;" />
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
</template>

<script>
export default {
  name: "imgPreview",
  data() {
    return {
      src: "",
      isShowImageDialog: false,
    };
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    clearImg() {},
  },
};
</script>

<style scoped lang="less">
/deep/ .el-dialog {
  position: relative;
  left: 50%;
  height: 400px;
  width: 800px;
  top: 50%;
  margin-left: -400px;
  margin-top: -200px!important;
  background-color: red;
}
</style>
