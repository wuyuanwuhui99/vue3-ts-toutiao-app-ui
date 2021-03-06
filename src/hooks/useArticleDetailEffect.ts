import {reactive,ref} from "vue"
import {useRoute} from "vue-router";
import {
    getArticleService,
    isFocusService,
    insertFocusService,
    deleteFocusService,
} from "../service/articleDetailService"
import {ArticleInterface} from "../types";

export default ()=> {
    
    const articleDetail = reactive(<ArticleInterface>{});
    const isFocus = ref<boolean>(false);
    const route:any = useRoute();
    
    const useInitArticleDetail = async () => {
        const result = await getArticleService(route.params.id);
        Object.assign(articleDetail,result);
        isFocusService(articleDetail.authorId,"toutiao").then((res)=>{
            isFocus.value = res > 0;
        })
    };
    
    const useHandleFocus =()=>{
        if(isFocus.value){
            deleteFocusService(articleDetail.authorId,"toutiao").then((res)=>{
                isFocus.value = !(res > 0)
            });
        }else{
            insertFocusService(articleDetail.authorId,"toutiao").then((res)=>{
                isFocus.value = res > 0;
            });
        }
    };
    
    return {
        useInitArticleDetail,
        articleDetail,
        isFocus,
        useHandleFocus
    }
}
