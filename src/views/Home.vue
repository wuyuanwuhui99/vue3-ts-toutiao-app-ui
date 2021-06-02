<template>
    <div class="home">
        <ul id="nav-list">
            <li class="nav-item" @click="tabChannel(item,index)" :class="{'nav-item-active':activeChannel == item}" v-for="item,index in favoriteChannels" :key="'nav-item'+index">{{item.channelName}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {defineComponent,ref} from 'vue'
    import {getUserDataService,getFavoriteChannelsList} from "../service/homeService";
    import mapGetters from "../store/mapGetters";
    import {ChannelsInterface} from "../types";

    export default defineComponent({
        name: 'Home',
        async setup() {
            await getUserDataService();//获取用户信息
            await getFavoriteChannelsList();//获取频道信息

            let {favoriteChannels} = mapGetters(["favoriteChannels"]);
            let activeChannel:any  = ref(null)
            activeChannel.value = favoriteChannels.value.find((item: ChannelsInterface) => item.status == 1)

            const tabChannel = (item:ChannelsInterface)=>{
                activeChannel.value = item
            }

            return {
                tabChannel,
                activeChannel,
                favoriteChannels,
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
        border-bottom: 1px solid #ddd;
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
