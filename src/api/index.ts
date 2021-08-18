export default {
    getUserData: "/service/toutiao/getUserData",//获取用户信息
    getFavoriteChannels: "/service/toutiao-getway/getArticleFavoriteChannels",//获取用户收藏的频道
    getAllChannels: "/service/toutiao/getFavoriteChannels",//获取所有频道
    getArticleList: "/service/toutiao/getArticleList",//获取文章列表
    getVideoFavoriteChannels:"/service/toutiao-getway/getVideoFavoriteChannels",//获取视频分类
    getVideoList: "/service/toutiao/getVideoList",//获取视频列表
    getMovieList: "/service/toutiao/getMovieList",//获取视频列表
    getArticleDetail:"/service/toutiao/getArticleDetail",//获取文章详情
    getRecordList:"/service/toutiao-getway/getRecordList",//获取文章浏览记录
    isFavorite:"/service/toutiao-getway/isFavorite",//获取是否收藏过的文章和视频
    insertFavorite:"/service/toutiao-getway/insertFavorite",//插入收藏
    deleteFavorite:"/service/toutiao-getway/deleteFavorite",//删除收藏
    isLike:"/service/toutiao-getway/isLike",//获取是是否点赞过的文章和视频
    insertLike:"/service/toutiao-getway/insertLike",//插入点赞
    deleteLike:"/service/toutiao-getway/deleteLike",//删除点赞
    getFavorite:"/service/toutiao-getway/getFavorite",//获取文章浏览记录或视频播放记录或电影观看记录
}
