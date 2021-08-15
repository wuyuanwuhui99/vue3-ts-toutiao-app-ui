<template>
    <div class="section" v-show="bottomTabIndex == 2">
        <div class="nav-wrapper">
            <div class="nav-list-scroll" ref="movieNavScroll">
                <ul class="nav-list">
                    <li class="nav-item" @click="tabMovieChannel(item)"  :class="{'nav-item-active':activeClassify == item}" v-for="item,index in classifies" :key="'nav-item-movie'+index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <i class="iconfont iconfont-search"></i>
        </div>
        <div ref="movieScrollWrapper" class="scroll-wrapper">
            <div class="scroll-container">
                <div class="loading-box" v-if="!isInit"></div>
                <ul class="movie-wrapper">
                    <li v-for="item,index in list" class="movie-item" :key="'movie-item'+index">
                        <div class="movie-img-wrapper">
                            <img class="movie-img" :src="item.localImg"/>
                            <span class="movie-state" v-if="item.viewingState">{{item.viewingState}}</span>
                        </div>

                        <div class="movie-name">{{item.movieName}}</div>
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
    import useMovieEffect from "../hooks/useMovieEffect";
    import {fomatTime} from "../utils";
    export default defineComponent({
        name: 'MovieTab',
        setup(){
            const movieEffect = useMovieEffect();
            movieEffect.useInitMovieEffect();
            return {
                fomatTime,
                ...movieEffect
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
                .movie-wrapper{
                    display: flex;
                    flex-wrap: wrap;
                    padding: @big-margin;
                    .movie-item{
                        width: calc((100% - 1rem)/3);
                        margin-bottom: @big-margin;
                        display: flex;
                        flex-direction: column;
                        margin-left: @small-margin;
                        &:nth-child(3n+1){
                            margin-left: 0;
                        }
                        .movie-img-wrapper{
                            flex: 1;
                            position: relative;
                            .movie-img{
                                width: 100%;
                                height: 100%;
                                border-radius: @border-raduis;
                            }
                            .movie-state{
                                position: absolute;
                                bottom: 0.2rem;
                                right: 0.2rem;
                                background: #4cce69;
                                color:#fff;
                                border-radius: 0.2rem;
                                font-size: 0.8rem;
                                padding: 0 0.2rem;
                            }
                        }

                        .movie-name{
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
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
