import {toRefs,reactive} from "vue"
import {useRoute} from "vue-router";
import {
    getArticleService,
} from "../service/articleDetailService"
import BScroll from "better-scroll";
import {ArticleInterface} from "@/types";

export default ()=> {
    
    const articleDetailState = reactive({articleDetail:{}});
    
    const route = useRoute();
    
    const useInitArticleDetailEffect = async () => {
        articleDetailState.articleDetail = await getArticleService(route.params.id)
    };
    
    return {
        useInitArticleDetailEffect,
        articleDetailState
    }
}
