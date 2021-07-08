import {ref,reactive,nextTick} from "vue"
import {
    VideoInterface,
    VideoChannelInterface,
    movieStateInterface, MovieStateInterface,
} from "@/types";
import {
    getVideoListService,
    getVideoFavoriteChannelsService,
} from "../service/homeService"
import BScroll from "better-scroll";

export default ()=> {
    
    const movieState = reactive<MovieStateInterface>({
        isInit: false,
        activeClassify:"",
        isEnd: false,
        loading:false,
        params: {
            pageNum:1,
            pageSize:20,
            classify:"推荐",
            keyword:""
        },
        classifies:["推荐","电影","电视剧","动漫","综艺","新片场","福利","恐怖"],
        list:[],
        bscroll:null
    })
    
    const movieScrollWrapper =  ref<HTMLElement>()
    
    
    /**
     * @author: wuwenqiang
     * @description: 切换频道
     * @date: 2020-06-27 21:29
     */
    const tabMovieChannel = async (navItem:string) => {
        movieState.params = {
            pageNum: 1,
            pageSize: 20,
            classify: navItem,
        }
        movieState.isEnd = false;
        movieState.list.splice(0, movieState.list.length)
        let res = await getVideoListService(movieState.params)
        movieState.list.push(...res as Array<VideoInterface>)
        nextTick(()=>{
            movieState.bscroll.refresh()
        })
    }
    
    /**
     * @author: wuwenqiang
     * @description: 初始化视频方法
     * @date: 2020-07-02 00:11
     */
    const useInitMovieEffect = async ()=>{
        movieState.params.classify = "电影"
        let result = await getVideoListService(movieState.params)
        movieState.list.push(...result as Array<VideoInterface>)
        movieState.isInit = true
        movieState.loading = false
        movieState.activeChannelId = movieState.channels[0].channelId
        setTimeout(()=>{
            movieState.bscroll = new BScroll(videoScrollWrapper.value, {
                probeType: 1,
                click: true,
            });
            movieState.bscroll.on('scrollEnd', async () => {
                if (movieState.bscroll.y <= (movieState.bscroll.maxScrollY + 100) && !movieState.isEnd && !movieState.loading) {
                    movieState.params.pageNum++
                    let result:Array<VideoInterface> = await getVideoListService(movieState.params)
                    movieState.list.push(...result)
                    nextTick(() => {
                        movieState.bscroll.refresh()
                    })
                }
            })
        },100)
    }
    
    
    return {
        movieState,
        tabMovieChannel,
        movieScrollWrapper,
        useInitMovieEffect
    }
}
