import { selectAllPlugs } from './plugsDataAccess.js'
import { selectAllUsers } from './usersDataAccess.js'

const downloadDb = async () => {
    const plugs = await selectAllPlugs()
    const users = await selectAllUsers()

    return { users, plugs }
}

export default { downloadDb }