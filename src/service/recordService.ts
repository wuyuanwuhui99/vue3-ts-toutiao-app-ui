import axios, {AxiosResponse} from "axios";
import api from "../api";
import {ArticleInterface} from "../types";
import {getImg} from "../utils";

export const getArticleRecordService = () => {
    return axios.get(api.getArticleRecordList).then((res:AxiosResponse<Array<ArticleInterface>>)=>{
        return res.data.map((item:ArticleInterface)=>{
            item.imgList = getImg(item);
            return item;
        });
    })
}

