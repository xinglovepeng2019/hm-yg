<template>
  <view class="my-search-container" @click="searchBoxHandler">
     <!-- 使用view组件模拟input输入框的样式 -->
     <view class="my-search-box">
       <icon type="search" size="17"/>
       <text class="placeholder">搜索</text>
     </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    methods:{
      // 点击模拟的input输入框
      searchBoxHandler(){
         uni.navigateTo({
           url:'/subpkg/search/search'
         })
      }
    }
  }
</script>

<style lang="scss">
.my-search-container{
  background-color: #c00000;
  height: 50px;
  padding:0 10px;
  display: flex;
  align-items: center;
  .my-search-box{
    height: 36px;
    background-color: #fff;
    border-radius: 15px;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .placeholder{
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>