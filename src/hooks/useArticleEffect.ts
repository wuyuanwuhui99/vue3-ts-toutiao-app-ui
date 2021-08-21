import {ref,reactive,nextTick,toRefs} from "vue"
import {
    ArticleStateInterface,
    ArticleChannelInterface, ArticleInterface,
} from "../types";
import {
    getFavoriteChannelsListService,
    getArticleListService
} from "../service/homeService";
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
    const articleNavScroll = ref<HTMLElement | null>(null);
    const articleScrollWrapper = ref<HTMLElement | null>(null);
    
    /**
     * @author: wuwenqiang
     * @description: 切换频道
     * @date: 2020-06-27 21:29
     */
    const useTabArticleChannel = async (navItem: ArticleChannelInterface) => {
        articleState.activeId = navItem.id;
        articleState.params = {
            pageNum: 1,
            pageSize: 20,
            channelId: navItem.channelId,
        };
        articleState.isEnd = false;
        articleState.list.splice(0, articleState.list.length);
        if (navItem.channelName == "西瓜视频") articleState.params.type = "video";
        let res = await getArticleListService(articleState.params);
        articleState.list.push(...res);
        nextTick(()=>{
            articleState.bscroll.refresh();
        })
    };
    
    /**
     * @author: wuwenqiang
     * @description: 初始化方法
     * @date: 2020-06-30 23:28
     */
    const useInitArticle = async ()=>{
        const res = await getFavoriteChannelsListService();//获取频道信息
        articleState.channels.push(...res);
        const activeChannel = articleState.channels.find((item: ArticleChannelInterface) => item.status == 1);
        const {channelId,id} = activeChannel as ArticleChannelInterface;
        articleState.params.channelId = channelId;
        articleState.activeId = id;
        const reuslt = await getArticleListService(articleState.params).finally(()=>{
            articleState.isInit = true
        });
        articleState.list.push(...reuslt);
        setTimeout(()=>{
            new BScroll(articleNavScroll.value as HTMLElement, {
                probeType: 1,
                click: true,
                scrollX: true,
                scrollY: false,
                eventPassthrough: "vertical"
            });
            
            articleState.bscroll = new BScroll(articleScrollWrapper.value as HTMLElement, {
                probeType: 1,
                click: true,
            });
            articleState.bscroll.on('scrollEnd', async () => {
                if (articleState.bscroll.y <= (articleState.bscroll.maxScrollY + 100) && !articleState.isEnd && !articleState.loading) {
                    articleState.params.pageNum++;
                    let result = await getArticleListService(articleState.params).finally(()=>{
                        articleState.isInit = true
                    });
                    if(result.length == 0){
                        articleState.isEnd = true;
                        return;
                    }else{
                        articleState.isEnd = false;
                    }
                    articleState.list.push(...reuslt);
                    nextTick(() => {
                        articleState.bscroll.refresh();
                    });
                }
            })
        },500);
    };
    
    const router = useRouter();
    
    const useGoArticleDetail = (id:number)=>{
        router.push(`/articleDetail/${id}`);
    };
    
    return {
        ...toRefs(articleState),
        useTabArticleChannel,
        articleNavScroll,
        articleScrollWrapper,
        useInitArticle,
        useGoArticleDetail
    }
}
