<template>
    <div>
        <ClassifyHeader :classifyTitle="titleMap[type]"></ClassifyHeader>
        <ArticleList :articleList="articleRecordList" v-if="type == 'article'"></ArticleList>
        <ArticleList :articleList="articleRecordList" v-else-if="type == 'movie'"></ArticleList>
        <ArticleList :articleList="articleRecordList" v-else-if="type == 'video'"></ArticleList>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import ArticleList from "../components/ArticleList.vue";
    import ClassifyHeader from "../components/ClassifyHeader.vue";
    import {getRecordListService} from "../service/recordService"
    import {useRoute } from "vue-router"
    export default defineComponent({
        name: 'ArticleRecord',
        components:{ArticleList,ClassifyHeader},
        async setup () {
            debugger
            const route:any = useRoute();
            const type:string = route.query.type;
            const articleRecordList = await getRecordListService(type);

            const titleMap = {
                article:"我浏览过的文章",
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
