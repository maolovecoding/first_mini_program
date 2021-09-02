// pages/more-movie/more-movie.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 电影集合
    movies: [],
    // 电影列表类型
    _type: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取电影列表类型
    const type = options.type;
    // 将电影列表的类型存储起来
    this.setData({ _type: type });
    // 请求服务器数据 获取正在热映的电影
    wx.request({
      // 请求地址
      url: app.gBaseUrl + type,
      method: "GET",
      // 参数 在get请求中为查询字符串
      data: {
        // 电影的起始索引
        start: 0,
        // 电影的总条数
        count: 12
      },
      success: (res) => { // 使用箭头函数解决this指向问题
        // 电影数据
        console.log(res.data.subjects);
        this.setData({
          movies: res.data.subjects
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let title = "电影";
    // 根据类型渲染不同的标题
    switch (this.data._type) {
      case "in_theaters":
        title = "正在热映";
        break;
      case "coming_soon":
        title = "即将上映";
        break;
      case "top250":
        title = "Top250";
        break;
    }
    wx.setNavigationBarTitle({
      title
    })
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
    // 用户进行下拉以后，我们就刷新数据
    wx.request({
      url: app.gBaseUrl + this.data._type,
      data: {
        start: 0,
        count: 12
      },
      success: (res) => {
        this.setData({
          movies: res.data.subjects
        })
        // 关闭我们的下拉刷新动画
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 请求数据前 提示用户正在加载数据 刷新页面 显示加载动画
    wx.showNavigationBarLoading();

    // 请求服务器数据 获取正在热映的电影
    wx.request({
      // 请求地址
      url: app.gBaseUrl + this.data._type,
      method: "GET",
      // 参数 在get请求中为查询字符串
      data: {
        // 电影的起始索引
        start: this.data.movies.length,
        // 电影的总条数
        count: 12
      },
      success: (res) => { // 使用箭头函数解决this指向问题
        // 电影数据
        this.setData({
          // 追加数据
          movies: [...this.data.movies, ...res.data.subjects]
        });

        // 电影数据请求完毕了，隐藏正在加载的提示框动画
        wx.hideNavigationBarLoading()
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})