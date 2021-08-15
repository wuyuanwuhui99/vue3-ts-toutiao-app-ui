<template>
    <ul class="articles">
        <li class="article-item" @click="goArticleDetail(item.id)" :key="'article-item'+index+activeId" v-for="item,index in articleList">
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
                <time class="footer-item">{{item.createTime?fomatTime(item.createTime):""}}</time>
            </div>
        </li>
    </ul>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import {fomatTime,getImgHtml} from "../utils";
    import { useRouter } from "vue-router";
    export default defineComponent({
        name: 'ArticleList',
        props:{
            articleList:{
                type:Array,
                required:true
            }
        },
        directives: {
            height: {
                mounted(el) {
                    el.style.height = `${el.offsetWidth*0.75}px`
                }
            },
        },
        setup(){
            const router = useRouter();
            const goArticleDetail = (id:number)=>{
                router.push(`/articleDetail/${id}`);
            };
            return {fomatTime,getImgHtml,goArticleDetail}
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
                }
            }
        }
    }
</style>
