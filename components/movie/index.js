// components/movie/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 电影数据
    movie: Object
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
    onGoTODetail(event) {
      wx.navigateTo({
        // 打开当前电影的详情页面 作为子页面
        // 同时携带参数 电影id携带过去
        url: '/pages/movie-detail/movie-detail?mid=' + this.properties.movie.id,
      })
    }
  }
})
