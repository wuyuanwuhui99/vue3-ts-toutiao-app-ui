<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script lang="ts">
    import {defineComponent} from 'vue'
    export default defineComponent({
        name: 'Home',
        setup() {
            // await getUserDataService();//获取用户信息



        }
    })
</script>
<style lang="less" scoped>
    #nav-list{
        white-space: nowrap;
        overflow-x: auto;
        &::-webkit-scrollbar{
            display: none;
        }
        .nav-item{

        }
    }

</style>
