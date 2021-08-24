import {useRouter} from "vue-router";
import {ref,onUnmounted} from "vue";
import emitter from "../utils/emitter"
import {fomatTime,getImgHtml} from "../utils";
export default ()=> {
    const showHandleIndex = ref<number>(-1);
    const router = useRouter();
    const useGoArticleDetail = (id:number)=>{
        router.push(`/articleDetail/${id}`);
    };
    /**
     * @author: wuwenqiang
     * @description: 显示点赞评论收藏的操作框
     * @date: 2021-08-15 16:20
     */
    const useShowHandle = (index:number)=>{
        showHandleIndex.value = index;
    };
    /**
     * @author: wuwenqiang
     * @description: 点击了其他地方，因此点赞评论操作框
     * @date: 2021-08-15 16:20
     */
    const useHandleArticle = ()=>{
        showHandleIndex.value = -1;
    };
    
    emitter.$on("bodyClick",useHandleArticle);
    
    onUnmounted(()=>{
        emitter.$off("bodyClick",useHandleArticle)
    });
    
    return {fomatTime,useGoArticleDetail,showHandleIndex,useShowHandle,getImgHtml}
}
