<template>
  <div id="main">
    <el-row type="flex" style="margin:0!important" :gutter="20">
      <el-col :span="14" style="border-radius:5px;margin:10px;padding-top:10px;background-color:#e2f8e8;">
        <el-carousel :interval="6000" type="card" height="200px">
          <el-carousel-item v-for="(item, ind) in swiperList" :key="ind">
            <img :src="item.url" alt="">
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="10" style="border-radius:5px;margin:10px;padding:10px;background-color:#e2f8e8;">
        <el-row :gutter="12" style="height:50%;">
          <el-col :span="12" style="height:calc(100% - 10px);">
            <div class="itemEvery" style="background-color:#409EFF;">
              <h3><i class="el-icon-user"></i>用户数量</h3>
              <div class="cont">3</div>
            </div>
          </el-col>
          <el-col :span="12" style="height:calc(100% - 10px);">
            <div class="itemEvery" style="background-color:#E6A23C;">
              <h3><i class="el-icon-folder"></i>待办工作数</h3>
              <div class="cont">10</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="12" style="height:50%;">
          <el-col :span="12" style="height:calc(100% - 10px);">
           <div class="itemEvery" style="background-color:#67C23A;">
              <h3><i class="el-icon-folder-checked"></i>办结工作树</h3>
              <div class="cont">4</div>
            </div>
          </el-col>
          <el-col :span="12" style="height:calc(100% - 10px);">
           <div class="itemEvery" style="background-color:#F56C6C;">
              <h3><i class="el-icon-office-building"></i>团队人数</h3>
              <div class="cont">2</div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" style="margin:0!important" :gutter="20">
      <el-col :span="12" style="border-radius:5px;margin:10px;padding:10px;background-color:#e2f8e8;">
        <div id="myChart" style="width: 100%;height:300px;background-color:#ffffff;border-radius:4px"></div>
      </el-col>
      <el-col :span="12" style="border-radius:5px;margin:10px;padding:10px;background-color:#e2f8e8;">
      </el-col>
    </el-row>
  </div>
</template>

<script>
const Carouselimg1 = require('../../assets/image/swiper1.png')
const Carouselimg2 = require('../../assets/image/swiper2.png')
const Carouselimg3 = require('../../assets/image/swiper3.png')
export default {
  name: 'shouye',
  data () {
    return {
      swiperList: [{
        url: Carouselimg1
      }, {
        url: Carouselimg2
      }, {
        url: Carouselimg3
      }]
    }
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '一周的访问量',
          textStyle: {
            color: '#67C23A',
            fontSize: 16
          },
          padding: 5,
          left: '10%',
          top: '3%'
        },
        tooltip: {
          show: true, // 是否显示
          backgroundColor: 'rgba(255,255,255,0.8)', // 设置背景图片 rgba格式
          trigger: 'axis', // 触发类型  'item'图形触发：散点图，饼图等无类目轴的图表中使用； 'axis'坐标轴触发；'none'：什么都不触发。
          axisPointer: { // 坐标轴指示器配置项。
            type: 'none', // 'line' 直线指示器  'shadow' 阴影指示器  'none' 无指示器  'cross' 十字准星指示器。
            snap: true // 坐标轴指示器是否自动吸附到点上
          },
          formatter: function (a) {}
        },
        color: ['#DF6452', '#1E9493', '#FF9845'],
        legend: {
          data: []
        },
        grid: {
          top: '15%',
          left: '5%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: true, // 是否显示坐标轴轴线
            lineStyle: {
              color: '#63646F', // 坐标轴线线的颜色
              width: '1', // 坐标轴线线宽
              type: 'solid' // 坐标轴线线的类型（'solid'，实线类型；'dashed'，虚线类型；'dotted',点状类型）
            }
          },
          axisLabel: {
            textStyle: {
              color: '#409EFF'
            }
          },
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          max: 80,
          min: 0,
          type: 'value',
          minInterval: 20,
          interval: 20,
          axisLine: { // 去掉x/y轴竖线
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#409EFF'
            }
          }
        },
        series: [
          {
            name: '天津试验室',
            type: 'line',
            animation: false,
            symbolSize: 8, // 拐点大小
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#DF6452',
                borderColor: '#ffffff', // 拐点边框颜色
                borderWidth: 2 // 拐点边框大小
              }
            },
            lineStyle: {
              normal: {
                color: '#DF6452' // 线条颜色
              }
            },
            emphasis: {
              itemStyle: {
                focus: 'series',
                shadowBlur: 5, // 图形的阴影大小
                shadowColor: '#cccccc' // 图形的阴影颜色
              }
            },
            data: [10, 76, 61, 18, 66, 28, 64]
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="less">
.el-carousel__item img {
  height: 100%;
  width: 100%;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.itemEvery{
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  h3{
    color: #ffffff;
    padding-left: 15px;
    line-height: 30px;
    font-size: 14px;
    margin: 0;
    border-bottom: 1px solid #ffffff;
    i{
      margin-right:10px;
      font-size: 18px;
      font-weight: bolder;
    }
  }
  div.cont{
    font-size: 22px;
    line-height: 60px;
    padding: 0 20px;
    color: #ffffff;
    text-align: center;
    font-weight: bolder;
  }
}
</style>
