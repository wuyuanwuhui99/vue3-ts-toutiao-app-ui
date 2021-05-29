import * as types from './mutation-types'

export const setToken = ({ commit }:any, myData:string):void => {
  commit(types.TOKEN, myData)
}
