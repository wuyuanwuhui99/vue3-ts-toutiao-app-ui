import * as types from './mutation-types'
import stateInterface from "./stateInterface";
export default {
    [types.MY_DATA](state:stateInterface, myData:string){
        state.myData = myData
    }
}
