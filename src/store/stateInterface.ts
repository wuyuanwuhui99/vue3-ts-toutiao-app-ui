import {ChannelsInterface, UserDataInterface} from "../types"

export default interface StateInterface {
    token: String,
    userData: UserDataInterface | null,
    favoriteChannels: Array<ChannelsInterface>
}
