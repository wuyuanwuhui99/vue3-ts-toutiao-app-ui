import {ChannelsInterface, UserDataInterface} from "../types"

export default interface StateInterface {
    token: string,
    userData: UserDataInterface | null,
    favoriteChannels: Array<ChannelsInterface>
}
