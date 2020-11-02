//index.js
//获取应用实例
const app = getApp()
const htmlSnip = function (fileName) {
  return `
  <p>    小程序无法查看附件<span style="color:#2B98EF;">${fileName}</span>
  ,请使用浏览器输入<span style="color:red">www.ggdzhj.com</span>进行查阅
  </p>
`
}


Page({
  data: {
    title: htmlSnip("xxxxx2"),
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShowToast: false,
    isRefresher: false
  },
  onLoad: function () {
  },
  
  onShow() {
  },



  onRefresh(e){
    console.log("触发 下拉刷新")
    setTimeout(()=>{
      this.setData({
        isRefresher:false
      })
    },1000)
  },
  onLoadMore(){
    console.log("触发 底部加载更多")
  },

  checkboxChange(e){
    console.log(e,e.detail.value)
    let check = e.detail.value
    
    this.setData({
      isRefresher: check.indexOf("triggered") != -1,
    })
  }
})