import axios, {AxiosResponse} from "axios";
import api from "../api";
import {MovieInterface} from "../types";

export const getMovieDetailService = async (movieId:number) => {
    return axios.get(api.getMovieDetail+movieId).then((res:AxiosResponse<MovieInterface>)=>res.data);
};

