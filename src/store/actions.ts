import * as types from './mutation-types'

export const setMyData = ({ commit }:any, myData:string):void => {
  commit(types.MY_DATA, myData)
}
