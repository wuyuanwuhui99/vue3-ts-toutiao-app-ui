<template>
    <Suspense>
        <router-view #default="{Component}" v-if="isLogin">
            <keep-alive>
                <component :is="Component" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" v-if="!$route.meta.keepAlive" />
        </router-view>

    </Suspense>
</template>

<script lang="ts">
    import {defineComponent,ref} from 'vue';
    import {getUserDataService} from "./service/appService";
    import emitter from "./utils/emitter";
    export default defineComponent({
        setup () {
            const isLogin = ref<boolean>(false);

            getUserDataService().then(() => {
                isLogin.value = true;
            });

            document.body.addEventListener("click",()=>{
                emitter.$emit("bodyClick")
            });

            return {
                isLogin
            }
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
