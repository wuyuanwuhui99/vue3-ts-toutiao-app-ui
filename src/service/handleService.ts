import axios, {AxiosResponse} from "axios";
import api from "../api";
import {getUrl,getParams} from "../utils"
import {MixinInterface,TopCommentInterface,ReplyCommentInterface} from "@/types";

export const isFavoriteService = (type:string,id:number) => {
    return axios.get(getUrl(api.isFavorite,type), {params:getParams(type,id)}).then((res:AxiosResponse<number>)=>res.data);
};

export const insertFavoriteService = (type:string,id:number) => {
    return axios.post(getUrl(api.insertFavorite,type), getParams(type,id)).then((res:AxiosResponse<number>)=>res.data);
};

export const deleteFavoriteService = (type:string,id:number) => {
    return axios.delete(getUrl(api.deleteFavorite,type), {params:getParams(type,id)}).then((res:AxiosResponse<number>)=>res.data);
};

export const isLikeService = (type:string,id:number) => {
    return axios.get(getUrl(api.isLike,type), { params:getParams(type,id)}).then((res:AxiosResponse<number>)=>res.data);
};

export const insertLikeService = (type:string,id:number) => {
    return axios.post(getUrl(api.insertLike,type), getParams(type,id)).then((res:AxiosResponse<number>)=>res.data);
};

export const deleteLikeService = (type:string,id:number) => {
    return axios.delete(getUrl(api.deleteLike,type), {params:getParams(type,id)}).then((res:AxiosResponse<number>)=>res.data);
};

export const getCommentCountService = (type:string,id:number) => {
    return axios.get(getUrl(api.getCommentCount,type), {params:getParams(type,id)}).then((res:AxiosResponse<number>)=>res.data);
};

export const getTopCommentListService = (type:string,id:number,pageNum:number,pageSize:number) => {
    return axios.get(getUrl(api.getTopCommentList,type), {params:getParams(type,id,{pageNum,pageSize})}).then((res:AxiosResponse<Array<TopCommentInterface>>)=>res.data);
};

export const insertCommentService = (type:string,params:ReplyCommentInterface) => {
    return axios.post(getUrl(api.insertComment,type), params).then((res:AxiosResponse<number>)=>res.data);
};

export const deleteCommentService = (type:string,id:number) => {
    return axios.delete(getUrl(api.insertComment,type).replace("{id}",id+"")).then((res:AxiosResponse<number>)=>res.data);
};

export const getReplyCommentListService = (type:string,topId:number,pageNum:number,pageSize:number) => {
    return axios.get(getUrl(api.getReplyCommentList,type),{params:{topId,pageNum,pageSize}}).then((res:AxiosResponse<Array<ReplyCommentInterface>>)=>res.data);
};

export const getCommentItemService = (type:string,id:number) => {
    return axios.get(getUrl(api.getCommentItem,type), {params:{id}}).then((res:AxiosResponse<TopCommentInterface>)=>res.data);
};
