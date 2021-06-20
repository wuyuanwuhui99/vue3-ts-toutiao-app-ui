<template>
    <div id="home">
        <div id="nav-wrapper">
            <ul id="nav-list">
                <li class="nav-item" @click="tabChannel(item)" :class="{'nav-item-active':activeChannelId == item.channelId}" v-for="item,index in favoriteChannels" :key="'nav-item'+index">
                    {{item.channelName}}
                </li>
            </ul>
            <i class="iconfont iconfont-search"></i>
        </div>
        <div id="section" ref="section">
            <div>
                <ul id="articles" ref="articles">
                    <li class="article-item" :key="'article-item'+index" v-for="item,index in articleList">
                        <p class="title">{{item.title}}</p>
                        <div class="footer-wrapper">
                            <span class="footer-item footer-item-top" v-if="item.isTop == '1'">置顶</span>
                            <a class="footer-item">{{item.userId}}</a>
                            <time class="footer-item">{{fomatTime("2021-6-6 12:08")}}</time>
                        </div>
                    </li>
                </ul>
                <template v-if="articleList.length>0">
                    <div class="loading-tip" v-if="isEnd">已经到底了</div>
                    <div class="icon-loading" v-else></div>
                </template>
            </div>
        </div>
        <ul id="footer-tab-wrapper">
            <li class="footer-tab-item" :class="{'footer-tab-item-active':tabIndex == 0}" @click="tabIndex = 0">
                <i class="iconfont iconfont-tab iconfont-tab-home"></i>
                <span class="tab-text">首页</span>
            </li>
            <li class="footer-tab-item" :class="{'footer-tab-item-active':tabIndex == 1}" @click="tabIndex = 1">
                <i class="iconfont iconfont-tab iconfont-tab-video"></i>
                <span class="tab-text">西瓜视频</span>
            </li>
            <li class="footer-tab-item" :class="{'footer-tab-item-active':tabIndex == 2}" @click="tabIndex = 2">
                <i class="iconfont iconfont-tab iconfont-tab-play"></i>
                <span class="tab-text">放映厅</span>
            </li>
            <li class="footer-tab-item" :class="{'footer-tab-item-active':tabIndex == 3}" @click="tabIndex = 3">
                <i class="iconfont iconfont-tab iconfont-tab-my"></i>
                <span class="tab-text">我的</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {defineComponent,reactive,onMounted,ref,nextTick,toRefs} from 'vue'
    import {getUserDataService, getFavoriteChannelsListService, getArticleListService} from "../service/homeService";
    import mapGetters from "../store/mapGetters";
    import {ArticleParamsInterface, ChannelsInterface} from "../types";
    import {fomatTime} from "../utils/index";
    import {ArticleInterface} from "../types";
    import scroll from "../components/scroll.vue";
    import BScroll from "better-scroll";
    export default defineComponent({
        name: 'Home',
        components:{scroll},
        async setup() {
            let {favoriteChannels} = mapGetters(["favoriteChannels"]);
            let activeChannelId = ref("")
            let articleList = reactive<Array<ArticleInterface>>([])
            let bscroll: BScroll;
            let isEnd = false;
            const section = ref<HTMLElement>()
            let tabIndex = ref<Number>(0)

            const articleListParams: ArticleParamsInterface = {
                pageNum: 1,
                pageSize: 20,
            }

            const tabChannel = ({channelId,href,id}) => {
                if(channelId)activeChannelId.value = channelId
            }


            await getUserDataService();//获取用户信息
            await getFavoriteChannelsListService();//获取频道信息
            let {channelId}= favoriteChannels.value.find((item: ChannelsInterface) => item.status == 1)
            activeChannelId.value = articleListParams.channelId = channelId;
            let reuslt = await getArticleListService(articleListParams)
            articleList.push(...reuslt as Array<ArticleInterface>)

            setTimeout(()=>{
                bscroll = new BScroll(section.value, {
                    probeType: 1,
                    click: true,
                });
                bscroll.on('scrollEnd', () => {
                    if (bscroll.y <= (bscroll.maxScrollY + 50)) {
                        loadMore()
                    }
                })
            },100)


            const loadMore = async () => {
                if (isEnd) return;
                articleListParams.pageNum++
                let reuslt = await getArticleListService(articleListParams)
                if (reuslt.length == 0) {
                    isEnd = true
                }
                articleList.push(...reuslt as Array<ArticleInterface>)
                nextTick(() => {
                    bscroll.refresh()
                })
            }

            return {
                tabChannel,
                activeChannelId,
                favoriteChannels,
                fomatTime,
                articleList,
                section,
                isEnd,
                tabIndex
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
        #section{
            flex: 1;
            overflow: auto;
            transition: 1s all ease;
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
