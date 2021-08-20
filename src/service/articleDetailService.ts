import axios, {AxiosResponse} from "axios";
import api from "@/api";
import {ArticleInterface} from "@/types";

export const getArticleService = async (id:number) => {
    return axios.get(`${api.getArticleDetail}/${id}`).then((res:AxiosResponse<ArticleInterface>)=>res.data);
};

export const isFocusService = async (authorId:string,type:string) => {
    return axios.get(api.isFocus,{params:{authorId,type}}).then((res:AxiosResponse<number>)=>res.data);
};

export const insertFocusService = async (authorId:string,type:string) => {
    return axios.post(api.insertFocus,{authorId,type}).then((res:AxiosResponse<number>)=>res.data);
};

export const deleteFocusService = async (authorId:string,type:string) => {
    return axios.delete(api.deleteFocus,{params:{authorId,type}}).then((res:AxiosResponse<number>)=>res.data);
};
