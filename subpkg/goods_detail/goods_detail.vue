<template>
  <view>
    <swiper class="swiper-box">
      <swiper-item v-for="(item ,index) in goods_info.pics" :key="index">
        <view class="swiper-item">
          <!-- 1 把当前点击的图片的索引传递给priview 优先预览该张图片 -->
          <image :src="item.pics_big" mode="" @click="priview(index)"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">
        ￥{{goods_info.goods_price}}
      </view>
      <!-- 信息 -->
      <view class="goods-name">
        {{goods_info.goods_name}}
      </view>
    </view>
    <!-- 详情信息

     
     -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>



    <!-- 商品导航 
    fill 控制右侧按钮的样式  true/false
    options 左侧按钮的配置项
    -->
    <view class="goods_nav">
      <uni-goods-nav :options="options"  :buttonGroup="buttonGroup" @buttonClick="addCart" @click="goCart" />
    </view>
  </view>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        goods_id: "",
        // 商品详情数据
        goods_info: {},
        options: [{
          icon: 'shop',
          text: '店铺',
          info: 2,
          infoBackgroundColor: '#007aff',
          infoColor: "#f5f5f5"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    onLoad(options) {
      this.goods_id = options.goods_id;
      console.log(options.goods_id)
      this.getGoodsDetail()
    },
    methods: {
      ...mapMutations(['addToCart']),
      addCart(e){
        console.log(e,"3")
        if(e.index===0){  //加入购物车
            // 创建一条要加入购物车的数据
            var obj = {
              id:this.goods_info.goods_id,
              name:this.goods_info.goods_name,
              price:this.goods_info.goods_price,
              num:1,
              pic:this.goods_info.goods_small_logo,
              ischeck:false
            }
            // 调用mutations方法  实现添加
            this.addToCart(obj)
        }
      },
      goCart(e){
        console.log(e)
        if(e.index===1){
          // 跳转到购物车页面
          uni.switchTab({
            url:"/pages/cart/cart"
          })
        }
      },
      priview(index) { //预览图片
        console.log(this.goods_info.pics)
        // 定义一个空数组  只存放图片
        var arr = [];
        // 遍历数组  把数组中的图片存到arr中
        this.goods_info.pics.forEach(item => {
          arr.push(item.pics_big)
        })
        console.log(arr)

        // 调用uni.previewImage 预览图片
        uni.previewImage({
          // 默认显示的第一张图片的索引
          current: index,
          // 需要预览的图片链接列表  arr是只存放图片的数组
          urls: arr
        })
      },
      async getGoodsDetail() {
        var {
          data: res
        } = await uni.$http.get('goods/detail', {
          goods_id: this.goods_id
        })
        console.log(res)
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goods_info = res.message
      }
    }
  }
</script>

<style lang="scss">
  .swiper-box {
    height: 750rpx;

    .swiper-item {
      height: 100%;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  // 商品信息
  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-name {
      font-size: 13px;
      padding-right: 10px;
    }
  }

  .goods_nav {
    // 商品导航组件添加固定定位
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
