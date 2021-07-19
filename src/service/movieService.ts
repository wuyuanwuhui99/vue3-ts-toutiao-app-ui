import axios, {AxiosResponse} from "axios";
import api from "../api";
import {MovieParamsInterface,MovieInterface} from "../types";

export const getMovieListService = (params:MovieParamsInterface) => {
    return axios.get(api.getMovieList, {
        params
    }).then((res:AxiosResponse<Array<MovieInterface>>)=>res.data);
}

