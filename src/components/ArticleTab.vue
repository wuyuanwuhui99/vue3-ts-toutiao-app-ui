<template>
    <div class="section">
        <div class="nav-wrapper">
            <div class="nav-list-scroll" ref="articleNavScroll">
                <ul class="nav-list">
                    <li class="nav-item" @click="tabArticleChannel(item)" :class="{'nav-item-active':activeId == item.id}" v-for="item,index in channels" :key="'nav-item-article'+index">
                        {{item.channelName}}
                    </li>
                </ul>
            </div>

            <i class="iconfont iconfont-search"></i>
        </div>
        <div ref="articleScrollWrapper" class="scroll-wrapper">
            <div class="scroll-container">
                <div class="loading-box" v-if="!isInit"></div>
                <ArticleList :articleList="list"></ArticleList>
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
    import useArticleEffect from "../hooks/useArticleEffect";
    import ArticleList from "./ArticleList.vue";
    export default defineComponent({
        name: 'ArticleTab',
        components:{
            ArticleList
        },
        setup(){
            const articleEffect = useArticleEffect();
            articleEffect.useInitArticleEffect();

            return {
                ...articleEffect
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
