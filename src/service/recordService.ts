import axios, {AxiosResponse} from "axios";
import api from "../api";
import {ArticleInterface, MixinInterface} from "../types";
import {getImg} from "../utils";

export const getRecordListService = (type:string) => {
    return axios.get(api.getRecordList,{params:{type}}).then((res:AxiosResponse<Array<MixinInterface>>)=>{
        if(type == "article"){
            return res.data.map((item:any)=>{
                item.imgList = getImg(item as ArticleInterface);
                return item;
            });
        }
        return res.data
    })
};

