import axios from "axios";
import api from "../api";
import {MovieParamsInterface} from "../types";

export const getMovieListService = (params:MovieParamsInterface) => {
    return axios.get(api.getMovieList, {
        params
    })
}

