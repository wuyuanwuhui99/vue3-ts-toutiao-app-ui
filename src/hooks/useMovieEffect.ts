import {ref,reactive,nextTick,Ref} from "vue"
import {
    MovieInterface,
    MovieStateInterface,
} from "@/types";
import BScroll from "better-scroll";
import {getMovieListService} from "@/service/movieService";

export default ()=> {
    
    const movieState = reactive<MovieStateInterface>({
        isInit: false,
        activeClassify:"电影",
        isEnd: false,
        loading:false,
        params: {
            pageNum:1,
            pageSize:20,
            classify:"电影",
            keyword:""
        },
        classifies:["电影","电视剧","动漫","综艺","新片场","福利","恐怖"],
        list:[],
        bscroll:null
    });
    const movieNavScroll:Ref<HTMLElement | null> = ref(null);
    const movieScrollWrapper: Ref<HTMLElement | null> = ref(null);
    
    
    /**
     * @author: wuwenqiang
     * @description: 切换频道
     * @date: 2020-06-27 21:29
     */
    const tabMovieChannel = async (classify:string) => {
        movieState.params = {
            pageNum: 1,
            pageSize: 20,
            classify
        };
        movieState.isEnd = false;
        movieState.activeClassify = classify;
        movieState.list.splice(0, movieState.list.length);
        const result:Array<MovieInterface> = await getMovieListService(movieState.params);
        movieState.list.push(...result);
        nextTick(()=>{
            movieState.bscroll.refresh();
        })
    }

    /**
     * @author: wuwenqiang
     * @description: 初始化视频方法
     * @date: 2020-07-02 00:11
     */
    const useInitMovieEffect = async ()=>{
        movieState.params.classify = "电影";
        const result:Array<MovieInterface>  = await getMovieListService(movieState.params);
        movieState.list.push(...result;
        movieState.isInit = true;
        movieState.loading = false;
        setTimeout(()=>{
            new BScroll(movieNavScroll.value, {
                probeType: 1,
                click: true,
                scrollX: true,
                scrollY: false,
                eventPassthrough: "vertical"
            });
            movieState.bscroll = new BScroll(movieScrollWrapper.value, {
                probeType: 1,
                click: true
            });
            movieState.bscroll.on('scrollEnd', async () => {
                if (movieState.bscroll.y <= (movieState.bscroll.maxScrollY + 100) && !movieState.isEnd && !movieState.loading) {
                    movieState.params.pageNum++
                    let result:Array<MovieInterface> = await getMovieListService(movieState.params);
                    movieState.list.push(...result);
                    nextTick(() => {
                        movieState.bscroll.refresh();
                    })
                }
            })
        },100)
    }
    
    
    return {
        movieState,
        tabMovieChannel,
        movieNavScroll,
        movieScrollWrapper,
        useInitMovieEffect
    }
}
