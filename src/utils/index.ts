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
    return Math.ceil(diff/(60*60*24*30*12))+"年前"
}
