<template>
    <div id="detail-wrapper">
        <div id="article-wrapper"></div>
        <div id="footer-wrapper"></div>
    </div>
</template>

<script>
    import {defineComponent} from 'vue';
    export default defineComponent({
        name: 'ArticleDetail',
        setup() {

        }
    })
</script>

<style lang="less" scoped>
    #detail-wrapper{
        display: flex;
        flex-direction: column;
        .article-wrapper{
            flex: 1;
        }
    }

</style>
