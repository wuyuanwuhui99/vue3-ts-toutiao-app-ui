<template>
    <div id="movie-wrapper">
        <div id="poster-bg" :style="{'background-image':`url(${localImg||img})`}">
            <i class="iconfont iconfont-play"></i>
        </div>
        <div id="movie-info">
            <div id="movie-view">
                <img :src="localImg||img"/>
            </div>
            <div id="movie-title-wrapper">
                <p id="movie-main-title">{{movieName}}</p>
                <p id="movie-sub-title" v-if="star">{{star}}</p>
                <div id="star-wrapper" v-if="score">
                    <div id="movie-star">
                        <i v-for="item,index in scores" class="icon-star" :class="'icon-star-'+item"></i>
                    </div>
                    <div id="movie-score">{{score}}</div>
                </div>
            </div>
        </div>
        <div class="desc-wrapper">
            <div class="desc-header">
                <span class="blue-line"></span>
                <span class="title-header">剧情</span>
            </div>
            <div id="plot">{{plot}}</div>
        </div>
        <div class="desc-wrapper" v-if="stars.length > 0">
            <div class="desc-header">
                <span class="blue-line"></span>
                <span class="title-header">演员</span>
            </div>
            <ul id="stars-wrapper">
               <li class="star-item" v-for="item,index in stars">
                   <img :src="item.localImg || item.img" class="star-img"/>
                   <span class="star-name">{{item.starName}}</span>
               </li>
            </ul>
        </div>
        <div class="desc-wrapper" v-if="youLikes.length > 0">
            <div class="desc-header">
                <span class="blue-line"></span>
                <span class="title-header">猜你喜欢</span>
            </div>
            <MovieListComponent :movieList="youLikes"></MovieListComponent>
        </div>
        <div class="desc-wrapper" v-if="recommendList.length > 0">
            <div class="desc-header">
                <span class="blue-line"></span>
                <span class="title-header">相似</span>
            </div>
            <MovieListComponent :direction="'row'" :movieList="sameTypeList"></MovieListComponent>
        </div>
        <div class="desc-wrapper" v-if="recommendList.length > 0">
            <div class="desc-header">
                <span class="blue-line"></span>
                <span class="title-header">推荐</span>
            </div>
            <MovieListComponent :direction="'row'" :movieList="recommendList"></MovieListComponent>
        </div>
    </div>
</template>

<script lang="ts">
    import useMovieDetailEffect from "../hooks/useMovieDetailEffect";
    import MovieListComponent from "../components/MovieListComponent.vue";
    export default {
        name: 'MovieDetaiPage',
        components:{MovieListComponent},
        async setup(){
            const state = await useMovieDetailEffect();
            return {
                ...state
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../common/style/variable.less";
    #movie-wrapper{
        display: flex;
        flex-direction: column;
        #poster-bg{
            height: 12rem;
            background-image:url("http://localhost:8080/static/movie/images/qishi/胡同交响曲.jpg");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #movie-info{
            position: relative;
            padding-right: @big-margin;
            height: 7rem;
            #movie-view{
                position: absolute;
                width: 6rem;
                height: 8rem;
                border-radius: @big-margin;
                border: 2px solid #eee;
                overflow: hidden;
                left: 1rem;
                top:-2rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            #movie-title-wrapper{
                width: calc(100% - 8rem);
                float: right;
                #movie-main-title{
                    padding-top: @small-margin;
                    font-size: @article-title-font-size;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                #movie-sub-title{
                    padding-top: @small-margin;
                    color: @article-footer-color;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: @article-footer-font-size;
                }
                #star-wrapper{
                    display: flex;
                    margin-top: @small-margin;
                    #movie-star{
                        display: flex;
                        .icon-star{
                            width: 1rem;
                            height: 1rem;
                            background-size: cover;
                            background-repeat: no-repeat;
                            margin-right: 0.2rem;
                            &.icon-star-full{
                                background-image: url("../assets/icon-star-full.png");
                            }
                            &.icon-star-half{
                                background-image: url("../assets/icon-star-half.png");
                            }
                            &.icon-star-empty{
                                background-image: url("../assets/icon-star-empty.png");
                            }
                        }
                    }
                    #movie-score{
                        color: red;
                        padding-left: @small-margin;
                    }
                }
            }
        }
        .desc-wrapper{
            padding: 0 @big-margin @big-margin;
            .desc-header{
                display: flex;
                align-items: center;
                padding-bottom: @small-margin;
                .blue-line{
                    height: 1rem;
                    width: 0.2rem;
                    margin-right: @small-margin;
                    background: #1890ff;
                }
            }
            #plot{
                color: @article-footer-color;
                font-size: @article-footer-font-size;
                text-indent:2rem;
            }
            #stars-wrapper{
                display: flex;
                overflow: auto;
                &::-webkit-scrollbar{
                    display: none;
                }
                .star-item{
                    padding-right: @big-margin;
                    &:last-child{
                        padding-right: 0;
                    }
                    .star-img{
                        width: 6rem;
                        height: auto;
                        border-radius: @img-border-raduis;
                    }
                    .star-name{
                        font-size: @article-footer-font-size;
                        color: @article-footer-color;
                    }
                }
            }
        }
    }
</style>
