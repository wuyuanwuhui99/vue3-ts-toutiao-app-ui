<template>
    <div class="section" v-show="bottomTabIndex == 1">
        <div class="nav-wrapper">
            <div class="nav-list-scroll" ref="videoNavScroll">
                <ul class="nav-list">
                    <li class="nav-item" @click="tabVideoChannel(item)"  :class="{'nav-item-active':activeChannelId == item.channelId}" v-for="item,index in channels" :key="'nav-item-video'+index">
                        {{item.channelName}}
                    </li>
                </ul>
            </div>
            <i class="iconfont iconfont-search"></i>
        </div>
        <div ref="videoScrollWrapper" class="scroll-wrapper">
            <div class="scroll-container">
                <div class="loading-box" v-if="!isInit"></div>
                <ul class="articles">
                    <li v-for="item,index in list" class="article-item" :key="'video-item'+index">
                        <div class="video-img-wrapper">
                            <div class="main-title">{{item.title}}</div>
                            <img :src="item.img" class="video-img">
                            <i class="iconfont iconfont-play"></i>
                        </div>
                        <div class="author-wrapper">
                            <img class="avater" v-if="item.authorInfo.avatarUrl" :src="item.authorInfo.avatarUrl"/>
                            <div class="sub-title" v-if="item.authorInfo.authorDesc">{{item.authorInfo.authorDesc}}</div>
                            <span class="video-time">{{fomatTime(item.publishTime)}}</span>
                            <span class="iconfont iconfont-more" @click.stop="showHandle(item,index)"></span>
                            <div class="handle-wrapper" v-if="showHandleIndex == index">
                                <span class="iconfont iconfont-handle iconfont-like" @click.stop="handleLike"></span>
                                <span class="iconfont iconfont-handle" :class="item.isFavorite?'iconfont-has-collection':'iconfont-no-collection'"></span>
                                <span class="iconfont iconfont-handle iconfont-comment"></span>
                            </div>
                        </div>
                    </li>
                </ul>
                <template v-if="list.length>0">
                    <div class="loading-tip" v-if="isEnd">已经到底了</div>
                    <div class="icon-loading" v-else></div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import useVideoEffect from "../hooks/useVideoEffect";
    import {fomatTime} from "../utils";
    export default defineComponent({
        name: 'VideoTab',
        setup(){
            const videoEffect = useVideoEffect();
            videoEffect.useInitVideoEffect();
            return {
                fomatTime,
                ...videoEffect
            }
        }
    })
</script>

<style lang="less" scoped>
    @import "../common/style/variable.less";
    .section{
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        .scroll-wrapper{
            flex: 1;
            overflow: auto;
            position: relative;
            &::-webkit-scrollbar{
                display: none;
            }
            .scroll-container{
                min-height: 100%;
                position: relative;
                .loading-box{
                    z-index: 1;
                    width: 100%;
                    height: 100%;
                    background-image: url("../assets/icon-loading.gif");
                    background-repeat: no-repeat;
                    background-position: center center;
                    position: absolute;
                }
            }
        }
        .nav-wrapper{
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ddd;
            min-height: 3rem;
            .nav-list-scroll{
                flex: 1;
                overflow-x: hidden;
                .nav-list{
                    display: flex;
                    float: left;
                    padding: @big-margin @big-margin 0 @big-margin;
                    font-size: 1.2rem;
                    white-space: nowrap;
                    &::-webkit-scrollbar{
                        display: none;
                    }
                    .nav-item{
                        list-style: none;
                        margin:0 @small-margin;
                        padding-bottom: @big-margin;
                        moz-user-select: -moz-none;
                        -moz-user-select: none;
                        -o-user-select:none;
                        -khtml-user-select:none;
                        -webkit-user-select:none;
                        -ms-user-select:none;
                        user-select:none;
                        &:first-child{
                            margin-left: 0;
                        }
                        &.nav-item-active{
                            color: @color-active;
                            border-bottom: 2px solid @color-active;
                        }
                    }
                }
            }

            .iconfont-search{
                font-size: @iconfont-size;
                margin: @iconfont-margin;
            }

        }
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
        .icon-loading{
            height: 10rem;
            background-image: url("../assets/icon-loading.gif");
            background-repeat: no-repeat;
            background-position: center center;
        }
        .loading-tip{
            line-height: 10;
            text-align: center;
        }
    }
</style>
