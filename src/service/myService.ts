import axios, {AxiosResponse} from "axios";
import api from "../api";
import {MixinInterface} from "../types";

export const getRecordListService = (type:string) => {
    return axios.get(api.getRecordList,{params:{type}}).then((res:AxiosResponse<Array<MixinInterface>>)=>res.data);
}

