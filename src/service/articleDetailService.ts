import axios from "axios";
import api from "@/api";

export const getArticleService = async (id:number) => {
    return axios.get(`${api.getArticleDetail}/${id}`);
}
