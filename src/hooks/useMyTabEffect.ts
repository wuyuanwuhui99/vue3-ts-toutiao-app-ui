import {useRouter} from "vue-router";

export default ()=> {
    const router = useRouter();
    const goRouter =(name:string)=>{
        router.push(`recordList?type=${name}`);
    };
    
    return {
        goRouter
    }
}
