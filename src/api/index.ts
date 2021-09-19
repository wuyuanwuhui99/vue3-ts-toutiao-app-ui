export default {
    getUserData: "/service/toutiao/getUserData",//获取用户信息
    getFavoriteChannels: "/service/toutiao-getway/getArticleFavoriteChannels",//获取用户收藏的频道
    getAllChannels: "/service/toutiao/getFavoriteChannels",//获取所有频道
    getArticleList: "/service/toutiao/getArticleList",//获取文章列表
    getVideoFavoriteChannels:"/service/video-getway/getFavoriteChannels",//获取视频分类
    getVideoList: "/service/video/getVideoList",//获取视频列表
    getMovieList: "/service/movie/search",//获取视频列表
    getArticleDetail:"/service/toutiao/getArticleDetail",//获取文章详情
    getRecordList:"/service/{type}-getway/getRecordList",//获取文章浏览记录
    isFavorite:"/service/{type}-getway/isFavorite",//获取是否收藏过的文章和视频
    insertFavorite:"/service/{type}-getway/insertFavorite",//插入收藏
    deleteFavorite:"/service/{type}-getway/deleteFavorite",//删除收藏
    isLike:"/service/{type}-getway/isLike",//获取是是否点赞过的文章和视频
    insertLike:"/service/{type}-getway/insertLike",//插入点赞
    deleteLike:"/service/{type}-getway/deleteLike",//删除点赞
    getFavorite:"/service/{type}-getway/getFavorite",//获取文章浏览记录或视频播放记录或电影观看记录
    isFocus:"/service/{type}-getway/isFocus",//查询是否已经关注
    insertFocus:"/service/{type}-getway/insertFocus",//新增关注
    deleteFocus:"/service/{type}-getway/deleteFocus",//取消关注
    getCommentCount:"/service/{type}/getCommentCount",//获取评论总条数
    getTopCommentList:"/service/{type}/getTopCommentList",//获取一级评论列表
    insertComment:"/service/{type}-getway/insertComment",//新增评论
    deleteComment:"/service/{type}-getway/deleteComment/{id}",//删除评论
    getReplyCommentList:"/service/{type}/getReplyCommentList",//获取回复列表
    getCommentItem:"/service/{type}/getCommentItem",//获取新增的单条评论或者回复
    getMovieDetail:"/service/movie/getMovieDetail/",//获取电影详情
    getStar:"/service/movie/getStar/",//获取演员表
    getYourLikes:"/service/movie/getYourLikes",//获取猜你喜欢的电影
    getMovieListByType:"/service/movie/getMovieListByType",//按类型获取获取电影
    getRecommend:"/service/movie/getRecommend",//获取推荐的电影
}
