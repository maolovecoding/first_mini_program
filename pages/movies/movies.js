// pages/movies/movies.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 正在热映的电影数据
    inTheaters: [],
    // 即将上映的电影数据
    comingSoon: [],
    // top250
    top250: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 记录一下this
    // const _this = this;
    // 请求服务器数据 获取正在热映的电影
    wx.request({
      // 请求地址
      url: app.gBaseUrl + 'in_theaters',
      method: "GET",
      // 参数 在get请求中为查询字符串
      data: {
        // 电影的起始索引
        start: 0,
        // 电影的总条数
        count: 3
      },
      // success(res) {
      //   // 电影数据
      //   console.log(res.data.subjects);
      //   _this.setData({
      //     inTheaters:res.data.subjects
      //   })
      // }
      success: (res) => { // 使用箭头函数解决this指向问题
        // 电影数据
        console.log(res.data.subjects);
        this.setData({
          inTheaters: res.data.subjects
        })
      }
    });

    // 即将上映的数据
    wx.request({
      // 请求地址
      url: app.gBaseUrl + 'coming_soon',
      method: "GET",
      data: {
        start: 0,
        count: 3
      },
      success: (res) => {
        // console.log(res);
        this.setData({
          comingSoon: res.data.subjects
        })
      }
    });
    // top250
    wx.request({
      // 请求地址
      url: app.gBaseUrl + 'top250',
      method: "GET",
      data: {
        start: 0,
        count: 3
      },
      success: (res) => {
        this.setData({
          top250: res.data.subjects
        })
      }
    })

  },
  /**
   * 页面跳转
   * @param {*} event 
   */
  onGoToMore(event) {
    // 类型
    const type = event.currentTarget.dataset.type;
    // 跳转到更多页面 以子页面的形式打开
    wx.navigateTo({
      url: "/pages/more-movie/more-movie?type="+type
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})