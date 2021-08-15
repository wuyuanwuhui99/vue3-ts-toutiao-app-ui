<template>
    <div>
        <ClassifyHeader :classifyTitle="'我浏览过的文章'"></ClassifyHeader>
        <ArticleList :articleList="articleRecordList"></ArticleList>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import ArticleList from "../components/ArticleList";
    import ClassifyHeader from "../components/ClassifyHeader";
    import {getArticleRecordService} from "../service/recordService"
    export default defineComponent({
        name: 'ArticleRecord',
        components:{ArticleList,ClassifyHeader},
        async setup () {
            const articleRecordList = await getArticleRecordService();
            return {
                articleRecordList
            }
        }
    })
</script>

<style scoped>

</style>
