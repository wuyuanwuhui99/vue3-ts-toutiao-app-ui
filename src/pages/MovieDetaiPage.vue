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
                        <i v-for="item,index in stars" class="icon-star" :class="'icon-star-'+item"></i>
                    </div>
                    <div id="movie-score">{{score}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import useMovieDetailEffect from "../hooks/useMovieDetailEffect";
    export default {
        name: 'MovieDetaiPage',
        async setup(){
            const state = await useMovieDetailEffect();
            console.log(state)
            return {
                ...state
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../common/style/variable.less";
    #movie-wrapper{
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
                    padding-top: @big-margin;
                    font-size: @article-title-font-size;
                }
                #movie-sub-title{
                    padding-top: @small-margin;
                    color: @article-footer-color;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
                }
            }
        }
    }
</style>
