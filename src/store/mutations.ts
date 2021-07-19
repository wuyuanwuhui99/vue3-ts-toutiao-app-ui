import * as types from './mutation-types'
import stateInterface from "./stateInterface";
import {UserDataInterface} from "../types"

export default {
    [types.TOKEN](state: stateInterface, token: string): void {
        state.token = token
    },
    [types.USER_DATA](state: stateInterface, userData: UserDataInterface): void {
        state.userData = userData
    },
}
