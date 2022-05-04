<template>
  <view>
  <view class="search-box">
     <uni-search-bar 
     placeholder="搜索" 
     bgColor="#eee" 
     radius="100"
     @input="inputFn" />
  </view>
  <!-- 搜索历史 -->
  <view class="history-box" v-if="searchList.length<=0">
    <!-- 标题 -->
    <view class="history-title">
      <text>搜索历史</text>
      <uni-icons type="trash-filled" size="17"></uni-icons>
    </view>
    <!-- 列表区域 -->
    <view class="history-list">
       <uni-tag @click="gotoGoodsList(item)" v-for="(item,i) in historys" :key="i" :inverted="true" :text="item" type="primary" />
    </view>
  </view>
  <!-- 搜索列表 -->
  <view class="sugg-list" v-else>
    <view class="sugg-item" 
    v-for="item in searchList" 
    :key="item.goods_id"
    @click="gotoDetail(item.goods_id)"
    >
      <view class="goods_name" >
        {{item.goods_name}}
      </view>
      <uni-icons type="arrow-right"></uni-icons>
    </view>
  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        searchList:[],
        kw:""   ,//搜索的内容
        historyList:[]   //历史记录列表
      };
    },
    onLoad(){
      this.historyList = JSON.parse(uni.getStorageSync('kw')|| '[]')
    },
    computed:{
       historys(){
         // 把data中的historyList数组进行翻转
         return [...this.historyList].reverse()
       }
    },
    methods:{
      gotoGoodsList(item){  //点击搜索历史跳转到商品列表
        wx.navigateTo({
          url:"/subpkg/goods_list/goods_list?query="+item
        })
      },
      gotoDetail(goodsId){  //点击搜索列表跳转到商品详情
         uni.navigateTo({
           url:'/subpkg/goods_detail/goods_detail?goods_id=' + goodsId
         })
        
      },
       inputFn(val){
        //val是搜索的内容
        console.log(val)
        // 把搜索的内容赋值给data中的kw保存
        this.kw = val
        // 根据关键字  查询搜索列表
        this.getSearchList()
        
        // 3:查询到搜索列表后，条用添加搜索的关键词的方法  实现添加
        this.saveSearchHistory()
      },
      saveSearchHistory(){  //保存搜索关键词
        // this.historyList.push(this.kw)
        
        
        // 1 将historyList数组转化为Set对象
        var set = new Set(this.historyList)
        // 2 调用set对象的delete方法，移除对应的元素
        set.delete(this.kw)
        // 32 调用set对象的add方法，向set中添加元素
        set.add(this.kw)
        // set对象转换为数组
        this.historyList = [...set]
        
        // 将搜索历史记录存储到本地
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
     async getSearchList(){   //查询搜索列表
        // 1判断关键词是否为空
        if(this.kw.length<=0){
          this.searchList = []
          return
        };
        // 2 发起请求，获取搜索列表
        var {data:res} = await uni.$http.get('goods/qsearch',{query:this.kw});
        console.log(res.message,9)
        if(res.meta.status !==200) return uni.$showMsg()
        this.searchList = res.message
      }
    }
  }
</script>

<style lang="scss">
// 实现搜索框吸顶效果
.search-box{
  position: sticky;
  top: 0;
  z-index: 999;
}

.sugg-list{
  padding:0 5px;
  .sugg-item{
    font-size: 12px;
    padding:13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
  }
}

// 搜索历史
.history-box{
  padding: 0 5px;
  .history-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #efefef;
  }
  .history-list{
    display: flex;
   flex-wrap: wrap;
   .uni-tag{
     margin-top: 8px;
     margin-right: 8px;
   }
  }
}
</style>
