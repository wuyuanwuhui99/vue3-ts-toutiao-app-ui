import {computed} from "vue";
import store from "../store"

export default (arr:Array<string>):any => {
    const data:any = {};
    arr.forEach((item:string)=>{
        data[item] = computed(()=>{
          return store.getters[item];
        })
    })
  return data;
}
