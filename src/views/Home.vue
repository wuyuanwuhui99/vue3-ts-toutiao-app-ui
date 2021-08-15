<template>
    <div id="home">

        <div id="tab-wrapper">
            <ArticleTab v-show="bottomTabIndex == 0"></ArticleTab>
            <VideoTab v-show="bottomTabIndex == 1" v-if="tabState[1]"></VideoTab>
            <MovieTab v-show="bottomTabIndex == 2" v-if="tabState[2]"></MovieTab>
            <MyTab v-show="bottomTabIndex == 3" v-if="tabState[3]"></MyTab>
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
    import {defineComponent,ref,reactive} from 'vue';
    import ArticleTab from "../components/ArticleTab.vue";
    import VideoTab from "../components/VideoTab.vue";
    import MovieTab from "../components/MovieTab.vue";
    import MyTab from "../components/MyTab.vue";
    export default defineComponent({
        name: 'Home',
        components:{ArticleTab,VideoTab,MovieTab,MyTab},
        async setup() {
            let bottomTabIndex = ref(0);
            const tabState = reactive<Array<boolean>>([true,false,false,false]);

            /**
             * @author: wuwenqiang
             * @description: 底部切换
             * @date: 2020-06-30 23:28
             */
            const tabBottomNav = async (index: number) => {
                bottomTabIndex.value = index;
                tabState[index] = true;
            };

            return {
                tabState,
                tabBottomNav,
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
            margin-left: @small-margin;
            position: relative;
            &.img-container-video{
                max-width: 100%;
                width: 100%;
                max-height: 20rem;
            }
            .duration{
                position: absolute;
                bottom: @small-margin;
                right: @small-margin;
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
    .single-img{
        img{
            width: 100%;
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
        #footer-tab-wrapper{
            display: flex;
            border-top: @border;
            padding: @small-margin 0;
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
