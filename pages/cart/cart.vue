<template>
  <view>
    <!-- 标题 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 列表区域 -->
    <uni-swipe-action>
      <block v-for="(goods,i) in carts" :key="i">
        <!-- uni-swipe-action-item提供滑动操作的效果，
         通过options来指定操作按钮的配置信息-->
        <uni-swipe-action-item 
        :right-options="options" 
        @click="swipeActionHandler(goods)">
           <my-goods :goods="goods"></my-goods>
        </uni-swipe-action-item>
        
      </block>
    </uni-swipe-action>
  </view>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        options: [{
          text: '删除',  //显示的文本内容
          style: {
            backgroundColor: '#c00000'  //按钮的背景颜色
          }
        }],
      }
    },
    methods:{
      swipeActionHandler(goods){
        console.log(goods)
      }
    },
    computed: {
      ...mapState(['carts'])
    },
  }
</script>

<style lang="scss">
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }
</style>
