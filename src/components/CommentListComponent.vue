<template>
    <div class="comment-wrapper">
        <div class="comment-header">{{commentCount}}条评论</div>
        <div class="comment-list-wrapper">
            <ul class="comment-list">
                <li class="comment-item" v-for="tItem,tIndex in topCommentList" :key="'comment-item'+tIndex">
                    <img :src="tItem.avater" class="comment-avater"/>
                    <div class="comment-detail">
                        <div class="comment-username">{{tItem.username}}</div>
                        <div class="comment-content">{{tItem.content}}</div>
                        <div class="comment-time">
                            <span>{{tItem.createTime.replace(/^\d{1,4}-/,"")}}</span>
                            <span class="reply-btn" @click="useReply(tItem)">回复</span>
                        </div>
                        <div class="reply-tip" v-if="tItem.replyCount > 0 && !tItem.isLoadAllReply" @click="useGetReplyCommentList(tItem)">展开{{tItem.replyCount}}条回复</div>
                        <ul class="reply-wrapper" v-if="tItem.replyList">
                            <li class="reply-item"  v-for="rItem,rIndex in tItem.replyList" :key="'comment-item'+index">
                                <img class="small-avater" :src="rItem.avater"/>
                                <div class="reply-detail">
                                    <div class="reply-username">
                                        <span>{{rItem.username}}</span>
                                        <i class="iconfont iconfont-arrow"></i>
                                        <span>{{rItem.replyUserName}}</span>
                                    </div>
                                    <div class="reply-content">{{rItem.content}}</div>
                                    <div class="comment-time">
                                        <span class="reply-time">{{rItem.createTime.replace(/^\d{1,4}-/,"")}}</span>
                                        <span class="reply-btn" @click="useReply(rItem)">回复</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="reply-tip" v-if="!tItem.isLoadAllReply && tItem.replyList && tItem.replyList.length > 0" @click="useGetReplyCommentList(tItem)">展开查看更多回复</div>
                    </div>
                </li>
            </ul>
            <div class="comment-footer" v-if="!isDone">点击查看更多评论</div>
        </div>

        <div class="input-wrapper">
            <input class="content-input" :placeholder="placeholder" v-model="content"/>
            <button class="send-btn" @click="sendComment">发送</button>
        </div>
    </div>

</template>

<script lang="ts">
    import {PropType} from "vue"
    import {CommentListPropsInterface} from "../types";
    import useCommentEffect from "../hooks/useCommentEffect";
    export default {
        name: 'CommentListComponent',
        props:{
            type:{
                type:String as PropType<string>,
                default:""
            },
            id:{
                type:Number as PropType<number>,
                default:-1
            }
        },
        setup(props:CommentListPropsInterface){
            const commentState = useCommentEffect(props.type,props.id);
            return {...commentState};
        }
    }
</script>

<style lang="less" scoped>
    @import "../common/style/variable.less";
    .comment-wrapper{
        flex: 1;
        background: #fff;
        display: flex;
        flex-direction: column;
        overflow: auto;
        border-top:@border;
        &::-webkit-scrollbar{
            display: none;
        }
        .comment-header,.comment-footer{
            text-align: center;
            padding-top: @small-margin;
        }
        .comment-list-wrapper{
            flex: 1;
            overflow: auto;
            &::-webkit-scrollbar{
                display: none;
            }
            .comment-list{
                padding: @big-margin;
                .comment-item{
                    display: flex;
                    padding-top: @big-margin;
                    &:first-child{
                        padding-top: 0;
                    }
                    .comment-avater{
                        width: @middle-avater-size;
                        height: @middle-avater-size;
                        border-radius: @circle-avater;
                    }
                    .reply-tip{
                        color: #888;
                        font-size: 0.8rem;
                        padding-top: @small-margin;
                    }
                    .comment-time{
                        color: #888;
                        font-size: 0.8rem;
                        .reply-btn{
                            font-weight: bold;
                            padding-left: 0.3rem;
                        }
                    }
                    .comment-detail{
                        flex: 1;
                        padding-left: @big-margin;
                        .comment-username{
                            color: #888;
                            font-weight: bold;
                            font-size: 0.85rem;
                        }

                        .reply-wrapper{
                            display: flex;
                            flex-direction: column;
                            .reply-item{
                                padding-top: @small-margin;
                                display: flex;
                                .small-avater{
                                    width: @small-avater-size;
                                    height: @small-avater-size;
                                    border-radius: @circle-avater;
                                }
                                .reply-detail{
                                    flex: 1;
                                    padding-left: @small-margin;
                                    .reply-username{
                                        color: #888;
                                        font-size: 0.8rem;
                                        font-weight: bold;
                                        .reply-btn{
                                            font-weight: bold;
                                            padding-left: 0.3rem;
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }
        .input-wrapper{
            border-top: @border;
            padding: @big-margin;
            display: flex;
            .content-input{
                flex: 1;
                border-radius: 1rem;
                padding-left: @small-margin;
                background: #eee;
                outline: none;
            }
            .send-btn{
                outline: none;
                background: #1890ff;
                color: #fff;
                padding: @small-margin;
                border: none;
                border-radius: 0.5rem;
                margin-left: @small-margin;
            }
        }
    }

</style>
