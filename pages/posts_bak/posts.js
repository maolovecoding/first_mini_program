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
    // 使用事件对象 拿到我们当前文章的文字号 
    // 通过 currentTarget.dataset 可以拿到我们事件目标上自定义的 data-属性
    // 我们可以通过这个对象拿到定义在事件对象上的属性 data- 后面的就是自定义的属性
    // 小程序自定义的 data- 属性的规则
    // data-id ---> id
    // data-Id ---> id
    // data-postId ---> postid
    // data-PostId ---> postid
    // data-post-id ---> postId
    // data-post-ID ---> postId
    // console.log(event.currentTarget.dataset);
    
    wx.navigateTo({
      // 跳转文章详情页
      url: "/pages/post-detail/post-detail?pid="+event.currentTarget.dataset.postId,
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