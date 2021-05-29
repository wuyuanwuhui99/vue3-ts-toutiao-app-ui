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
    import {getUserDataService} from "../../service";

    export default defineComponent({
        name: 'Home',
        components: {

        },
        async setup() {
            await getUserDataService();//获取用户信息


            return {
                myData,
                handleClick
            }
        }
    })
</script>
<style lang="less" scoped>
    #nav-list{
        .nav-item
    }

</style>
