import {reactive} from "vue"
import {MyStateInterface,} from "@/types";
import {getArticleRecordService} from "@/service/myService";
import {useRouter} from "vue-router";

export default ()=> {
    // const getArticleRecordList = async (index: number) => {
    //     myState.articleRecordState[index] = !myState.articleRecordState[index];
    //     if (myState.articleRecordState[index]) {//如果是展开状态，获取数据
    //         myState.articleRecordList.splice(0, myState.articleRecordList.length);
    //         let list = await getArticleRecordService();
    //         myState.articleRecordList.push(...list);
    //     }
    // };
    const router = useRouter();
    const goRouter =(name:string)=>{
        router.push(`/${name}`);
    };
    
    return {
        // getArticleRecordList,
        // myState,
        goRouter
    }
}
