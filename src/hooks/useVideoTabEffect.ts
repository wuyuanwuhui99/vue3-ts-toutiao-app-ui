import {ref,reactive,nextTick,toRefs,Ref} from "vue"
import {
    VideoInterface,
    VideoChannelInterface,
    VideoStateInterface,
} from "../types";
import {
    getVideoListService,
    getVideoFavoriteChannelsService
} from "../service/videoService";
import BScroll from "better-scroll";
import emitter from "../utils/emitter";

export default ()=> {
    
    const videoState = reactive<VideoStateInterface>({
        isInit: false,
        activeChannelId:"",
        isEnd: false,
        loading:false,
        showHandleIndex:-1,
        params: {
            pageSize:20,
            pageNum:1,//页码
            star:"",//主演
            channelId:"",//分类
            type:"",//类型
            label:"",//标签
            authorId:"",//用户
            keyword:"",//关键字
        },
        channels:[],
        list:[],
        bscroll:null
    });
    const videoNavScroll:Ref<HTMLElement | null> = ref(null);
    const videoScrollWrapper =  ref<HTMLElement>();
    
    
    /**
     * @author: wuwenqiang
     * @description: 切换频道
     * @date: 2020-06-27 21:29
     */
    const useTabVideoChannel = async (navItem: VideoChannelInterface) => {
        videoState.activeChannelId = navItem.channelId;
        videoState.params = {
            pageNum: 1,
            pageSize: 20,
            channelId: navItem.channelId,
        };
        videoState.isEnd = false;
        videoState.list.splice(0, videoState.list.length);
        let res = await getVideoListService(videoState.params);
        videoState.list.push(...res as Array<VideoInterface>);
        nextTick(()=>{
            videoState.bscroll.refresh()
        })
    };
    
    /**
     * @author: wuwenqiang
     * @description: 初始化视频方法
     * @date: 2020-07-02 00:11
     */
    const useInitVideo = async ()=>{
        let res = await getVideoFavoriteChannelsService();
        videoState.channels.push(...res as Array<VideoChannelInterface>);
        videoState.params.channelId = videoState.channels[0].channelId;
        let result = await getVideoListService(videoState.params);
        videoState.list.push(...result as Array<VideoInterface>);
        videoState.isInit = true;
        videoState.loading = false;
        videoState.activeChannelId = videoState.channels[0].channelId;
        setTimeout(()=>{
            new BScroll(videoNavScroll.value as HTMLElement, {
                probeType: 1,
                click: true,
                scrollX: true,
                scrollY: false,
                eventPassthrough: "vertical"
            });
            videoState.bscroll = new BScroll(videoScrollWrapper.value  as HTMLElement, {
                probeType: 1,
                click: true,
            });
            videoState.bscroll.on("scroll",()=>{
                emitter.emit("scroll");
            });
            videoState.bscroll.on('scrollEnd', async () => {
                if (videoState.bscroll.y <= (videoState.bscroll.maxScrollY + 100) && !videoState.isEnd && !videoState.loading) {
                    videoState.params.pageNum++;
                    let result:Array<VideoInterface> = await getVideoListService(videoState.params);
                    videoState.list.push(...result);
                    nextTick(() => {
                        videoState.bscroll.refresh()
                    });
                }
            })
        },100)
    };
    
    
    return {
        ...toRefs(videoState),
        useTabVideoChannel,
        videoNavScroll,
        videoScrollWrapper,
        useInitVideo
    }
}
