<template>
    <div class="home">
        <ul id="nav-list">
            <li class="nav-item">关注</li>
            <li class="nav-item">推荐</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import {getUserDataService,getFavoriteChannelsList} from "../service/homeService";

    export default defineComponent({
        name: 'Home',
        components: {

        },
        async setup() {
            await getUserDataService();//获取用户信息
            await getFavoriteChannelsList();//获取频道信息
        }
    })
</script>
<style lang="less" scoped>
    #nav-list{
        white-space: nowrap;
        overflow-x: auto;
        display: flex;
        padding: 1rem;
        font-size: 1.2rem;
        &::-webkit-scrollbar{
            display: none;
        }
        .nav-item{
            list-style: none;
            padding-left: 1rem;
            &:first-child{
                padding-left: 0;
            }
        }
    }

</style>
