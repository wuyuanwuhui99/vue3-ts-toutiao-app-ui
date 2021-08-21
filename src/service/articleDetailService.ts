import axios, {AxiosResponse} from "axios";
import api from "../api";
import {ArticleInterface} from "../types";
import {getUrl} from "../utils"

export const getArticleService = async (id:number) => {
    return axios.get(`${api.getArticleDetail}/${id}`).then((res:AxiosResponse<ArticleInterface>)=>res.data);
};

export const isFocusService = async (authorId:string,type:string) => {
    return axios.get(getUrl(api.isFocus,type),{params:{authorId}}).then((res:AxiosResponse<number>)=>res.data);
};

export const insertFocusService = async (authorId:string,type:string) => {
    return axios.post(getUrl(api.insertFocus,type),{authorId}).then((res:AxiosResponse<number>)=>res.data);
};

export const deleteFocusService = async (authorId:string,type:string) => {
    return axios.delete(getUrl(api.deleteFocus,type),{params:{authorId}}).then((res:AxiosResponse<number>)=>res.data);
};
