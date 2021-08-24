<template>
    <ul class="articles">
        <li v-for="item,index in videoList" class="article-item" :key="'video-item'+index">
            <div class="video-img-wrapper">
                <div class="main-title">{{item.title}}</div>
                <img :src="item.img" class="video-img">
                <i class="iconfont iconfont-play"></i>
            </div>
            <div class="author-wrapper">
                <img class="avater" v-if="item.authorInfo.avatarUrl" :src="item.authorInfo.avatarUrl"/>
                <div class="sub-title" v-if="item.authorInfo.authorDesc">{{item.authorInfo.authorDesc}}</div>
                <span class="video-time">{{fomatTime(item.publishTime)}}</span>
                <span class="iconfont iconfont-more" @click.stop="useShowHandle(index)"></span>
                <MoreHandleComponent v-if="showHandleIndex == index" :item="item" :type="'video'"></MoreHandleComponent>
            </div>
        </li>
    </ul>
</template>

<script lang="ts">
    import {defineComponent,PropType} from "vue";
    import {VideoInterface} from '../types';
    import MoreHandleComponent from "./MoreHandleComponent.vue";
    import useVideoListEffect from "../hooks/useVideoListEffect";
    export default defineComponent({
        name: 'VideoListComponent',
        components:{MoreHandleComponent},
        props:{
            videoList:{
                type:Array as PropType<VideoInterface[]>,
                required:true
            }
        },
        setup(){
            return {
                ...useVideoListEffect()
            }
        }
    })
</script>

<style lang="less" scoped>
    @import "../common/style/variable.less";
    .articles{
        display: flex;
        flex-direction: column;
        .article-item{
            padding: @big-margin;
            border-bottom: @border;
            .author-wrapper{
                display: flex;
                margin-top: @small-margin;
                align-items: center;
                position: relative;
                .handle-wrapper{
                    position: absolute;
                    z-index: 1;
                    background: #666;
                    padding: @small-margin;
                    right: 2rem;
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
                .avater{
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                }

                .sub-title{
                    color:@color-icon;
                    font-size: @article-footer-font-size;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding: 0 1rem;
                    max-width: 10rem;
                }
                .video-time{
                    color: @color-icon;
                    flex: 1;
                }
                .iconfont-more{
                    color: @color-icon;
                }

            }
            .video-img-wrapper{
                position: relative;
                .video-img{
                    width: 100%;
                }
                .main-title{
                    width: 100%;
                    position: absolute;
                    top:@small-margin;
                    left: @small-margin;
                    color: #fff;
                }
                .iconfont-play{
                    position: absolute;
                    left: calc(50% - 1.5rem);
                    top: calc(50% - 1.5rem);
                    width: 3rem;
                    height: 3rem;
                    z-index: 1;
                    font-size: @iconfont-size;
                    text-align: center;
                    line-height: 3rem;
                    color: #fff;
                    opacity: 0.8;
                }
            }
            .video-footer{
                padding-top: @big-margin;
                .icon-video-footer{
                    font-size: 1.4rem;
                    margin-left: @big-margin;
                    &:first-child{
                        margin-left: 0;
                    }
                }
                .video-time{
                    float: right;
                    color: @article-footer-color;
                }
            }

            .title-wrapper{
                display: flex;
                .title{
                    font-size: @article-title-font-size;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    flex: 1;
                }
                .single-img{
                    margin-left: @small-margin;
                    overflow: hidden;
                    width: 25%;
                }
            }
            .img-wrapper{
                display: flex;
                padding-top: @big-margin;
            }
            .footer-wrapper{
                font-size: @article-footer-font-size;
                color: @article-footer-color;
                flex-direction: row;
                display: flex;
                padding-top: @big-margin;
                align-items: center;
                .footer-item{
                    margin-left: @big-margin;
                    &:first-child{
                        margin-left: 0;
                    }
                    &.footer-item-top{
                        color: @color-active;
                    }
                }
            }
        }
    }
</style>
