<template>
    <div id="detail-wrapper">
        <div id="article-wrapper">
            <div id="article-title">{{articleDetail.title}}</div>
            <div id="article-meta">
                <div id="article-userInfo">
                    <img id="article-avater" v-if="articleDetail.authorInfo && articleDetail.authorInfo.avatarUrl" :src="articleDetail.authorInfo.avatarUrl"/>
                    <div id="acticle-user">{{articleDetail.authorInfo && articleDetail.authorInfo.name ? articleDetail.authorInfo.name: articleDetail.authorId}}</div>
                    <div v-if="articleDetail.createTime">{{fomatTime(articleDetail.createTime)}}</div>
                </div>
                <div id="button-focus" :class="{'button-focus-active':isFocus}" @click="useHandleFocus">{{isFocus?"已关注":"关注"}}</div>
            </div>
            <article id="article-text" v-html="articleDetail.content"></article>
        </div>
        <div id="footer-wrapper"></div>
    </div>
</template>

<script lang="ts">
    import {defineComponent,toRefs} from 'vue';
    import useArticleDetailEffect from "../hooks/useArticleDetailEffect";
    import {fomatTime} from "../utils";
    export default defineComponent({
        name: 'ArticleDetail',
        setup() {
            const articleState = useArticleDetailEffect();

            articleState.useInitArticleDetailEffect();

            return {
                ...articleState,
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
                padding-bottom: @small-margin;
                display: flex;
                align-items: center;
                #article-userInfo{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    #acticle-user{
                        margin:0 @small-margin;
                    }
                    #article-avater{
                        width: 2rem;
                        height: 2rem;
                        border-radius: 50%;
                    }
                }
                #button-focus{
                    border:@border;
                    border-radius: @border-raduis;
                    padding:0.3rem @small-margin;
                    color: @article-footer-color;
                    &.button-focus-active{
                        color: @color-active;
                        border-color: @color-active;
                    }
                }
            }
        }
    }

</style>
