import * as types from './mutation-types'
import stateInterface from "./stateInterface";
import {ChannelsInterface, UserDataInterface} from "../types"

export default {
    [types.TOKEN](state: stateInterface, token: string): void {
        state.token = token
    },
    [types.USER_DATA](state: stateInterface, userData: UserDataInterface): void {
        state.userData = userData
    },
    [types.FAVORITE_CHANNELS](state: stateInterface, favoriteChannels: Array<ChannelsInterface>): void {
        state.favoriteChannels = favoriteChannels
    }
}
