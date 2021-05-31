import axios from "axios";
import api from "../api";
import store from "../store"
import {USER_DATA,FAVORITE_CHANNELS} from "../store/mutation-types"

export const getUserDataService = async () => {
    let {data} = await axios.get(api.getUserData)
    store.commit(USER_DATA,data)
}

export const getFavoriteChannelsList = async ()=> {
    let {data} = await axios.get(api.findFavoriteChannels)
    store.commit(FAVORITE_CHANNELS,data)
}
