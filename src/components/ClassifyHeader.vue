<template>
    <div id="header-wrappper">
        <i class="iconfont iconfont-jiantou" @click="goBack()"></i>
        <div id="header-title">{{classifyTitle}}</div>
    </div>
</template>

<script lang="ts">
    import {defineComponent,PropType} from "vue";
    import {useRouter} from "vue-router";
    export default defineComponent({
        name: 'ClassifyHeader',
        props:{
            classifyTitle:{
                type:String as PropType<string>,
                required:true
            }
        },
        setup(){
            const router = useRouter();
            const goBack = ()=>{
                router.back();
            };
            return {goBack}
        }
    })
</script>

<style lang="less" scoped>
    @import "../common/style/variable.less";
    #header-wrappper{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 3rem;
        border-bottom: @border;
        #header-title{
            font-size: @article-title-font-size;
        }
        .iconfont-jiantou{
            position: absolute;
            top: 0.7rem;
            left: @small-margin;
            transform: rotate(180deg);
        }
    }
</style>
