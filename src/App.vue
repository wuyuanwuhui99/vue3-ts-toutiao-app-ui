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

<script>
    import {defineComponent,onMounted,ref} from 'vue';
    import {isMobile} from './utils'
    import {getUserDataService} from "./service/appService";
    export default defineComponent({
        setup () {
            const isLogin = ref(false);

            onMounted(() => {
                if (!isMobile()) {
                    document.querySelector('#app').style = 'width:400px;max-height:800px;height:100%;border:1px solid #eee;margin: 0 auto'
                }
            });

            getUserDataService().then(() => {
                isLogin.value = true;
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
