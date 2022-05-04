<template>
  <view>
    <!-- 使用自定义的搜索组件 -->
    <my-search></my-search>
    
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
       <scroll-view class="left-scroll-view" scroll-y  :style="{height: wh + 'px'}">
          <view :class="['left-scroll-view-item',i === active?'active':'']"
          v-for="(item,i) in cateList" :key="item.cat_id"
          @click="changeCate(i)">
           {{item.cat_name}}
          </view>
       </scroll-view>
       <!-- 右侧的滚动视图区域 -->
       <scroll-view class="right-scroll-view" scroll-y  scroll-y :style="{height: wh + 'px'}">
         <!-- 二级分类 -->
         <view class="cate-v2" 
         v-for="item in cateList2" :key="item.cat_id">
           <view class="cate-v2-title">
             /{{item.cat_name}}/
           </view>
           <!-- 三级分类 -->
           <view class="cate-v3-list">
             <navigator :url="'/subpkg/goods_list/goods_list?cid='+ite.cat_id" class="cate-v3-item"
             v-for="ite in item.children" :key="ite.cat_id">
               <image :src="ite.cat_icon" mode=""></image>
               <text>{{ite.cat_name}}</text>
             </navigator>
           </view>
         </view>
        
       </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 窗口的可用高度 = 屏幕高度  -navigatorBar高度 - tabBar高度
        wh:0,
        cateList:[],
        // 选中项的索引，默认第一项被选中
        active:0,
        // 二级分类数据
        cateList2:[]
      }
    },
    onLoad(){
       // 获取当前系统的信息
       var sysInfo = uni.getSystemInfoSync()
       // 为wh窗口可用高度动态赋值
       this.wh = sysInfo.windowHeight
       
       // 调用获取分类列表数据方法
       this.getCateList()
    },
    methods: {
    changeCate(i){ //点击左侧一级分类
       // 给active赋值下标
       this.active = i;
       //给二级分类赋值
       this.cateList2 = this.cateList[i].children
        
      },
      // 获取分类列表数据方法
     async getCateList(){
        var  {data:res} =  await uni.$http.get('categories');
        console.log(res)
        if(res.meta.status !==200) return uni.$showMst()
        // 请求成功
        this.cateList = res.message
        // 给二级分类赋默认值
        this.cateList2 = this.cateList[0].children
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-container{
  display: flex;
  .left-scroll-view{
    width:120px;
    .left-scroll-view-item{
      line-height: 60px;
      background-color: antiquewhite;
      text-align: center;
      font-size: 12px;
      &.active{
        background-color: #fff;
        position: relative;
      }
    }
  }
}

// 右侧
.right-scroll-view{
  .cate-v2{
     .cate-v2-title{
       font-size: 12px;
       font-weight: bold;
       text-align: center;
       padding:15px 0;
     }
  }
  // 三级
  .cate-v3-list{
    display: flex;
    flex-wrap: wrap;
    .cate-v3-item{
      width:33.3%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      image{
        width: 60px;
        height: 60px;
      }
      text{
        font-size: 12px;
      }
    }
  }
}
</style>
