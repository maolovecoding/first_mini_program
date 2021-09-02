App({
  /**
   * 小程序启动的生命周期
   */
  onLaunch() {
    console.log('小程序启动！');
  },
  /**
   * 小程序页面展示的时候
   */
  onShow() {
    console.log('onShow!');
  },
  /**
   * 小程序隐藏的时候执行
   */
  onHide() {
    console.log('小程序隐藏！');
  },
  /**
   * 小程序出现错误的时候执行
   */
  onError() {
    console.log('小程序报错！');
  },
  // name:'App.js name'

  // 记录音乐的播放状态
  gIsPlayingMusic: false,
  // 记录播放的音乐是属于那篇文章的 默认是-1
  gIsPlayingPostId: -1,
  // 请求基地址
  gBaseUrl:"http://t.talelin.com/v2/movie/"
})