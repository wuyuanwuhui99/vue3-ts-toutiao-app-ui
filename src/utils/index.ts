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
    }
    const year = zorefull(date.getFullYear());
    const month = zorefull(date.getMonth()+1);
    const dates = zorefull(date.getDate());
    const hour = zorefull(date.getHours());
    const minutes = zorefull(date.getMinutes());
    const seconds = zorefull(date.getSeconds());
    return `${year}-${month}-${dates} ${hour}:${minutes}:${seconds}`
}


