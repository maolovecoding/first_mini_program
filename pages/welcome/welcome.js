// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 定义捕获Tap事件后的回调函数
  onTap(params) {
    // 捕获事件 并跳转页面
    // 1. 捕获事件 在页面上通过bind进行捕获

    // 2. 完成页面的跳转
    // 使用 wx.navigateTo({url: 'url'}) 方法完成页面直接的跳转
    // 该方法接收的参数是一个对象，url属性是跳转的路径
    /**
     * navigateTo方法的特点：
     *    该方法跳转的页面，实际上是当前页面的子页面，我们可以从子页面返回当前页面。当然，有子页面，肯定还可以有子子页面，但是页面不能无限的多下去，页面栈最多只能开辟10个，所以最多可以有十个子页面。
     * 
    */
    // wx.navigateTo({
    //   wx.redirectTo({
    //   // 进行页面跳转的时候，填写的页面文件相对整个项目的绝对路径
    //   url: '/pages/posts/posts',
    //   // 也可以使用相对路径(可以看我们在app.json中配置的页面路径)
    //   // url: '../posts/posts',
    // })

    // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    wx.switchTab({
      url: '/pages/posts/posts'
    })
  },

  onTap1(){
    console.log("1");
  },
  onTap2(){
    console.log("2");
  },
  onTap3(){
    console.log("3");
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
    console.log("welcome 页面被卸载！");
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