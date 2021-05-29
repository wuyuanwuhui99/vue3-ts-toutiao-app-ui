import {useStore} from "vuex"

export default (arr:Array<string>):any=>{
  const data: any = {};
  const state = useStore();
  arr.forEach((item: string) => {
    data[item] = (payload:any) => {
      state.dispatch(item,payload)
    }
  });
  return data;
}
