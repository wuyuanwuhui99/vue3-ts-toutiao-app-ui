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
    userId:string,//用户id
    userAvatar:string,//头像
    userHref:string,//用户主页
    ranks:string//排名
}

export interface ChannelsInterface {
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
    userId?:string,//用户id
    keyword?:string,
    pageNum:number,//页码
    pageSize: number,//每页长度
    isTop?:string //是否置顶
    type?:string
}

export interface VideoInterface {
    id:number, //主键,
    albumId:string,//视频id,
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
    userId:string,//用户名，这这个表不需要，为了跟记录叫和收藏表的结构一致,
    duration:string,//时长,
    img:string,// 图片地址,
    createTime:string,//创建时间,
    updateTime:string//更新时间,
}





