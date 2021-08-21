export interface UserDataInterface {
    userId:string,
    create_date:string,
    update_date:string,
    username:string,
    telephone:string,
    email:string,
    avater:string,
    birthday:string,
    sex:string,
    role:string,
    sign:string,
    region:string
}

export interface ArticleInterface {
    id:number,//主键
    channelId:string,//频道id
    content:string,//内容
    duration:string,//视频播放时长
    href:string,//链接地址
    img:string,//视频图片地址
    imgNum:string,//图片长度
    type:string,//类型，视频：video, 文章: article，博客：blog
    isTop:string,//是否置顶，0表示否，1表示是
    title:string,//主标题
    createTime:string,//创建时间
    updateTime:string,//更新时间
    source:string,//来源
    commentId:string,//评论id
    labels:string,//标签
    authorId:string,//用户id
    authorAvatar:string,//头像
    authorHref:string,//用户主页
    ranks:string//排名
    imgList?:Array<string>,//预览图片列表
}

export interface ArticleChannelInterface {
    id:number,//主键
    channelId:string,//频道id
    channelName:string,//频道名称
    href:string,//链接地址
    createTime:string,//创建时间
    updateTime:string,//最近更新时间
    userId:string,//用户id
    disabled:number,//是否禁用
    status:number,//状态，公开:0,推荐:1,默认:2
    sequence:number,//主标题
}

export interface ArticleParamsInterface {
    channelId?:string,//频道id
    authorId?:string,//用户id
    keyword?:string,
    pageNum:number,//页码
    pageSize: number,//每页长度
    isTop?:string //是否置顶
    type?:string
}

export interface ArticleStateInterface {
    isInit: boolean,
    activeId:number,
    isEnd: boolean,
    loading:boolean,
    params:ArticleParamsInterface,
    channels:Array<ArticleChannelInterface>,
    list:Array<ArticleInterface>,
    bscroll:any
}

export interface VideoInterface {
    id:number, //主键,
    albumId:string,//视频id,
    channelId:string,//频道id,
    title:string,//电影名称,
    director:string,//导演,
    star:string,//主演,
    type:string,//类型,
    countryLanguage: string,//国家/语言,
    publishTime:string,//上映时间,
    plot:string,//剧情,
    isRecommend:string //是否推荐，0:不推荐，1:推荐,
    classify:string ,//分类 电影,电视剧,动漫,综艺,新片库,福利,午夜,恐怖,其他,
    sourceName: string,//来源名称，本地，骑士影院，爱奇艺,
    sourceUrl:string,//来源地址,
    label:string,//标签,
    originaHref: string,//源地址,
    description :string,//简单描述,
    targetHref:string,//链接地址,
    status:string,//0代表未使用，1表示正在使用，是banner和carousel图的才有,
    score: string,//评分,
    category:string,//类目，值为banner首屏，carousel：滚动轮播,
    ranks:string,//排名,
    authorId:string,//用户名，这这个表不需要，为了跟记录叫和收藏表的结构一致,
    duration:string,//时长,
    img:string,// 图片地址,
    createTime:string,//创建时间,
    updateTime:string//更新时间,
    authorInfo:AuthorInfo,//用户信息
}

export interface AuthorInfo {
    id:number,//主键
    authorId:string,//用户id
    name:string,//名称
    authorDesc:string,//描述
    avatarUrl:string,//头像地址
    description:string,//描述
    followersCount:string,//粉丝数量
    verifiedContent:string,//主要内容
    createTime:string,//创建时间
    updateTime:string,//更新时间
}

export interface VideoParamsInterface {
    pageSize:number,//每页显示条数
    pageNum:number,//页码
    star?:string,//主演
    channelId?:string,//分类
    type?:string,//类型
    label?:string,//标签
    authorId?:string,//用户
    keyword?:string,//关键字
}

export interface VideoChannelInterface {
    id:number,
    channelName:string,
    channelId:string,
    createTime:string,
    updateTime:string,
    sequence:number,
    status:number,
    userId:string
}

export interface VideoStateInterface {
    isInit: boolean,
    activeChannelId:string,
    isEnd: boolean,
    loading:boolean,
    params: VideoParamsInterface,
    channels:Array<VideoChannelInterface>,
    list:Array<VideoInterface>,
    bscroll:any
    showHandleIndex:number,//显示点赞评论收藏操作框的下标
}

export interface MovieStateInterface {
    isInit: boolean,
    activeClassify:string,
    isEnd: boolean,
    loading:boolean,
    params: MovieParamsInterface,
    classifies:Array<string>,
    list:Array<MovieInterface>,
    bscroll:any
}
export interface MovieInterface {
    id:number,//主键',
    movieId:string,//电影id
    movieName:string,//电影名称
    director:string,//导演
    star:string,//主演
    type:string,//类型
    countryLanguage:string,//国家/语言
    viewingState:string,//观看状态
    releaseTime:string,//上映时间
    plot:string,//剧情
    updateTime:string,//更新时间
    isRecommend:number,//是否推荐，0:不推荐，1:推荐
    img:number,//电影海报
    classify:string,//分类 电影,电视剧,动漫,综艺,新片库,福利,午夜,恐怖,其他
    sourceName:string,//来源名称，本地，骑士影院，爱奇艺
    sourceUrl:string,//来源地址
    createTime:string,//创建时间
    localImg:string,//本地图片
    label:string,//标签
    originalHref:string,//源地址
    description:string,//简单描述
    targetHref:string,//链接地址
    useStatus:string,//0代表未使用，1表示正在使用，是banner和carousel图的才有
    score:string,//评分
    category:string,//类目，值为banner首屏，carousel：滚动轮播
    ranks:string,//排名
    userId:string,//用户名，这这个表不需要，为了跟记录叫和收藏表的结构一致
    doubanUrl:string,//对应豆瓣网的地址
}
export interface MovieParamsInterface {
    id?:number,
    pageNum:number,
    pageSize:number
    classify?:string,
    star?:string,
    type?:string,
    label?:string,
    director?:string,//导员
    keyword?:string
}
export interface HandlePropsInterface {
    type:string,
    item:MixinInterface
}

export type MixinInterface = ArticleInterface|MovieInterface|VideoInterface




