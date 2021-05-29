import * as types from './mutation-types'
import stateInterface from "./stateInterface";
export default {
    [types.TOKEN](state:stateInterface, token:string){
        state.token = token
    }
}
