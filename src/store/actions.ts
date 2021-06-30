import * as types from './mutation-types'
import {ChannelsInterface,UserDataInterface} from "@/types";

export const setToken = ({ commit }:any, myData:string):void => {
  commit(types.TOKEN, myData)
}

export const setUserData = ({ commit }:any, userData:UserDataInterface):void => {
    commit(types.USER_DATA, userData)
}
