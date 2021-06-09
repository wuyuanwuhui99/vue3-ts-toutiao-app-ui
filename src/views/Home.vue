<template>
    <div id="home">
        <div id="nav-wrapper">
            <ul id="nav-list">
                <li class="nav-item" @click="tabChannel(item,index)" :class="{'nav-item-active':activeChannel == item}" v-for="item,index in favoriteChannels" :key="'nav-item'+index">
                    {{item.channelName}}
                </li>
            </ul>
            <i class="iconfont icon-search"></i>
        </div>
        <section id="section" ref="section">
            <div class="icon-loading"></div>
            <ul id="articles">
                <li class="article-item" :key="'article-item'+index" v-for="item,index in articleList">
                    <p class="title">{{item.title}}</p>
                    <div class="footer-wrapper">
                        <span class="footer-item footer-item-top" v-if="item.isTop == '1'">置顶</span>
                        <a class="footer-item">{{item.userId}}</a>
                        <time class="footer-item">{{fomatTime("2021-6-6 12:08")}}</time>
                    </div>
                </li>
            </ul>
            <div class="icon-loading icon-loading-buttom"></div>
        </section>
    </div>
</template>

<script lang="ts">
    import {defineComponent,ref,reactive,onMounted,onBeforeMount} from 'vue'
    import {getUserDataService,getFavoriteChannelsListService,getArticleListService} from "../service/homeService";
    import mapGetters from "../store/mapGetters";
    import {ChannelsInterface} from "../types";
    import {fomatTime} from "../utils/index";
    import {ArticleParamsInterface,ArticleInterface} from "../types";

    export default defineComponent({
        name: 'Home',
        async setup() {
            let {favoriteChannels} = mapGetters(["favoriteChannels"]);
            let activeChannel:any  = ref(null)
            let articleList:Array<ArticleInterface> = reactive([])
            const section = ref<HTMLElement | null>(null);

            onMounted(()=>{
                debugger
                console.log(section)
            });

            await getUserDataService();//获取用户信息
            await getFavoriteChannelsListService();//获取频道信息



            activeChannel.value = favoriteChannels.value.find((item: ChannelsInterface) => item.status == 1)

            const tabChannel = (item:ChannelsInterface)=>{
                activeChannel.value = item
            }

            const articleListParams:ArticleParamsInterface = {
                channelId: activeChannel.value.channelId,
                pageNum: 1,
                pageSize: 20,
                isTop: "0"
            }
            const topListParams:ArticleParamsInterface = {
                pageNum: 1,
                pageSize: 3,
                isTop: "1"
            }
            getArticleListService(topListParams).then((data)=>{
                let result = data as Array<ArticleInterface>
                articleList.unshift(...result);
            });
            getArticleListService(articleListParams).then((data)=>{
                let result = data as Array<ArticleInterface>
                articleList.push(...result);
            })

            return {
                tabChannel,
                activeChannel,
                favoriteChannels,
                fomatTime,
                articleList
            }
        }
    })
</script>
<style lang="less" scoped>
    @import "../common/style/variable.less";
    #home{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        #nav-wrapper{
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ddd;
            #nav-list{
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
                        color: #ff9900;
                        border-bottom: 2px solid #ff9900;
                    }
                }
            }
            .icon-search{
                font-size: @iconfont-size;
                margin: @iconfont-margin;
            }

        }

        #section{
            flex: 1;
            overflow: auto;
            &::-webkit-scrollbar{
                display: none;
            }
            #articles{
                display: flex;
                flex-direction: column;
                .article-item{
                    padding: 1rem;
                    border-bottom: 1px solid @border-color;
                    .title{
                        font-size: @article-title-font-size;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
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
        }
    }

</style>
