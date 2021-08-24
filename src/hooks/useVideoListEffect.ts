import {ref,onUnmounted} from "vue";
import emitter from "../utils/emitter";
import {fomatTime} from "../utils";
export default ()=> {
    const showHandleIndex = ref<number>(-1);
    
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
    const useHandleVideo = ()=>{
        showHandleIndex.value = -1;
    };
    
    emitter.$on("bodyClick",useHandleVideo);
    
    onUnmounted(()=>{
        emitter.$off("bodyClick",useHandleVideo)
    });
    
    return {useShowHandle,showHandleIndex,fomatTime}
}
