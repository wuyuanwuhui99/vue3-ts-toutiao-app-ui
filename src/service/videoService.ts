import axios from "axios";
import api from "../api";
import {VideoParamsInterface} from "../types";

export const getVideoFavoriteChannelsService = ()=>{
    return axios.get(api.getVideoFavoriteChannels)
}

export const getVideoListService = (params:VideoParamsInterface) => {
    return axios.get(api.getVideoList, {
        params
    })
}

