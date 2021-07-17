<template>
    <div id="detail-wrapper">
        <div id="article-wrapper">
            <div id="article-title">{{articleDetail.title}}</div>
            <div id="article-meta">
                <div id="article-author">
                    <img id="author-avater" v-if="articleDetail.userInfo && articleDetail.userInfo.avatarUrl" :src="articleDetail.userInfo.avatarUrl"/>
                    <div id="article-user-wrapper">
                        <div id="acticle-user">{{articleDetail.userInfo && articleDetail.userInfo.name ? articleDetail.userInfo.name: articleDetail.userId}}</div>
                        <div>{{fomatTime(articleDetail.createTime)}}</div>
                    </div>
                </div>
            </div>
            <article id="article-text" v-html="articleDetail.content"></article>
        </div>
        <div id="footer-wrapper"></div>
    </div>
</template>

<script>
    import {defineComponent} from 'vue';
    import useArticleDetailEffect from "../hooks/useArticleDetailEffect";
    import {fomatTime} from "../utils";
    export default defineComponent({
        name: 'ArticleDetail',
        setup() {
            const {articleDetail,useInitArticleDetailEffect} = useArticleDetailEffect();

            useInitArticleDetailEffect()

            return {
                articleDetail,
                fomatTime
            }
        }
    })
</script>
<style>
    .syl-page-article img.syl-page-img:not(.ignore-img) {
        max-width: 100%;
        display: block;
        border-radius: 4px;
        margin: 0 auto 8px;
    }
</style>
<style lang="less" scoped>
    @import "../common/style/variable.less";
    #detail-wrapper{
        display: flex;
        flex-direction: column;
        #article-wrapper{
            flex: 1;
            padding: 1rem;
            #article-title{
                font-size: @article-title-font-size;
                padding-bottom: 1rem;
            }
            #article-meta{
                color: @article-footer-color;
                font-size: @article-footer-font-size;
                padding-bottom: 1rem;
                display: flex;
                align-items: center;
                #article-author{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    #author-avater{
                        width: 3rem;
                        height: 3rem;
                        border-radius: 50%;
                        margin-right: 1rem;
                    }
                    #article-user-wrapper{
                        flex: 1;
                    }
                }
            }
        }
    }

</style>
