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
}




