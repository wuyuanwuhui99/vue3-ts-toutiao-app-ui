<template>
    <div id="home">

        <div id="tab-wrapper">
            <div class="section"  v-show="bottomTabIndex == 0">
                <div class="nav-wrapper">
                    <ul class="nav-list">
                        <li class="nav-item" @click="tabArticleChannel(item)" :class="{'nav-item-active':articleState.activeId == item.id}" v-for="item,index in articleState.channels" :key="'nav-item-article'+index">
                            {{item.channelName}}
                        </li>
                    </ul>
                    <i class="iconfont iconfont-search"></i>
                </div>
                <div ref="articleScrollWrapper" class="scroll-wrapper">
                    <div class="scroll-container">
                        <div class="loading-box" v-if="!isInit"></div>
                        <ul class="articles">
                            <li class="article-item" @click="tabArticleChannel(item)" :key="'article-item'+index+activeId" v-for="item,index in articleState.list">
                                <p class="title">{{item.title}}</p>
                                <div class="img-wrapper" v-if="getImg(item).length > 0 && item.isTop != '1'">
                                    <div class="img-container" :class="{'img-container-video':item.type=='video'}" v-for="img,index in getImg(item).slice(0,4)" v-html="getImgHtml(img,getImg(item).length,index)"></div>
                                </div>
                                <div class="footer-wrapper">
                                    <span class="footer-item footer-item-top" v-if="item.isTop == '1'">置顶</span>
                                    <a class="footer-item">{{item.userId}}</a>
                                    <time class="footer-item">{{fomatTime(item.createTime)}}</time>
                                </div>
                            </li>
                        </ul>
                        <template v-if="articleState.list.length>0">
                            <div class="loading-tip" v-if="articleState.isEnd">已经到底了</div>
                            <div class="icon-loading" v-else></div>
                        </template>
                    </div>

                </div>
            </div>
            <div class="section" v-show="bottomTabIndex == 1">
                <div class="nav-wrapper">
                    <ul class="nav-list">
                        <li class="nav-item" @click="tabVideoChannel(item)"  :class="{'nav-item-active':videoState.activeChannelId == item.channelId}" v-for="item,index in videoState.channels" :key="'nav-item-video'+index">
                            {{item.channelName}}
                        </li>
                    </ul>
                    <i class="iconfont iconfont-search"></i>
                </div>
                <div ref="videoScrollWrapper" class="scroll-wrapper">
                    <div class="scroll-container">
                        <div class="loading-box" v-if="!videoState.isInit"></div>
                        <ul class="articles">
                            <li v-for="item,index in videoState.list" class="article-item" :key="'video-item'+index">
                                <div class="user-wrapper">
                                    <img class="avater" :src="item.user.avatarUrl"/>
                                    <div class="video-title-wrapper">
                                        <div class="sub-title">{{item.user.authorDesc}}</div>
                                        <div class="main-title">{{item.title}}</div>

                                    </div>
                                </div>
                                <div class="video-img-wrapper">
                                    <img :src="item.img" class="video-img">
                                </div>
                            </li>
                        </ul>
                        <template v-if="videoState.list.length>0">
                            <div class="loading-tip" v-if="isEnd">已经到底了</div>
                            <div class="icon-loading" v-else></div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="section" v-show="bottomTabIndex == 2">
                <div class="nav-wrapper">
                    <ul class="nav-list">
                        <li class="nav-item" @click="tabMovieChannel(item)"  :class="{'nav-item-active':movieState.activeClassify == item}" v-for="item,index in movieState.classifies" :key="'nav-item-movie'+index">
                            {{item}}
                        </li>
                    </ul>
                    <i class="iconfont iconfont-search"></i>
                </div>
                <div ref="videoScrollWrapper" class="scroll-wrapper">
                    <div class="scroll-container">
                        <div class="loading-box" v-if="!movieState.isInit"></div>
                        <ul class="articles">
                            <li v-for="item,index in videoState.list" class="article-item" :key="'movie-item'+index">

                            </li>
                        </ul>
                        <template v-if="movieState.list.length>0">
                            <div class="loading-tip" v-if="isEnd">已经到底了</div>
                            <div class="icon-loading" v-else></div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="section" v-show="bottomTabIndex == 3">

            </div>
        </div>

        <ul id="footer-tab-wrapper">
            <li class="footer-tab-item" :class="{'footer-tab-item-active':bottomTabIndex == 0}" @click="tabBottomNav(0)">
                <i class="iconfont iconfont-tab iconfont-tab-home"></i>
                <span class="tab-text">首页</span>
            </li>
            <li class="footer-tab-item" :class="{'footer-tab-item-active':bottomTabIndex == 1}" @click="tabBottomNav(1)">
                <i class="iconfont iconfont-tab iconfont-tab-video"></i>
                <span class="tab-text">视频</span>
            </li>
            <li class="footer-tab-item" :class="{'footer-tab-item-active':bottomTabIndex == 2}" @click="tabBottomNav(2)">
                <i class="iconfont iconfont-tab iconfont-tab-play"></i>
                <span class="tab-text">放映厅</span>
            </li>
            <li class="footer-tab-item" :class="{'footer-tab-item-active':bottomTabIndex == 3}" @click="tabBottomNav(3)">
                <i class="iconfont iconfont-tab iconfont-tab-my"></i>
                <span class="tab-text">我的</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {defineComponent,ref} from 'vue';
    import useArticleEffect from "../hooks/useArticleEffect";
    import {fomatTime} from "../utils";
    import useVideoEffect from "../hooks/useVideoEffect";
    import useMovieEffect from "../hooks/useMovieEffect";
    export default defineComponent({
        name: 'Home',
        async setup() {
            let bottomTabIndex = ref(0)
            const articleEffect = useArticleEffect()
            const videoEffect = useVideoEffect();
            const movieEffect = useMovieEffect()

            /**
             * @author: wuwenqiang
             * @description: 底部切换
             * @date: 2020-06-30 23:28
             */
            const tabBottomNav = async (index:number)=>{
                bottomTabIndex.value = index;
                if(index == 1 && !videoEffect.videoState.isInit){//获取视频分类和列表
                    videoEffect.useInitVideoEffect()
                }
            }

            await articleEffect.useInitArticleEffect()

            return {
                tabBottomNav,
                fomatTime,
                ...articleEffect,
                ...videoEffect,
                ...movieEffect,
                bottomTabIndex
            }
        }
    })
