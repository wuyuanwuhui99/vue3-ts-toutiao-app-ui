<template>
  <div class="home">
    <div style="text-align: center">{{myData}}</div>
    <div class="wrapper">
      <button class="btn" @click="handleClick">点击改变值</button>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import mapGetters from "../store/mapGetters";
import mapActions from "../store/mapActions"

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  setup(){
    const {myData} = mapGetters(["myData"])
    const {setMyData} = mapActions(["setMyData"]);

    console.log(myData.value)

    const handleClick = ()=>{
      setMyData("bbb")
    }

    return {
      myData,
      handleClick
    }
  }
})
</script>
<style lang="less" scoped>
  .wrapper{
    display: flex;
    justify-content: center;
    .btn{
      border: none;
      color:#fff;
      text-align: center;
      min-width: 80px;
      cursor: pointer;
      background: #1890ff;
      border-radius: 5px;
      padding: 10px;
    }
  }

</style>
