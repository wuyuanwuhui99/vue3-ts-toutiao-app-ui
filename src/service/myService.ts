import axios, {AxiosResponse} from "axios";
import api from "../api";
import {ArticleInterface} from "../types";

export const getArticleRecordService = () => {
    return axios.get(api.getArticleRecordList).then((res:AxiosResponse<Array<ArticleInterface>>)=>res.data);
}

