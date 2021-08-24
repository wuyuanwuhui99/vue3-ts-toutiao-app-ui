import axios, {AxiosResponse} from "axios";
import api from "../api";
import {ArticleInterface, MixinInterface} from "../types";
import {getImg,getUrl} from "../utils";

export const getRecordListService = (type:string) => {
    return axios.get(getUrl(api.getRecordList,type)).then((res:AxiosResponse<Array<MixinInterface>>)=>{
        if(type == "toutiao"){
            return res.data.map((item:any)=>{
                item.imgList = getImg(item as ArticleInterface);
                return item;
            });
        }
        return res.data
    })
};

