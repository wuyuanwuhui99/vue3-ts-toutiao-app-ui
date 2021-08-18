import axios, {AxiosResponse} from "axios";
import api from "@/api";

export const isFavoriteService = (type:string,id:number|string) => {
    return axios.get(api.isFavorite, {params:{type, id}}).then((res:AxiosResponse<number>)=>res.data);
};

export const insertFavoriteService = (type:string,id:number|string) => {
    return axios.post(api.insertFavorite, {type,id}).then((res:AxiosResponse<number>)=>res.data);
};

export const deleteFavoriteService = (type:string,id:number|string) => {
    return axios.delete(api.deleteFavorite, {params:{type,id}}).then((res:AxiosResponse<number>)=>res.data);
};

export const isLikeService = (type:string,id:number|string) => {
    return axios.get(api.isLike, { params:{type, id}}).then((res:AxiosResponse<number>)=>res.data);
};

export const insertLikeService = (type:string,id:number|string) => {
    return axios.post(api.insertLike, {type,id}).then((res:AxiosResponse<number>)=>res.data);
};

export const deleteLikeService = (type:string,id:number|string) => {
    return axios.delete(api.deleteFavorite, {params:{type,id}}).then((res:AxiosResponse<number>)=>res.data);
};
