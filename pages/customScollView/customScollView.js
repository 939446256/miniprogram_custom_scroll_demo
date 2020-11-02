// components/customScollView/customScollView.js

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    //scroll高度
    height: {
      type: String,
      value: '400rpx'
    },

    //滚动触发方法
    triggered: {
      type: Boolean,
      value: false,
      observer: function (newV) {
        if (newV == true) {
          this.pullRefresh()
          this.setData({
            scrollTop: 0,
          })
        } else {
          this.scrollToTop()
        }
      }
    },

    //头部高度
    refreshHeaderHight: {
      type: Number,
      value: 100,
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      value: "transparent"
    },
    // 刷新icon图片位置
    imageTop: {
      type: Number,
      value: 20
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 是否加载完成
    isReady: false,
    // 根据屏幕改变
    // screenHeight: 667,
    // 页面高度
    pageHeight: 0,

  },

  lifetimes: {
    ready: function () {
      this.setData({
        scrollTop: this.data.refreshHeaderHight,
        isReady: true
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 监听滚动-通过通知获取
    listenScroll(res) {
      // console.log(res.detail.scrollTop)
      let scrollTop = res.detail.scrollTop
      this.isEndScroll = false
      this.scrollTop = scrollTop
    },

    //点击触发
    touchEnd() {
      let {
        refreshHeaderHight,
        // screenHeight
      } = this.data

      this.triggerEvent("touchEnd")

      let that = this
      let scrollTop = this.scrollTop
      this.isEndScroll = true

      //处理因滚动阻尼的延时情况
      setTimeout(() => {
        if (!that.isEndScroll) {
          that.touchEnd();
          return;
        }
        //触发 判断拉动距离是否超过3分之2
        if (scrollTop < refreshHeaderHight / 3) {
          // console.log('开始刷新', refreshHeaderHight)
          that.scrollToTop()
          that.pullRefresh()
        }
        //不触发 判断还没超过3分之2
        else if (scrollTop < refreshHeaderHight) {
          that.scrollToTop()
        }
      }, 200)
    },

    //恢复到顶部
    scrollToTop() {
      let {
        refreshHeaderHight
      } = this.data

      setTimeout(() => {
        this.setData({
          scrollTop: refreshHeaderHight,
        })
      }, 300)
    },

    //下拉刷新
    pullRefresh() {
      this.triggerEvent("Refresh")
    },

    //上拉加载
    pullToBottom() {
      // console.log('触发底部')
      this.triggerEvent("LoadMore")
    }

  }
})