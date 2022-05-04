<template>
  <view class="goods-item">
     <view class="goods-item-left">
       <radio color="#c00000" :checked="goods.ischeck" @click="radioClickHandler"></radio>
       <image :src="goods.pic" class="goods-pic" mode=""></image>
     </view>
     <!-- 右侧 -->
     <view class="goods-item-right">
       <view class="goods-name">
         {{goods.name}}
       </view>
       <view class="goods-info-box">
         <!-- 价格 -->
         <view class="goods-price">
           ￥{{goods.price}}
         </view>
         <!-- 数量 -->
         <uni-number-box :min="1"  :value="goods.num" @change="numChange" />
       </view>
     </view>
  </view>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name:"my-goods",
    // props属性，接收父组件传递过来的数据
    props:{
      // 商品列表数据
      goods:{
        type:Object,   //数据类型
        default:{}    //默认值
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      ...mapMutations(['updateIscheck','updateNum']),
      numChange(val){  //数量改变val
        console.log(val)
        // 调用mutations的方法  更改数量
        this.updateNum({
          id:this.goods.id,
          num:val
        })
      },
      radioClickHandler(){  //点击更改状态
      // 调用mutations的方法  实现状态更改
        this.updateIscheck({id:this.goods.id,ischeck:!this.goods.ischeck})
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
  // 让goods-item占满整个屏幕的宽度
  width:750rpx;
  // 盒模型设置卫border-box
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.goods-item-left{
  margin-right: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .goods-pic{
    width: 100px;
    height: 100px;
    display: block;
  }
}

// 右侧
.goods-item-right{
  display: flex;
  flex:1;
  flex-direction: column;
  justify-content: space-between;
  .goods-name{
    font-size: 13px;
  }
  .goods-info-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goods-price{
      font-size: 16px;
      color:#c00000;
    }
  }
  
}
</style>