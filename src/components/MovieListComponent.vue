<template>
    <ul class="movie-wrapper" :class="{'movie-wrapper-wrapper':direction == 'row'}">
        <li @click="goDetail(item.movieId)" v-for="item,index in movieList" class="movie-item" :class="'movie-item-'+direction" :key="'movie-item'+index">
            <div class="movie-img-wrapper">
                <img class="movie-img" :src="item.localImg || item.img"/>
                <span class="movie-state" v-if="item.viewingState">{{item.viewingState.replace(/\s/g,"")}}</span>
            </div>
            <div class="movie-name">{{item.movieName}}</div>
        </li>
    </ul>
</template>

<script lang="ts">
    import {defineComponent,PropType} from "vue";
    import {MovieInterface} from '../types';
    import MoreHandleComponent from "./MoreHandleComponent.vue";
    import {useRouter} from "vue-router";
    export default defineComponent({
        name: 'VideoListComponent',
        components:{MoreHandleComponent},
        props:{
            movieList:{
                type:Array as PropType<MovieInterface[]>,
                required:true
            },
            direction:{
                type:String as PropType<string>,
                required:false,
                default:"column"
            }
        },
        setup(){
            const router = useRouter();
            const goDetail = (movieId:number)=>{
                router.push(`/movieDetail/${movieId}`)
            };
            return {goDetail}
        }
    })
</script>

<style lang="less" scoped>
    @import "../common/style/variable.less";
    .movie-wrapper{
        display: flex;
        flex-wrap: wrap;
        &.movie-wrapper-wrapper{
            flex-wrap:nowrap ;
            overflow: auto;
            &::-webkit-scrollbar{
                display: none;
            }
        }
        .movie-item{
            width: calc((100% - 1rem)/3);
            margin-bottom: @big-margin;
            display: flex;
            flex-direction: column;
            margin-left: @small-margin;
            &.movie-item-column{
                margin-bottom: 0;
                &:nth-child(3n+1){
                    margin-left: 0;
                }
            }
            &.movie-item-row{
                margin-left: 0;
                margin-right: @small-margin;
                &:last-child{
                    margin-right:0;
                }
            }
            .movie-img-wrapper{
                flex: 1;
                position: relative;
                .movie-img{
                    width: 100%;
                    min-width: 6rem;
                    height: 100%;
                    border-radius: @border-raduis;
                }
                .movie-state{
                    position: absolute;
                    bottom: 0.2rem;
                    right: 0.2rem;
                    background: #4cce69;
                    color:#fff;
                    border-radius: 0.2rem;
                    font-size: 0.8rem;
                    padding: 0 0.2rem;
                }
            }

            .movie-name{
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>
