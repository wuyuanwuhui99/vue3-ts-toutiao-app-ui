<template>
    <div>
        <ClassifyHeaderComponent :classifyTitle="titleMap[type]"></ClassifyHeaderComponent>
        <ArticleListComponent :articleList="articleRecordList" v-if="type == 'toutiao'"></ArticleListComponent>
        <VideoListComponent :articleList="articleRecordList" v-else-if="type == 'movie'"></VideoListComponent>
        <VideoListComponent :articleList="articleRecordList" v-else-if="type == 'video'"></VideoListComponent>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import ArticleListComponent from "../components/ArticleListComponent.vue";
    import VideoListComponent from "../components/VideoListComponent.vue";
    import ClassifyHeaderComponent from "../components/ClassifyHeaderComponent.vue";
    import {getRecordListService} from "../service/recordService"
    import {useRoute } from "vue-router"
    export default defineComponent({
        name: 'ArticleRecord',
        components:{ArticleListComponent,ClassifyHeaderComponent,VideoListComponent},
        async setup () {
            const route:any = useRoute();
            const type:string = route.query.type;
            const articleRecordList = await getRecordListService(type);

            const titleMap = {
                toutiao:"我浏览过的文章",
                movie:"我观看过的视频",
                video:"我观看过的视频"
            };

            return {
                titleMap,
                type,
                articleRecordList
            }
        }
    })
</script>

<style scoped>

</style>
