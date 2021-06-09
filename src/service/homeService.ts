import axios from "axios";
import api from "../api";
import store from "../store"
import {ArticleInterface,ChannelsInterface,UserDataInterface,ArticleParamsInterface} from "../types";
import {USER_DATA, FAVORITE_CHANNELS} from "../store/mutation-types"

export const getUserDataService = async () => {
    let {data} = await axios.get(api.getUserData)
    store.commit(USER_DATA, data as UserDataInterface)
}

export const getFavoriteChannelsListService = async () => {
    let {data} = await axios.get(api.getFavoriteChannels)
    store.commit(FAVORITE_CHANNELS, data as Array<ChannelsInterface>)
}

export const getArticleListService = async (params:ArticleParamsInterface) => {
    return new Promise(async (resolve) => {
        let {data} = await axios.get(api.getArticleList, {
            params
        })
        let result = data as Array<ArticleInterface>
        resolve(result)
    })
}
