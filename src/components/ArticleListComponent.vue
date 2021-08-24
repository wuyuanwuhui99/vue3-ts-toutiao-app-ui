<template>
    <ul class="articles">
        <li class="article-item" @click="useGoArticleDetail(item.id)" :key="'article-item'+index" v-for="item,index in articleList">
            <div class="title-wrapper">
                <p class="title">{{item.title}}</p>
                <div class="single-img" v-height v-if="item.imgList.length === 1" v-html="item.imgList[0]"></div>
            </div>
            <div class="img-wrapper" v-if="item.imgList.length > 1 && item.isTop != '1'">
                <div class="img-container" v-height :class="{'img-container-video':item.type=='video'}" v-for="img,index in item.imgList.slice(0,4)" v-html="getImgHtml(img,item.imgList.length,index)"></div>
            </div>
            <div class="footer-wrapper">
                <span class="footer-item footer-item-top" v-if="item.isTop == '1'">置顶</span>
                <a class="footer-item">{{item.authorInfo && item.authorInfo.name ? item.authorInfo.name : item.authorId}}</a>
                <time class="footer-item footer-item-time">{{item.createTime?fomatTime(item.createTime):""}}</time>
                <span class="iconfont iconfont-more" @click.stop="useShowHandle(index)"></span>
                <MoreHandleComponent v-if="showHandleIndex == index" :item="item" :type="'toutiao'"></MoreHandleComponent>
            </div>
        </li>
    </ul>
</template>

<script lang="ts">
    import {defineComponent,PropType} from "vue";
    import {ArticleInterface} from '../types'
    import MoreHandleComponent from "./MoreHandleComponent.vue";
    import useArticleListEffect from "../hooks/useArticleListEffect";
    export default defineComponent({
        name: 'ArticleListComponent',
        props:{
            articleList:{
                type:Array as PropType<ArticleInterface[]>,
                required:true
            }
        },
        components:{MoreHandleComponent},
        directives: {
            height: {
                mounted(el) {
                    el.style.height = `${el.offsetWidth*0.75}px`
                }
            },
        },
        setup(){
            return {
                ...useArticleListEffect()
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
                    &.footer-item-time{
                        flex: 1;
                    }
                }
            }
        }
    }
</style>
