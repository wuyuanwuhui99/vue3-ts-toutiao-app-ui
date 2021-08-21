import axios, {AxiosResponse} from "axios";
import api from "../api";
import {getUrl} from "../utils"

export const isFavoriteService = (type:string,id:number|string) => {
    return axios.get(getUrl(api.isFavorite,type), {params:{id}}).then((res:AxiosResponse<number>)=>res.data);
};

export const insertFavoriteService = (type:string,id:number|string) => {
    return axios.post(getUrl(api.insertFavorite,type), {id}).then((res:AxiosResponse<number>)=>res.data);
};

export const deleteFavoriteService = (type:string,id:number|string) => {
    return axios.delete(getUrl(api.deleteFavorite,type), {params:{id}}).then((res:AxiosResponse<number>)=>res.data);
};

export const isLikeService = (type:string,id:number|string) => {
    return axios.get(getUrl(api.isLike,type), { params:{id}}).then((res:AxiosResponse<number>)=>res.data);
};

export const insertLikeService = (type:string,id:number|string) => {
    return axios.post(getUrl(api.insertLike,type), {id}).then((res:AxiosResponse<number>)=>res.data);
};

export const deleteLikeService = (type:string,id:number|string) => {
    return axios.delete(getUrl(api.deleteLike,type), {params:{id}}).then((res:AxiosResponse<number>)=>res.data);
};
