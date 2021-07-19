import axios, {AxiosResponse} from "axios";
import api from "../api";
import store from "../store"
import {UserDataInterface, ArticleParamsInterface, ArticleInterface, ArticleChannelInterface} from "../types";
import {USER_DATA} from "../store/mutation-types"
import {getImg} from "../utils";
export const getUserDataService = async () => {
    let data =  await axios.get(api.getUserData).then((res:AxiosResponse<UserDataInterface>)=>res.data);
    store.commit(USER_DATA, data)
}

export const getFavoriteChannelsListService = async () => {
    return axios.get(api.getFavoriteChannels).then((res:AxiosResponse<Array<ArticleChannelInterface>>)=>res.data);
}

export const getArticleListService = (params:ArticleParamsInterface) => {
    return axios.get(api.getArticleList, {
        params
    }).then((res:AxiosResponse<Array<ArticleInterface>>)=>{
        return res.data.map((item:ArticleInterface)=>{
            item.imgList = getImg(item)
            return item;
        })
    })
}
