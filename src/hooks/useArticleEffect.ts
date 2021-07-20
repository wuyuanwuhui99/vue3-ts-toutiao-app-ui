import {ref,reactive,nextTick} from "vue"
import {
    ArticleStateInterface,
    ArticleChannelInterface,
} from "../types";
import {
    getUserDataService,
    getFavoriteChannelsListService, getArticleListService
} from "../service/homeService"
import BScroll from "better-scroll";
import { useRouter } from "vue-router";
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
    const articleNavScroll = ref<HTMLElement>();
    const articleScrollWrapper = ref<HTMLElement>();
    
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
    };
    
    /**
     * @author: wuwenqiang
     * @description: 切换频道
     * @date: 2020-06-27 21:29
     */
    const tabArticleChannel = async (navItem: ArticleChannelInterface) => {
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
        articleState.list.push(...res)
        nextTick(()=>{
            articleState.bscroll.refresh()
        })
    }
    
    /**
     * @author: wuwenqiang
     * @description: 初始化方法
     * @date: 2020-06-30 23:28
     */
    const useInitArticleEffect = async ()=>{
        await getUserDataService();//获取用户信息
        const res = await getFavoriteChannelsListService();//获取频道信息
        articleState.channels.push(...res)
        let {channelId,id}= articleState.channels.find((item: ArticleChannelInterface) => item.status == 1);
        articleState.params.channelId = channelId;
        articleState.activeId = id
        const reuslt = await getArticleListService(articleState.params).finally(()=>{
            articleState.isInit = true
        });
        articleState.list.push(...reuslt);
        setTimeout(()=>{
            new BScroll(articleNavScroll.value, {
                probeType: 1,
                click: true,
                scrollX: true,
                scrollY: false,
                eventPassthrough: "vertical"
            });
            
            articleState.bscroll = new BScroll(articleScrollWrapper.value, {
                probeType: 1,
                click: true,
            });
            articleState.bscroll.on('scrollEnd', async () => {
                if (articleState.bscroll.y <= (articleState.bscroll.maxScrollY + 100) && !articleState.isEnd && !articleState.loading) {
                    articleState.params.pageNum++
                    let result = await getArticleListService(articleState.params).finally(()=>{
                        articleState.isInit = true
                    });
                    if(result.length == 0){
                        articleState.isEnd = true;
                        return
                    }else{
                        articleState.isEnd = false;
                    }
                    articleState.list.push(...reuslt);
                    nextTick(() => {
                        articleState.bscroll.refresh();
                    });
                }
            })
        },500)
    };
    
    const router = useRouter()
    
    const goArticleDetail = (id:number)=>{
        router.push(`/articleDetail/${id}`)
    }
    
    return {
        getImgHtml,
        articleState,
        tabArticleChannel,
        articleNavScroll,
        articleScrollWrapper,
        useInitArticleEffect,
        goArticleDetail
    }
}
