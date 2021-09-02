// components/post/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 自定义一个属性 属性名称
    postData: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 组件的自定义事件
    // event  事件
    onTap(event) {
      // wx.navigateTo({
      //   // 跳转文章详情页
      //   url: "/pages/post-detail/post-detail?pid=" + event.currentTarget.dataset.postId,
      // })

      // 发出自定义事件 使用 triggerEvent方法
      // this.triggerEvent("事件名称",参数对象)
      // this.triggerEvent("postTap",{pid:event.currentTarget.dataset.postId})
      this.triggerEvent("postTap",{pid:this.properties.postData.postId})
    }
  },

})
