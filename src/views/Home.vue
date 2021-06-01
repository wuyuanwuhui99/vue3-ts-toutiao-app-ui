<template>
    <div class="home">
        <ul id="nav-list">
            <li class="nav-item" v-for="item,index in favoriteChannels" :key="'nav-item'+index">{{item.channelName}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {defineComponent,computed} from 'vue'
    import {getUserDataService,getFavoriteChannelsList} from "../service/homeService";
    import { useStore } from 'vuex'
    import mapGetters from "../store/mapGetters";

    export default defineComponent({
        name: 'Home',
        async setup() {
            await getUserDataService();//获取用户信息
            await getFavoriteChannelsList();//获取频道信息
            let {favoriteChannels} = mapGetters(["favoriteChannels"]);
            return {
                favoriteChannels
            }
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