</script>
<style lang="less">
    @import "../common/style/variable.less";
    .img-wrapper{
        .img-container{
            max-width: 25%;
            max-height: 10rem;
            overflow: hidden;
            display: flex;
            flex: 1;
            margin-left: 0.5rem;
            position: relative;
            &.img-container-video{
                max-width: 100%;
                width: 100%;
                max-height: 20rem;
            }
            .iconfont-play{
                position: absolute;
                z-index: 1;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: @article-title-font-size;
            }
            .duration{
                position: absolute;
                bottom: 0.5rem;
                right: 0.5rem;
                color: #fff;
                z-index: 1;
                font-size: 0.8rem;
                background: rgba(0,0,0,0.3);
                border-radius: 0.2rem;
                padding:0.1rem 0.2rem;
            }
            .img-num{
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(0,0,0,0.3);
                color: #fff;
                font-size: @article-title-font-size;
                position: absolute;
                top: 0;
                height: 0;
                z-index: 1;
                width: 100%;
                height: 100%;
            }
            &:first-child{
                margin-left: 0;
            }
            img{
                width: 100%;
                height: auto;
            }
        }

    }
</style>
<style lang="less" scoped>
    @import "../common/style/variable.less";
    #home{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        #tab-wrapper{
            flex: 1;
            height: 100%;
            overflow: hidden;
        }
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
                .nav-list{
                    flex: 1;
                    white-space: nowrap;
                    overflow-x: auto;
                    display: flex;
                    padding: 1rem 1rem 0 1rem;
                    font-size: 1.2rem;
                    &::-webkit-scrollbar{
                        display: none;
                    }
                    .nav-item{
                        list-style: none;
                        margin:0 0.5rem;
                        padding-bottom: 1rem;
                        &:first-child{
                            margin-left: 0;
                        }
                        &.nav-item-active{
                            color: @color-active;
                            border-bottom: 2px solid @color-active;
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
                    padding: 1rem;
                    border-bottom: 1px solid @border-color;
                    .user-wrapper{
                        display: flex;
                        padding-bottom: 1rem;
                        .avater{
                            width: 3rem;
                            height: 3rem;
                            border-radius: 50%;
                        }
                        .video-title-wrapper{
                            flex: 1;
                            margin-left: 1rem;
                            max-width: calc(100% - 4rem);
                            .sub-title{
                                color:@color-icon;
                                font-size: @article-footer-font-size;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                padding-bottom: 0.5rem;
                                width: 100%;
                            }
                            .main-title{
                                width: 100%;
                            }
                        }
                    }
                    .video-img-wrapper{
                        position: relative;
                        .video-img{
                            width: 100%;
                        }
                    }
                    .title{
                        font-size: @article-title-font-size;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    .img-wrapper{
                        display: flex;
                        padding-top: 1rem;
                    }
                    .footer-wrapper{
                        font-size: @article-footer-font-size;
                        color: @article-footer-color;
                        flex-direction: row;
                        display: flex;
                        padding-top: 1rem;
                        .footer-item{
                            margin-left: 1rem;
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
        #footer-tab-wrapper{
            display: flex;
            border-top: 1px solid @border-color;
            padding: 0.5rem 0;
            .footer-tab-item{
                display: flex;
                flex: 1;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                &.footer-tab-item-active{
                    color: @color-active;
                }
                .iconfont-tab{
                    font-size: @iconfont-size;;
                }
            }
        }
    }

</style>
