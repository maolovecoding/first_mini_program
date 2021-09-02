// pages/posts/posts.js
// 导入数据 这里不能使用绝对路径
import postList from "../../data/data.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ["1-我是服务器请求到的标题！"],
    dates: ['2021 08 26']
  },

  /**
   * 生命周期函数--监听页面加载
   * 也可以叫做 钩子函数 hook function
   */
  onLoad: function (options) {
    // onLoad函数，在小程序页面加载的时候，会自动进行回调这个函数。
    // console.log(1);
    // 使用setData函数定义的数据，会隐式的放到data属性上，
    // 也就是说 最终数据都会在data属性上
    // this.setData({
    //   dates:['2021 08 26']
    // })
    // console.log(this.data);
    // console.log("onLoad");

    /**
     * 模拟从服务器请求到了数据
     */
    // const content = postList;
    this.setData({
      posts: postList
    });
  },
  // event  事件
  onGoToDetail(event) {
    // console.log(event.type); // 可以获取触发的事件类型
    let pid = event.currentTarget.dataset.postId;
    if (!pid) {
      // 没有获取到，说明是点击文章进行跳转的
      pid = event.detail.pid;
    }
    wx.navigateTo({
      // 跳转文章详情页 event.detail.pid 可以拿到我们组件发射事件时携带的参数
      url: "/pages/post-detail/post-detail?pid=" + pid,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload");
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
    console.log("onshare");
  }
})