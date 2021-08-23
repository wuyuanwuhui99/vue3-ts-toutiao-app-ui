import {ReplyCommentInterface, TopCommentInterface} from "../types";
import {ref,reactive,onUnmounted} from "vue";
import emitter from "../utils/emitter";
import {
    getCommentCountService,
    getTopCommentListService,
    insertCommentService,
    getCommentItemService,
    getReplyCommentListService
} from "../service/handleService";
export default (type:string,id:number)=> {
    const commentCount = ref<number>(0);//评论条数
    const isDone = ref<boolean>(true);//是否已经加载所有与评论
    const topCommentList = reactive<Array<TopCommentInterface>>([]);//一级评论
    const placeholder = ref<string>("有爱评论，说点好听的~");
    const content = ref<string>("");
    let replyCommentItem:ReplyCommentInterface = <ReplyCommentInterface>{};
    let pageNum:number = 1;//评论的分页
    let pageSize:number = 20;
    
    /**
     * @author: wuwenqiang
     * @description: 显示评论
     * @date: 2021-08-21 14:16
     */
    getCommentCountService(type,id).then((res)=>{
        commentCount.value = res;
    });
    getTopCommentListService(type,id,pageNum,pageSize).then((res)=>{
        topCommentList.push(...res);
        if(res.length < pageSize)isDone.value = true;
    });
    
    /**
     * @author: wuwenqiang
     * @description: 发送评论
     * @date: 2021-08-22 14:10
     */
    const sendComment = async () => {
        const commentItem: ReplyCommentInterface = <ReplyCommentInterface>{};
        commentItem.parentId = replyCommentItem.id;
        commentItem.topId = replyCommentItem.topId || replyCommentItem.id;
        commentItem.content = content.value;
        if(type == "toutiao"){
            commentItem.articleId = id;
        }else if(type == "video"){
            commentItem.videoId = id;
        }else if(type == "movie"){
            commentItem.movieId = id;
        }
        commentItem.replyUserId = replyCommentItem.userId;
        let commmentId:number = -1;//新增之后返回的评论的id
        await insertCommentService(type, commentItem).then((res) => {
            if (res) content.value = "";
            commmentId = res;
            replyCommentItem = <ReplyCommentInterface>{};
        });
        getCommentItemService(type,commmentId).then((res)=>{
            if(res.topId){//如果是回复的评论
                let topCommentItem:any = topCommentList.find((item)=>item.id == res.topId);
                topCommentItem.replyList = topCommentItem.replyList || [];
                topCommentItem.replyList.push(res);
            }else{//如果是一级评论
                topCommentList.push(res);
            }
            placeholder.value = "有爱评论，说点好听的~";
        });
    };
    
    /**
     * @author: wuwenqiang
     * @description: 发送评论
     * @date: 2021-08-22 17:59
     */
    const useReply = (currentReplyComment:TopCommentInterface)=>{
        replyCommentItem = currentReplyComment;
        placeholder.value = `回复:${currentReplyComment.username}`
    };
    
    
    const useGetReplyCommentList = (commentItem:TopCommentInterface)=>{
        commentItem.pageNum = commentItem.pageNum || 1;
        commentItem.pageSize = commentItem.pageSize || 20;
        commentItem.replyList = commentItem.replyList || [];
        getReplyCommentListService(type,commentItem.id as number,commentItem.pageNum,commentItem.pageSize).then((res)=>{
            commentItem.isLoadAllReply = res.length < 20;
            commentItem.replyList.push(...res);
        });
    };
    
    emitter.emit("disable-scroll");//禁止滚动页面
    
    onUnmounted(()=>{
        emitter.emit("enable-scroll");//解除禁止滚动页面
    });
    
    return {
        commentCount,isDone,topCommentList,placeholder,sendComment,content,useReply,useGetReplyCommentList
    }
}
