// pages/post-detail/post-detail.js

// 导入数据
import postList from '../../data/data.js'
const app = getApp()
// console.log(app);
// console.log(app.gIsPlayingMusic);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {},
    // 记录当前文章的id
    _pid: null,
    // 当前文章是否收藏
    collected: false,
    // 所有文章是否收藏的缓存对象
    _postsCollected: {},
    // 音乐是否播放中
    isPlaying: false,
    // 背景音频对象
    _mgr: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 通过监听页面加载的的函数的参数options，机也可以拿到我们传递过来本页面的参数
    // 注意：查询字符串（参数）的类型都是字符串类型
    // console.log(options);
    const [post] = [...postList.filter(post => post.postId === parseInt(options.pid))];

    // 记录文章id
    this.data._pid = post.postId;

    // console.log(post);
    // 拿到我们指定的文章
    this.setData(post);

    // 读取缓存，拿到文章是否收藏的状态
    const { data: postsCollected } = await wx.getStorage({
      key: 'post_collected',
    })
    // 记录所有文章的缓存状态的对象
    this.data._postsCollected = postsCollected;
    // 拿到当前文章的收藏状态 取不到则表示这篇文章未收藏
    const collected = postsCollected[this.data._pid] || false;
    // console.log(postsCollected);
    // console.log(collected);
    this.setData({ collected });

    // // 同步设置（修改）缓存的方法
    // // 两个参数：键  值
    // wx.setStorageSync('flag', true);
    // // 删除缓存
    // wx.removeStorageSync("flag");
    // // 清空所有缓存
    // wx.clearStorageSync();
    // wx.setStorageSync('name', "你好！ ")
    // // 获取我们设置的缓存
    // const n = wx.getStorageSync("name");
    // console.log(n); 

    // 异步设置缓存 参数是一个对象 key是键 data是数据 也就是设置的value
    // wx.setStorage({
    //   data: '毛毛1',
    //   key: 'name',
    // });
    // // 获取缓存 参数也是对象
    // wx.getStorage({
    //   // 要获取的缓存的键名
    //   key: 'name',
    //   // 获取成功后的回调函数
    //   success(res) {
    //     console.log(res); // post-detail.js? [sm]:50 {errMsg: "getStorage:ok", data: "毛毛1"}
    //   }
    // });

    // // 移除缓存
    // wx.removeStorage({
    //   key: 'name',
    //   // 移除属性成功后的回调函数
    //   success(res){
    //     console.log(res);
    //   }
    // })

    // // 清空缓存
    // wx.clearStorage({
    //   // 缓存清空成功后的回调
    //   success: (res) => {
    //   console.log(res);
    //   },
    // })

    // wx.setStorage({
    //   data: '听雨少年',
    //   key: 'name',
    // });
    // // 获取缓存 无回调
    // const res =wx.getStorage({
    //   key: 'name',
    // });
    // console.log(res instanceof Promise); // true
    // // 传统的promise 获取成功后的结果 ES6新增
    // res.then((value)=>{
    //   console.log(value);// {errMsg: "getStorage:ok", data: "听雨少年"}
    // })

    // wx.setStorage({
    //   data: '听雨少年',
    //   key: 'name',
    // });
    // const res = await wx.getStorage({
    //   key: 'name',
    // })
    // console.log(res);// {errMsg: "getStorage:ok", data: "听雨少年"}

    const mgr = wx.getBackgroundAudioManager();
    this.data._mgr = mgr;
    // 监听背景音乐的播放和停止
    // mgr.onPlay(()=>{
    //   // 音乐播放
    //   this.onMusicStart();
    // });
    mgr.onPlay(this.onMusicStart);
    // 音乐暂停的回调处理
    mgr.onPause(this.onMusicStop.bind(this, false));

    // 获取全局记录的播放状态
    // this.setData({
    //   isPlaying: app.gIsPlayingMusic
    // });
    // 音乐播放状态 只有音乐所属的文章号是当前所在的文章页面，且音乐一直处于播放状态，我们才重置音乐的播放状态为true
    this.setData({
      isPlaying: this.currentPostMusicIsPlaying()
    });
  },
  /**
   * 文章收藏点击事件的回调
   * @param {*} event  事件对象
   */
  async onCollect(event) {
    // 假设文章未收藏
    // 点击后 未收藏 -> 收藏
    // 将是否收藏的状态保存到缓存中
    // 记录那篇文章是否被收藏，还可以同时进行记录多篇文章
    // const { data: postCollected = {} } = await wx.getStorage({
    //   key: 'post_collected',
    // })
    const postCollected = this.data._postsCollected;
    // console.log(postCollected);

    // 当前文章的收藏状态 取不到则肯定没有收藏过
    const collected = postCollected[this.data._pid] || false;
    // 用文章id的值作为实际存储对象的属性，属性值是是否收藏
    postCollected[this.data._pid] = !collected;
    wx.setStorageSync('post_collected', postCollected)
    this.setData({
      // 这里直接取反就可以了 上面的执行完毕这里可以直接取反了
      collected: !collected
    });

    // 使用小程序默认的API 弹框组件来提示用户是收藏文章 还是取消收藏
    wx.showToast({
      // 提示文字
      title: this.data.collected ? "收藏文章成功！" : "取消收藏成功！",
      // 提示框停留时间
      duration: 2000
    })

    // 模态对话框 showModel
    // wx.showModal({
    //   title:"是否收藏文章",
    //   success(res){
    //     // 不管取消还是确定，都会执行这个回调函数，因为这个函数的执行时机就是 接口调用成功的回调函数 也就是出现了这个模态框，就一定会被执行的函数
    //     if(res.confirm){
    //       // res.confirm 为 true 时，表示用户点击了确定按钮
    //     }else if(res.cancel){
    //       // res.cancel  为 true 时，表示用户点击了取消
    //     }
    //   }
    // })

    // const res = wx.showModal({
    //   title:"是否收藏文章",
    // })
    // console.log(res); // Promise对象

    // const res = await wx.showModal({
    //   title: this.data.collected?"取消收藏？":"收藏文章？",
    // })
    // // console.log(res);
    // if (res.confirm) { // 收藏文章
    //   const postCollected = this.data._postsCollected;
    //   // console.log(postCollected);

    //   // 当前文章的收藏状态 取不到则肯定没有收藏过
    //   const collected = postCollected[this.data._pid] || false;
    //   // 用文章id的值作为实际存储对象的属性，属性值是是否收藏
    //   postCollected[this.data._pid] = !collected;
    //   wx.setStorageSync('post_collected', postCollected)
    //   this.setData({
    //     // 这里直接取反就可以了 上面的执行完毕这里可以直接取反了
    //     collected: !collected
    //   });
    // }
  },
  /**
   * 完成文章分享的回调函数
   * @param {*} event 
   */
  onShare(event) {
    // 调用小程序原生的组件 实现分享
    wx.showActionSheet({
      // 分享的方式(具体分享以后做什么，我们并没有做)
      itemList: ["分享到QQ", "分享到微信", "分享到微博", "分享到朋友圈"],
      success(res) {
        // 通过 res.tapIndex 可以拿到我们点击了哪一个数组元素的索引
        // 想做其他事情可以做
        // console.log(res.tapIndex);
      }
    })
  },
  /**
   * 音乐播放开始功能
   * @param {*} event 
   */
  onMusicStart(event) {
    // 获取全局唯一的背景音频管理器。 小程序切入后台，如果音频处于播放状态，可以继续播放。但是后台状态不能通过调用API操纵音频的播放状态
    // const mgr = wx.getBackgroundAudioManager();
    const mgr = this.data._mgr;
    // 赋值音乐播放的链接
    mgr.src = this.data.music.url;
    // 音乐播放的标题
    mgr.title = this.data.music.title;
    // 播放时使用的图片
    mgr.coverImgUrl = this.data.music.coverImg;
    // 切换当前音乐的播放状态为 播放中
    this.setData({
      isPlaying: true
    });
    // 音乐播放时调用的回调函数
    // mgr.onPlay(()=>{
    //   console.log(1);
    // })

    // 改变全局的音乐播放状态
    app.gIsPlayingMusic = true;
    // 记录当前播放音乐的文章id
    app.gIsPlayingPostId = this.data._pid;
  },
  /**
   * 音乐暂停的事件处理
   * @param {*} isStop 停止音乐 
   */
  onMusicStop(isStop = true) {
    // const mgr = wx.getBackgroundAudioManager();
    const mgr = this.data._mgr;
    if (isStop) {
      // 音乐停止
      mgr.stop();
      // 音乐停止，重置全局音乐的文章id
      app.gIsPlayingPostId = -1;
    } else {
      // 暂停播放
      mgr.pause();
    }
    // 音乐状态的切换
    this.setData({
      isPlaying: false
    })
    // 改变全局的音乐播放状态
    app.gIsPlayingMusic = false;
  },
  /**
   * 当前文章的音乐播放状态 
   * 
   * @returns 只有音乐所属的文章号是当前所在的文章页面，且音乐一直处于播放状态， 返回true
   */
  currentPostMusicIsPlaying() {
    if (app.gIsPlayingMusic && this.data._pid === app.gIsPlayingPostId)
      return true;
    return false;
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