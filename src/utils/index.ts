import {ArticleInterface} from "../types";

export const zorefull=(value:number):string|number=>{
    return value < 9 ? "0"+value:value
}

export const fomatTime=(value:any):string=>{
    var date =new Date(value);
    var nowDate = new Date()
    let diff = Math.ceil((nowDate.getTime()-date.getTime())/1000);
    if(diff < 60){
        return diff + "秒前"
    }else if(diff < 60*60){
        return Math.ceil(diff/60) + "分前"
    }else if(diff < 60*60*24){
        return Math.ceil(diff/(60*60))+"小时前"
    }else if(diff < 60*60*24*30){
        return Math.ceil(diff/(60*60*24))+"天前"
    }else if(diff < 60*60*24*30*12){
        return Math.ceil(diff/(60*60*24*30))+"个月前"
    }
    const year = zorefull(date.getFullYear());
    const month = zorefull(date.getMonth()+1);
    const dates = zorefull(date.getDate());
    const hour = zorefull(date.getHours());
    const minutes = zorefull(date.getMinutes());
    const seconds = zorefull(date.getSeconds());
    return `${year}-${month}-${dates} ${hour}:${minutes}:${seconds}`
};

/**
 * @author: wuwenqiang
 * @description: 获取图片html
 * @date: 2020-06-27 21:29
 */
export const getImg = (article:ArticleInterface)=>{
    if (article.type == "video")return article.img ?  [`<div class="iconfont iconfont-play"></div><img src='${article.img}'/><div class="duration">${article.duration}</div>`] : []
    return article.content.match(/<img[^<>]+>/g) || []
};

export const  isMobile = ()=> {
    var sUserAgent = navigator.userAgent.toLowerCase();
    if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
       return true;//手机端
    } else {
        return  false;//pc端
    }
};

/**
 * @author: wuwenqiang
 * @description: 获取图片数量
 * @date: 2020-06-27 21:29
 */
export const getImgHtml = (htmlStr:string,length:number,index:number) =>{
    if (index == 3 && length > 4){
        return `<div class="img-num">+${length-index-1}</div>${htmlStr}`;
    }else{
        return htmlStr;
    }
};

/**
 * @author: wuwenqiang
 * @description: 根据类型获取api地址
 * @date: 2020-06-27 21:29
 */
export const getUrl = (url:string,type:string) => url.replace("{type}",type);

/**
 * @author: wuwenqiang
 * @description: 根据类型转换参数
 * @date: 2020-06-27 21:29
 */
export const getParams = (type:string,id:number,params?:object) => {
    switch (type) {
        case "toutiao":
            return {articleId:id,...params};
        case "video":
            return {videoId:id,...params};
        case "movieId":
            return {movieId:id,...params};
    }
};
