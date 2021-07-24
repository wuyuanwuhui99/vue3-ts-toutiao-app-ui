import axios, {AxiosResponse} from "axios";
import api from "@/api";
import {ArticleInterface} from "@/types";

export const getArticleService = async (id:number) => {
    return axios.get(`${api.getArticleDetail}/${id}`).then((res:AxiosResponse<ArticleInterface>)=>res.data);
}
