import axios from "axios";
import api from "../api";
import store from "../store"
import {UserDataInterface,ArticleParamsInterface,VideoParamsInterface} from "../types";
import {USER_DATA} from "../store/mutation-types"

export const getUserDataService = async () => {
    let data =  await axios.get(api.getUserData)
    store.commit(USER_DATA, data as UserDataInterface)
}

export const getFavoriteChannelsListService = async () => {
    return axios.get(api.getFavoriteChannels)
}

export const getArticleListService = (params:ArticleParamsInterface) => {
    return axios.get(api.getArticleList, {
        params
    })
}

export const getVideoFavoriteChannelsService = ()=>{
    return axios.get(api.getVideoFavoriteChannels)
}

export const getVideoListService = (params:VideoParamsInterface) => {
    return axios.get(api.getVideoList, {
        params
    })
}

