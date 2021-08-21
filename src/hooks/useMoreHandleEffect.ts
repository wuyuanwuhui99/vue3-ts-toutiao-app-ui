import {MixinInterface} from "@/types";
import {ref} from "vue";
import {
    isFavoriteService,
    isLikeService,
    deleteLikeService,
    insertLikeService,
    deleteFavoriteService,
    insertFavoriteService
} from "../service/handleService";
export default (item:MixinInterface,type:string)=> {
    const isFavorite = ref<boolean>(false);
    const isLike = ref<boolean>(false);
    const showComment = ref<boolean>(false);
    /**
     * @author: wuwenqiang
     * @description: 显示点赞评论收藏的操作框
     * @date: 2021-08-15 16:20
     */
    const useShowHandle = ()=>{
        isFavoriteService(type,item.id).then(res=> isFavorite.value = res > 0);
        isLikeService(type,item.id).then(res => isLike.value = res > 0);
    };
    
    /**
     * @author: wuwenqiang
     * @description: 点赞
     * @date: 2021-08-15 16:20
     */
    const useHandleLike =()=>{
        if(isLike.value){
            deleteLikeService(type,item.id).then(res=> isLike.value = !(res > 0));
        }else{
            insertLikeService(type,item.id).then(res=> isLike.value = res > 0);
        }
    };
    
    /**
     * @author: wuwenqiang
     * @description: 点赞
     * @date: 2021-08-18 19:57
     */
    const useHandleFavorite = ()=>{
        if(isFavorite.value){
            deleteFavoriteService(type,item.id).then(res=> isFavorite.value = !(res > 0));
        }else{
            insertFavoriteService(type,item.id).then(res=> isFavorite.value = res > 0);
        }
    };
    
    /**
     * @author: wuwenqiang
     * @description: 显示评论
     * @date: 2021-08-21 14:16
     */
    const useShowComment = (isShow:boolean)=>{
        showComment.value = isShow;
    };
    
    useShowHandle();
    
    
    return {
        useHandleFavorite,useHandleLike,isFavorite,isLike,useShowComment,showComment
    }
}
