<template>
    <ul class="movie-wrapper">
        <li v-for="item,index in movieList" class="movie-item" :key="'movie-item'+index">
            <div class="movie-img-wrapper">
                <img class="movie-img" :src="item.localImg"/>
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
    export default defineComponent({
        name: 'VideoListComponent',
        components:{MoreHandleComponent},
        props:{
            movieList:{
                type:Array as PropType<MovieInterface[]>,
                required:true
            }
        },
        setup(){
            return {
            }
        }
    })
</script>

<style lang="less" scoped>
    @import "../common/style/variable.less";
    .movie-wrapper{
        display: flex;
        flex-wrap: wrap;
        padding: @big-margin;
        .movie-item{
            width: calc((100% - 1rem)/3);
            margin-bottom: @big-margin;
            display: flex;
            flex-direction: column;
            margin-left: @small-margin;
            &:nth-child(3n+1){
                margin-left: 0;
            }
            .movie-img-wrapper{
                flex: 1;
                position: relative;
                .movie-img{
                    width: 100%;
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
