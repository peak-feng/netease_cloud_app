const api = 'https://autumnfish.cn'

const config = {

  api,

  //歌曲url获取接口
  songUrl: `${api}/song/url?id=`,

  //歌曲搜索
  searchUrl: `${api}/search?keywords=`,

  //歌曲详情获取
  songDetail: `${api}/song/detail`,

  //热门评论获取
  hotComment: `${api}comment/hot?type=0`,

  //mv地址获取
  mvUrl: `${api}/mv`,

  //获取歌曲封面
  coverUrl: `${api}/song/detail?ids=`,

  //获取歌曲歌词
  lyricUrl: `${api}/lyric?id=`,

  //获取banner轮播图
  bannerUrl:`${api}/banner?type=`,

  //推荐歌单
  personalizedUrl:`${api}/personalized`,

  //获取歌手榜
  songersUrl:`${api}/toplist/artist`,

  //获取榜单
  topListUrl:`${api}/toplist`
}

module.exports = config