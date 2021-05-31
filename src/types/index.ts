export interface UserDataInterface {
    userId:String,
    create_date:String,
    update_date:String,
    username:String,
    telephone:String,
    email:String,
    avater:String,
    birthday:String,
    sex:String,
    role:String,
    sign:String,
    region:String
}

export interface ArticleInterface {
    id:Number,//主键
    channelId:String,//频道id
    content:String,//内容
    duration:String,//视频播放时长
    href:String,//链接地址
    img:String,//视频图片地址
    imgNum:String,//图片长度
    type:String,//类型，视频：video, 文章: article，博客：blog
    isTop:String,//是否置顶，0表示否，1表示是
    title:String,//主标题
    createTime:String,//创建时间
    updateTime:String,//更新时间
    source:String,//来源
    commentId:String,//评论id
    labels:String,//标签
    userId:String,//用户id
    userAvatar:String,//头像
    userHref:String,//用户主页
    ranks:String//排名
}

export interface ChannelsInterface {
    id:Number,//主键
    channelId:String,//频道id
    channelName:String,//频道名称
    href:String,//链接地址
    createTime:String,//创建时间
    updateTime:String,//最近更新时间
    userId:String,//用户id
    disabled:Number,//是否禁用
    status:Number,//状态，公开:0,推荐:1,默认:2
    sequence:Number,//主标题
}



