import {reactive,toRefs,ref} from "vue";
import {getMovieDetailService,getStarService,getMovieListByTypeService,getYourLikesService,getRecommendService} from "../service/movieDetailService";
import {useRoute} from "vue-router";
import {MovieInterface,StarInterface} from "@/types";
export default  async () => {
    const scores = reactive<Array<string>>([]);
    const stars = reactive<Array<StarInterface>>([]);
    const route: any = useRoute();
    const movieDetail = reactive<MovieInterface>(<MovieInterface>{});
    const youLikes = reactive<Array<MovieInterface>>([]);
    const recommendList = reactive<Array<MovieInterface>>([]);
    const sameTypeList = reactive<Array<MovieInterface>>([]);
    const showMoreHandle = ref<boolean>(false);
    /**
     * @author: wuwenqiang
     * @description: 显示点赞评论收藏的操作框
     * @date: 2021-08-25 21:44
     */
    const getStar = (score: number) => {
        for (let i = 0; i < 5; i++) {
            if ((i + 1) * 2 < score) {
                scores.push("full");
            } else if ((i + 1) * 2 > score && i * 2 < score) {
                scores.push("half");
            } else {
                scores.push("empty");
            }
        }
    };
    
    const onMoreHandle = ()=>{
        showMoreHandle.value = true;
    };
    
    await getMovieDetailService(route.params.movieId).then((res) => {
        Object.assign(movieDetail, res);
        getStar(res.score);
    });
    
    getStarService(route.params.movieId).then((res)=>{
        stars.push(...res);
    });
    
    if(movieDetail.label){
        getYourLikesService(movieDetail.label,movieDetail.classify).then(res=>{
            youLikes.push(...res);
        });
    }
    
    if(movieDetail.type){
        getMovieListByTypeService(movieDetail.type,movieDetail.classify).then(res=>{
            sameTypeList.push(...res);
        });
    }
    
    getRecommendService(movieDetail.classify).then(res=>{
        recommendList.push(...res);
    });
    
    return {
        scores,
        stars,
        youLikes,
        sameTypeList,
        recommendList,
        showMoreHandle,
        movieDetail,
        onMoreHandle,
        ...toRefs(movieDetail)
    }
}
