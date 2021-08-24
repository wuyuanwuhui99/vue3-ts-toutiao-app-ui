<template>
    <div  @click.stop="" class="more-wrapper">
        <div class="handle-wrapper" v-if="!showComment">
            <span class="iconfont iconfont-handle iconfont-like" :class="isLike?'iconfont-like-active':'iconfont-like'" @click="useHandleLike"></span>
            <span class="iconfont iconfont-handle" @click="useHandleFavorite" :class="isFavorite?'iconfont-has-collection':'iconfont-no-collection'"></span>
            <span class="iconfont iconfont-handle iconfont-comment" @click="useShowComment"></span>
        </div>
        <div class="comment-container" v-else ref="commentContainer">
            <div class="mask" @click="useHideComment"></div>
            <CommentListComponent style="flex: 1" :type="type" :id="item.id"></CommentListComponent>
        </div>
    </div>
</template>

<script lang="ts">
    import {PropType} from "vue";
    import {MixinInterface,HandlePropsInterface} from "../types"
    import useMoreHandleEffect from "../hooks/useMoreHandleEffect";
    import CommentListComponent from "./CommentListComponent.vue";
    export default {
        name: 'MoreHandleComponent',
        components:{CommentListComponent},
        props:{
            type:{
                type:String as PropType<string>,
                default:""
            },
            item:{
                type:Object as PropType<MixinInterface>,
                default: ()=><MixinInterface>{}
            }
        },
        setup(props:HandlePropsInterface){
            const moreHandleState = useMoreHandleEffect(props.item,props.type);
            return {
                ...moreHandleState
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../common/style/variable.less";
    .comment-container{
        position: fixed;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        z-index: 2;
        display: flex;
        flex-direction: column;
        .mask{
            width: 100%;
            height: 39%;
            background: rgba(0,0,0,0.2);
        }
    }
    .more-wrapper{
        position: absolute;
        z-index: 2;
        right: 2rem;
        .handle-wrapper{
            background: #666;
            padding: @small-margin;
            border-radius: @border-raduis;
            .iconfont-handle{
                margin-left: @big-margin;
                color:#fff;
                font-size: @article-title-font-size;
                &:first-child{
                    margin-left:0;
                }
            }
        }

    }

</style>
