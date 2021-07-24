<template>
    <keep-alive>
        <router-view/>
    </keep-alive>
</template>

<script>
    import {defineComponent,onMounted} from 'vue';
    import {isMobile} from './utils'

    export default defineComponent({
        setup() {
            onMounted(()=>{
                if(!isMobile()){
                    document.querySelector('#app').style = 'width:400px;max-height:800px;height:100%;border:1px solid #eee;margin: 0 auto'
                }
            })
        }
    })
</script>

<style lang="less">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
