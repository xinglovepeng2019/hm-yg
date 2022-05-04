// 导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 将vuex安装卫vue的插件
Vue.use(Vuex)

// 创建store的实例对象
var store = new Vuex.Store({
  state:{
    // carts:[]  //存放购物车数据
    carts:JSON.parse(uni.getStorageSync('carts')|| '[]')
  },
   mutations:{
     // 将数据持久化存储到本地
     saveToStorage(state){
        uni.setStorageSync('carts',JSON.stringify(state.carts))
     },
     updateNum(state,goods){
       // 1根据id查询数据中对应商品的信息对象
       var findResult = state.carts.find(item=>{
         return item.id === goods.id
       })
       if(findResult){
         findResult.num = goods.num
         // 存储到本地
         this.commit('saveToStorage')
       }
     },
     updateIscheck(state,goods){
       // 1根据id查询数据中对应商品的信息对象
       var findResult = state.carts.find(item=>{
         return item.id === goods.id
       })
       // console.log(findResult,"findResult")
     // 有对应的商品信息
       if(findResult){
          findResult.ischeck = goods.ischeck
          // 存储到本地
          this.commit('saveToStorage')
       }
       
    
     },
     addToCart(state,goods){
       // console.log(goods)
       var index = state.carts.findIndex(item=>{
         return item.id===goods.id
       })
       if(index===-1){
         state.carts.push(goods)
       }else{
         state.carts[index].num++
       }
       // console.log("goods",state.carts)
       // 存储到本地
       this.commit('saveToStorage')
       
     }
   }
})

// 向外共享store的实例对象
export default store