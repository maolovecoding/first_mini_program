// pages/movie-detail/movie-detail.js
// 导入util工具
import { convertToCastString,convertToCastInfos } from "../../utils/util.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 电影详情数据
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      // 获取电影详细数据
      url: app.gBaseUrl + "subject/" + options.mid,
      method: "GET",
      success: (res) => {
        console.log(res.data);
        // 电影数据预处理
        this.processMovieData(res.data);
        // 数据绑定 方法处理好数据以后，内部绑定
        // this.setData({
        //   movie: res.data
        // })
      }
    })
  },
  /**
   * 图片预览
   * @param {*} event 
   */
  onViewPost(event) {
    wx: wx.previewImage({
      // 预览的图片，可以有多个 值是src的值 也就是链接地址
      urls: [this.data.movie.image],
      // 当前预览的第一张图片
      current: this.data.movie.image
    })
  },
  /**
   * 对请求的电影数据进行预处理
   * @param {*} movie 电影数据
   */
  processMovieData(movie) {
    // 处理后的数据
    const movieData = {};
    // 处理导演和演员数组
    movieData.directorsStr = convertToCastString(movie.directors);
    movieData.castsStr = convertToCastString(movie.casts);
    // 图片处理一下
    movieData.image = movie.images.large;
    // 标题处理
    movieData.title = movie.title;
    // 副标题
    movieData.sub_title = movie.countries[0] + " · " + movie.year;
    movieData.wishCount = movie.wish_count;
    movieData.commentsCount = movie.comments_count;
    movieData.originalTitle = movie.original_title;
    // 评分
    movieData.score = movie.rating.stars / 10;
    movieData.average = movie.rating.average;
    movieData.genresStr = movie.genres.join(" / ");
    movieData.summary = movie.summary;
    // 处理影人数据
    movieData.castsInfo = convertToCastInfos(movie.casts);
    // 数据绑定
    this.setData({
      movie: movieData
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