import axios, {AxiosResponse} from "axios";
import api from "../api";
import {ArticleInterface} from "../types";
import store from "../store";

export const getArticleRecordService = () => {
    return axios.get(api.getArticleRecordList, {
        userId:store.state.userData.userId,
    }).then((res:AxiosResponse<Array<ArticleInterface>>)=>res.data);
}

