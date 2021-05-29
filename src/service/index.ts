import axios from "axios";
import api from "../api";
import mapActions from "../store/mapActions";

const {setUserData} = mapActions(["setUserData"]);

export const getUserDataService = async () => {
    return new Promise(async () => {
        let userData = await axios.get(api.getUserData)
        setUserData(userData)
    })
}
