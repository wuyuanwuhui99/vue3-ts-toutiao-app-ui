<template>
    <div class="section" style="background: #f9f9f9">
        <div class="scroll-wrapper">
            <div class="module-wrapper">
                <div id="my-avater-wrapper">
                    <img :src="userData.avater" id="my-avater-img"/>
                    <div id="user-info">
                        <div id="user-name">{{userData.username}}</div>
                        <div id="user-sign">{{userData.sign}}</div>
                    </div>
                    <i class="iconfont icon-edit"></i>
                </div>
            </div>
            <div class="module-wrapper">
                <ul id="person-data">
                    <li class="person-item">
                        <span class="summary-data">10</span>
                        <span class="summary-title">关注</span>
                    </li>
                    <li class="person-item">
                        <span class="summary-data">25</span>
                        <span class="summary-title">收藏</span>
                    </li>
                    <li class="person-item">
                        <span class="summary-data">100</span>
                        <span class="summary-title">粉丝</span>
                    </li>
                    <li class="person-item">
                        <span class="summary-data">200万</span>
                        <span class="summary-title">获赞</span>
                    </li>
                </ul>
            </div>
            <div class="module-wrapper">
                <ul class="classify-wrapper">
                    <li class="classify-item" @click="goRouter('toutiao')">
                        <div class="title-wrapper">
                            <span>浏览过的文章</span>
                            <i class="iconfont iconfont-jiantou"></i>
                        </div>
                    </li>
                    <li class="classify-item" @click="goRouter('video')">
                        <div class="title-wrapper">
                            <span>浏览过的视频</span>
                            <i class="iconfont iconfont-jiantou"></i>
                        </div>
                    </li>
                    <li class="classify-item" @click="goRouter('movie')">
                        <div class="title-wrapper">
                            <span>观看过的影片</span>
                            <i class="iconfont iconfont-jiantou"></i>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="module-wrapper">
                <ul class="classify-wrapper">
                    <li class="classify-item">
                        <div class="title-wrapper">
                            <span>收藏的文章</span>
                            <i class="iconfont iconfont-jiantou"></i>
                        </div>
                    </li>
                    <li class="classify-item">
                        <div class="title-wrapper">
                            <span>收藏的视频</span>
                            <i class="iconfont iconfont-jiantou"></i>
                        </div>
                    </li>
                    <li class="classify-item">
                        <div class="title-wrapper">
                            <span>收藏的影片</span>
                            <i class="iconfont iconfont-jiantou"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import useMyTabEffect from "../hooks/useMyTabEffect";
    import {fomatTime} from "../utils";
    import state from "../store/state";
    export default defineComponent({
        name: 'MyTabComponent',
        setup(){
            const myEffect = useMyTabEffect();
            return {
                fomatTime,
                userData:state.userData,
                ...myEffect
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
            .module-wrapper{
                &:first-child{
                    margin-top: @big-margin;
                }
                margin: 0rem @big-margin @big-margin;
                padding: 1rem;
                border-radius: 1rem;
                background: #fff;
                #my-avater-wrapper{
                    display: flex;
                    align-items: center;
                    #my-avater-img{
                        height: 3rem;
                        width: 3rem;
                        border-radius: 50%;
                        border: 2px solid @color-active;
                    }
                    #user-info{
                        flex: 1;
                        padding-left: @big-margin;
                        #user-name{
                            font-weight: bold;
                        }
                        #user-sign{
                            padding-top: @small-margin;
                            color:@color-icon;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }
                    .iconfont-set{
                        color: @color-icon;
                    }
                }
                #person-data{
                    display: flex;
                    .person-item{
                        flex-direction: column;
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .summary-data{
                            font-size: @article-title-font-size;
                        }
                        .summary-title{
                            font-size: @article-footer-font-size;
                            color: @article-footer-color;
                        }
                    }
                }
                .classify-wrapper{
                    .classify-item{
                        margin-bottom: @big-margin;
                        border-bottom: @border;
                        &:last-child{
                            border-bottom: none;
                            margin-bottom: 0;
                        }
                        .title-wrapper{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            padding-bottom: @big-margin;
                        }
                    }
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
