<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>

<script lang="ts">
	import BScroll from 'better-scroll';
	import {onMounted,ref,watch} from "vue";

    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: null
            },
            pullup: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            },
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        setup(props:any, ctx:any){
		    const wrapper = ref<HTMLElement>()

            let bscroll:any;

            const _initScroll = ()=>{
                if (!wrapper.value) {
                    return
                }

                bscroll = new BScroll(wrapper.value,{
                    probeType: props.probeType,
                    click:props.click,
                });

                if(props.listenScroll){
                    bscroll.on("scroll",(res:any)=>{
                        ctx.emit("scroll",res)
                    })
                }

                if (props.pullup) {
                    bscroll.on('scrollEnd', () => {
                        debugger
                        if (bscroll.y <= (bscroll.maxScrollY + 50)) {
                            ctx.emit('scrollToEnd')
                        }
                    })
                }

                if (props.beforeScroll) {
                    bscroll.on('beforeScrollStart', () => {
                        ctx.emit('beforeScroll')
                    })
                }
            }

            const enable = ()=>{
                bscroll && bscroll.enable()
            }

            const disable=()=> {
		        bscroll && bscroll.disable()
            }

            const refresh=()=> {
		        bscroll && bscroll.refresh()
            }

            onMounted(()=>{
                _initScroll()
            })

            watch(
                ()=>props.data,
                ()=>{
                    setTimeout(() => {
                        refresh()
                    }, props.refreshDelay)
                }
            )

            return {
                wrapper
            }
        }
	}
</script>

<style>
</style>
