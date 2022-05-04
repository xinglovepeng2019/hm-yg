<template>
  <view class="container">
    <swiper  :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item,i) in bannerList" :key="i">
        <view class="swiper-item">
          <image :src="item.image_src"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view 
      @click="gotoCate(i)"
      class="nav-item" 
      v-for="(item,i) in navList" 
      :key="i">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    
    <!-- 楼层 -->
    <view class="floor-list">
      <!-- 楼层每一项 -->
       <view class="floor-item" v-for="(item,i) in floorList" :key="i">
         <!-- 楼层标题 -->
         <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
          <view class="floor-img-box">
             <!-- 左侧大图片 -->
             <navigator :url="item.product_list[0].url" class="left-img-box">
                <image 
                :src="item.product_list[0].image_src" 
                :style="{width:item.product_list[0].image_width + 'rpx'}"
                ></image>
             </navigator>
             <!-- 右侧4个小图片 -->
             <view class="right-img-box">
                <navigator class="right-img-item"
                v-for="(item2,i2) in item.product_list" :key="i2"  v-if="i2 !==0"
                :url="item2.url"
                >
                  <image
                  :src="item2.image_src" 
                  :style="{width:item2.image_width + 'rpx'}"
                  mode="widthFix"
                  ></image>
                </navigator>
             </view>
          </view>
       </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 1轮播图数据列表
        bannerList: [],
        // 分类导航数据
        navList:[],
        // 楼层数据
        floorList:[]
      }
    },
    onLoad() {
      this.getBanners()
      // 调用
      this.getNavList()
      // 调用获取楼层列表方法
      this.getFloorList()
    },
    methods: {
      // 定义获取楼层列表数据方法
      async getFloorList(){
         var {data:res} = await uni.$http.get('home/floordata')
         
         if(res.meta.status != 200) return uni.$showMsg()
         // 通过双层for循环  处理url地址
          res.message.forEach(floor=>{
             floor.product_list.forEach(item=>{
               console.log(item.navigator_url.split("?")[1],8)
               item.url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split("?")[1]
             })
          })
         console.log(res.message,"floor")
         
         this.floorList = res.message
      },
      gotoCate(i){
         // 点击分类实现跳转
         if(i===0){
           uni.switchTab({
             url:'/pages/cate/cate'
           })
         }
      },
      // 获取分类导航数据
      async getNavList(){
        var {data:res} = await uni.$http.get('home/catitems')
        console.log(res)
        if(res.meta.status !=200) return uni.$showMsg()
        this.navList = res.message
      },
      // 2 获取轮播图数据方法
      async getBanners() {
        var {
          data: res
        } = await uni.$http.get('home/swiperdata');
        console.log(res)
        if (res.meta.status != 200) return uni.$showMsg()
        // 3请求成功  为data中的数据赋值
        this.bannerList = res.message
      },
      
    }
  }
</script>

<style lang="scss">
swiper{
  height: 330rpx;
  .swiper-item{
    height: 100%;
    image{
      width: 100%;
      height: 100%;
    }
  }
}
// 分类导航
.nav-list{
  display: flex;
  justify-content: space-around;
  margin:15px 0;
  .nav-img{
    width:128rpx;
    height: 140rpx;
  }
}

// 楼层标题
.floor-title{
  height: 60rpx;
  width: 100%;
  display: flex;
}

.floor-img-box{
  display: flex;
  padding-left: 10rpx;
}
// 右侧4个小图片
.right-img-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
