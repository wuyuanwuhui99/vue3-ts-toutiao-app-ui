import axios, {AxiosResponse} from "axios";
import api from "../api";
import { ArticleParamsInterface, ArticleInterface, ArticleChannelInterface} from "../types";
import {getImg} from "../utils";

export const getFavoriteChannelsListService = async () => {
    return axios.get(api.getFavoriteChannels).then((res:AxiosResponse<Array<ArticleChannelInterface>>)=>res.data);
};

export const getArticleListService = (params:ArticleParamsInterface) => {
    return axios.get(api.getArticleList, {
        params
    }).then((res:AxiosResponse<Array<ArticleInterface>>)=>{
        return res.data.map((item:ArticleInterface)=>{
            item.imgList = getImg(item);
            return item;
        });
    })
};
