import axios, {AxiosResponse} from "axios";
import api from "../api";
import {VideoParamsInterface, VideoInterface, VideoChannelInterface, ArticleInterface, MovieInterface} from "../types";

export const getVideoFavoriteChannelsService = ()=>{
    return axios.get(api.getVideoFavoriteChannels).then((res:AxiosResponse<Array<VideoChannelInterface>>)=>res.data)
}

export const getVideoListService = (params:VideoParamsInterface) => {
    return axios.get(api.getVideoList, {
        params
    }).then((res:AxiosResponse<Array<VideoInterface>>)=>res.data);
};
export const isFavoriteService = (type:string,id:number|string) => {
    return axios.get(api.isFavorite, {
        params:{
            type,
            id
        }
    }).then((res:AxiosResponse<boolean>)=>res.data);
};


