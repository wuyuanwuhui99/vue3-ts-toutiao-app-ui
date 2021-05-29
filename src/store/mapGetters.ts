import {useStore} from "vuex";
import {computed} from "vue";

export default (arr:Array<string>):any => {
    const data:any = {};
    const state = useStore();
    arr.forEach((item:string)=>{
        data[item] = computed(()=>{
          return state.getters[item];
        })
    })
  return data;
}
