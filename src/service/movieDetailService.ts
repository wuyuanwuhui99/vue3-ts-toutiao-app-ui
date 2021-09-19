import axios, {AxiosResponse} from "axios";
import api from "../api";
import {MovieInterface, StarInterface} from "../types";

export const getMovieDetailService = async (movieId:number) => {
    return axios.get(api.getMovieDetail+movieId).then((res:AxiosResponse<MovieInterface>)=>res.data);
};

export const getStarService = async (movieId:number)=>{
    return axios.get(api.getStar+movieId).then((res:AxiosResponse<Array<StarInterface>>)=>res.data);
};

export const getYourLikesService = async (labels:string,classify:string)=>{
    return axios.get(api.getYourLikes,{params:{labels,classify}}).then((res:AxiosResponse<Array<MovieInterface>>)=>res.data);
};

export const getMovieListByTypeService = async (types:string,classify:string)=>{
    return axios.get(api.getMovieListByType,{params:{types,classify}}).then((res:AxiosResponse<Array<MovieInterface>>)=>res.data);
};

export const getRecommendService = async (classify:string)=>{
    return axios.get(api.getRecommend,{params:{classify}}).then((res:AxiosResponse<Array<MovieInterface>>)=>res.data);
};


