import {reactive,ref} from "vue"
import {useRoute} from "vue-router";
import {
    getArticleService,
    isFocusService,
    insertFocusService,
    deleteFocusService,
} from "../service/articleDetailService"
import {ArticleInterface} from "@/types";

export default ()=> {
    
    const articleDetail = reactive(<ArticleInterface>{});
    const isFocus = ref<boolean>(false);
    const route:any = useRoute();
    
    const useInitArticleDetailEffect = async () => {
        const result = await getArticleService(route.params.id);
        Object.assign(articleDetail,result);
        isFocusService(articleDetail.authorId,"article").then((res)=>{
            isFocus.value = res > 0;
        })
    };
    
    const useHandleFocus =()=>{
        if(isFocus.value){
            deleteFocusService(articleDetail.authorId,"article").then((res)=>{
                isFocus.value = !(res > 0)
            });
        }else{
            insertFocusService(articleDetail.authorId,"article").then((res)=>{
                isFocus.value = res > 0;
            });
        }
    };
    
    return {
        useInitArticleDetailEffect,
        articleDetail,
        isFocus,
        useHandleFocus
    }
}
