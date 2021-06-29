import {ref,reactive} from "vue"
import {ArticleInterface,VideoInterface} from "@/types";

export default ()=>{
    let bottomTabIndex = ref<number>(0)
    let videoList = reactive<Array<VideoInterface>>([])
    
    /**
     * @author: wuwenqiang
     * @description: 获取图片数量
     * @date: 2020-06-27 21:29
     */
    const getImgHtml = (htmlStr:string,length:number,index:number) =>{
        if (index == 3 && length > 4){
            return `<div class="img-num">+${length-index-1}</div>${htmlStr}`
        }else{
            return htmlStr
        }
    }
    
    /**
     * @author: wuwenqiang
     * @description: 获取图片html
     * @date: 2020-06-27 21:29
     */
    const getImg = (article:ArticleInterface)=>{
        if (article.type == "video")return article.img ?  [`<div class="iconfont iconfont-play"></div><img src='${article.img}'/><div class="duration">${article.duration}</div>`] : []
        return article.content.match(/<img[^<>]+>/g) || []
    }
    
    const tabBottom = (index:number)=>{
        bottomTabIndex.value = index;
    }
    
    const getVideoList = (videoParams)=>{
    
    }
    
    return {
        getImgHtml,
        getImg,
        bottomTabIndex,
        tabBottom,
        videoList
    }
}
