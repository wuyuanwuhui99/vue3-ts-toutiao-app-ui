import {ref,reactive,nextTick} from "vue"
import {
    ArticleInterface,
    VideoInterface,
    ArticleStateInterface,
    VideoCategoryInterface,
    VideoStateInterface, ChannelsInterface, NavInterface,
} from "@/types";
import {
    getVideoListService,
    getVideoCategoryService,
    getUserDataService,
    getFavoriteChannelsListService, getArticleListService
} from "../service/homeService"
import BScroll from "better-scroll";

export default ()=> {
    const articleState = reactive<ArticleStateInterface>({
        isInit: true,
        activeId:-1,
        isEnd: false,
        loading:false,
        params:{
            pageNum: 1,
            pageSize: 20,
            channelId: "",
        },
        channels:[],
        list:[],
        bscroll:null
    });
    
    const videoState = reactive<VideoStateInterface>({
        isInit: false,
        activeCategory:"",
        isEnd: false,
        loading:false,
        params: {
            pageSize:20,
            pageNum:1,//页码
            star:"",//主演
            category:"",//分类
            type:"",//类型
            label:"",//标签
            userId:"",//用户
            keyword:"",//关键字
        },
        categories:[],
        list:[],
        bscroll:null
    })
    
    let bottomTabIndex = ref<number>(0)
    const articleScrollWrapper = ref<HTMLElement>()
    const videoScrollWrapper =  ref<HTMLElement>()
    
    /**
     * @author: wuwenqiang
     * @description: 获取图片数量
     * @date: 2020-06-27 21:29
     */
    const getImgHtml = (htmlStr:string,length:number,index:number) =>{
        if (index == 3 && length > 4){
            return `<div class="img-num">+${length-index-1}</div>${htmlStr}`
        }else{
            return htmlStr
        }
    }
    
    /**
     * @author: wuwenqiang
     * @description: 获取图片html
     * @date: 2020-06-27 21:29
     */
    const getImg = (article:ArticleInterface)=>{
        if (article.type == "video")return article.img ?  [`<div class="iconfont iconfont-play"></div><img src='${article.img}'/><div class="duration">${article.duration}</div>`] : []
        return article.content.match(/<img[^<>]+>/g) || []
    }
    
    /**
     * @author: wuwenqiang
     * @description: 底部切换
     * @date: 2020-06-30 23:28
     */
    const tabBottom = async (index:number)=>{
        bottomTabIndex.value = index;
        if(index == 1 && !videoState.isInit){//获取视频分类和列表
            userInitVideoEffect()
        }
    }
    
    /**
     * @author: wuwenqiang
     * @description: 切换频道
     * @date: 2020-06-27 21:29
     */
    const tabChannel = async (navItem: NavInterface) => {
        if (bottomTabIndex.value == 0) {
            articleState.activeId = navItem.id
            articleState.params = {
                pageNum: 1,
                pageSize: 20,
                channelId: navItem.channelId,
            }
            articleState.isEnd = false;
            articleState.list.splice(0, articleState.list.length)
            if (navItem.channelName == "西瓜视频") articleState.params.type = "video"
            let res = await getArticleListService(articleState.params)
            articleState.list.push(...res as Array<ArticleInterface>)
            nextTick(()=>{
                articleState.bscroll.refresh()
            })
        } else if(bottomTabIndex.value == 1){
            videoState.params = {
                pageNum: 1,
                pageSize: 20,
                category: navItem.category,
            }
            videoState.isEnd = false;
            videoState.list.splice(0, videoState.list.length)
            let res = await getVideoListService(articleState.params)
            videoState.list.push(...res as Array<VideoInterface>)
            nextTick(()=>{
                videoState.bscroll.refresh()
            })
        }
    }
    
    /**
     * @author: wuwenqiang
     * @description: 初始化视频方法
     * @date: 2020-07-02 00:11
     */
    const userInitVideoEffect = async ()=>{
        let res = await getVideoCategoryService()
        videoState.categories.push(...res as Array<VideoCategoryInterface>)
        videoState.params.category = videoState.categories[0].category
        let result = await getVideoListService(videoState.params)
        videoState.list.push(...result as Array<VideoInterface>)
        videoState.isInit = true
        setTimeout(()=>{
            videoState.bscroll = new BScroll(videoScrollWrapper.value, {
                probeType: 1,
                click: true,
            });
            videoState.bscroll.on('scrollEnd', async () => {
                if (videoState.bscroll.y <= (videoState.bscroll.maxScrollY + 100) && !videoState.isEnd && !videoState.loading) {
                    videoState.params.pageNum++
                    let result:Array<VideoInterface> = await getVideoListService(videoState.params)
                    videoState.list.push(...result)
                    nextTick(() => {
                        videoState.bscroll.refresh()
                    })
                }
            })
        },100)
    }
    
    /**
     * @author: wuwenqiang
     * @description: 初始化方法
     * @date: 2020-06-30 23:28
     */
    const userInitArticleEffect = async ()=>{
        await getUserDataService();//获取用户信息
        const res:Array<ChannelsInterface> = await getFavoriteChannelsListService();//获取频道信息
        articleState.channels.push(...res)
        let {channelId,id}= articleState.channels.find((item: ChannelsInterface) => item.status == 1)
        articleState.params.channelId = channelId;
        articleState.activeId = id
        const reuslt:Array<ArticleInterface> = await getArticleListService(articleState.params).finally(()=>{
            articleState.isInit = true
        })
        articleState.list.push(...reuslt)
        setTimeout(()=>{
            articleState.bscroll = new BScroll(articleScrollWrapper.value, {
                probeType: 1,
                click: true,
            });
            articleState.bscroll.on('scrollEnd', async () => {
                if (articleState.bscroll.y <= (articleState.bscroll.maxScrollY + 100) && !articleState.isEnd && !articleState.loading) {
                    articleState.params.pageNum++
                    let reuslt:Array<ArticleInterface> = await getArticleListService(articleState.params).finally(()=>{
                        articleState.isInit = true
                    })
                    if(result.length == 0){
                        articleState.isEnd = true
                        return
                    }else{
                        articleState.isEnd = false
                    }
                    articleState.list.push(...reuslt)
                    nextTick(() => {
                        articleState.bscroll.refresh()
                    })
                }
            })
        },500)
    }
    
    userInitArticleEffect()
    
    return {
        getImgHtml,
        getImg,
        bottomTabIndex,
        tabBottom,
        articleState,
        videoState,
        tabChannel,
        articleScrollWrapper,
        videoScrollWrapper
        
    }
}
