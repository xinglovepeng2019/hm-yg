<template>
  <view>
   <view class="goods_list">
     <view class="goods-item" v-for="(item,i) in goodsList" :key="i"  @click="gotoDetail(item)">
       <!-- 商品左侧信息 -->
       <view class="goods-item-left">
         <image :src="item.goods_small_logo" mode=""></image>
       </view>
       <!-- 商品右侧信息 -->
       <view class="goods-item-right">
         <view class="goods-name">
           {{item.goods_name}}
         </view>
         <view class="goods-info">
           <view class="goods-price">
            {{item.goods_price}}
           </view>
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
        // 1 data中定义请求参数对象
          queryobj:{
            query:"",
            cid:"",
            pagenum:1,   //当前页
            pagesize:10   //每页条数
          },
          // 商品列表数据
          goodsList:[],
          // 总数量  用来实现分页
          total:0
      }
    },
    onLoad(options){
      console.log(options,"options")
      // 获取传递的参数赋值给data中对象
      this.queryobj.query = options.query || "";
      
      // 接收分类id
      this.queryobj.cid = options.cid || "";
      console.log(this.queryobj)
      // 调用获取商品列表的数据
      this.getGoodsList()
    },
    // 下拉刷新的事件
    onPullDownRefresh(){
       // 数据初始化
       this.queryobj.pagenum = 1;
       this.queryobj.total = 0;
       this.goodsList = [];
       // 重新请求数据
       this.getGoodsList()
       // 关闭
       uni.stopPullDownRefresh()
    },
    // 上拉触底事件
    onReachBottom(){
      //判断数据是否加载完毕
      // 当前的页码值 *每页显示的条数  >= 总条数
      if(this.queryobj.pagenum * this.queryobj.pagesize >= this.total) return uni.$showMsg("数据加载完毕")
       // 让页码自增1
       this.queryobj.pagenum += 1;
       // 重新获取数据
       this.getGoodsList()
    },
    methods: {
      gotoDetail(item){  //商品列表跳转到商品详情
        console.log(item.goods_id,"item");
        uni.navigateTo({
          url:"/subpkg/goods_detail/goods_detail?goods_id="+item.goods_id
        })
      },
      // 定义获取商品列表的数据
     async getGoodsList(){
        var {data:res}= await uni.$http.get('goods/search',this.queryobj)
        console.log(res)
        if(res.meta.status !==200) return uni.$showMsg()
        // 数据赋值
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total = res.message.total;
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
  display: flex;
  padding:10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left{
    margin-right: 5px;
    image{
      width: 100px;
      height: 100px;
      display: block;
    }
  }
}

.goods-price{
  color: #c00000;
}
</style>
