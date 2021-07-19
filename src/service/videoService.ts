import axios, {AxiosResponse} from "axios";
import api from "../api";
import {VideoParamsInterface,VideoInterface,VideoChannelInterface} from "../types";

export const getVideoFavoriteChannelsService = ()=>{
    return axios.get(api.getVideoFavoriteChannels).then((res:AxiosResponse<Array<VideoChannelInterface>>)=>res.data)
}

export const getVideoListService = (params:VideoParamsInterface) => {
    return axios.get(api.getVideoList, {
        params
    }).then((res:AxiosResponse<Array<VideoInterface>>)=>res.data);
}

