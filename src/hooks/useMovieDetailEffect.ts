import {reactive,toRefs} from "vue";
import {getMovieDetailService} from "../service/movieDetailService";
import {useRoute} from "vue-router";
import {MovieInterface} from "@/types";
export default  async () => {
    const stars = reactive<Array<string>>([]);
    const route: any = useRoute();
    const movieDetail = reactive<MovieInterface>(<MovieInterface>{});
    /**
     * @author: wuwenqiang
     * @description: 显示点赞评论收藏的操作框
     * @date: 2021-08-25 21:44
     */
    const getStar = (score: number) => {
        for (let i = 0; i < 5; i++) {
            if ((i + 1) * 2 < score) {
                stars.push("full")
            } else if ((i + 1) * 2 > score && i * 2 < score) {
                stars.push("half")
            } else {
                stars.push("empty")
            }
        }
    };
    
    getStar(5.8);
    
    await getMovieDetailService(route.params.movieId).then((res) => {
        Object.assign(movieDetail, res);
        getStar(res.score)
    });
    
    return {
        stars,
        ...toRefs(movieDetail)
    }
}
