import api from '../Utils/Api'
const loginWithUserCredentials = async (email, password) => {
    const data = {
        email, password
    }
    return await api.post('Users/authenticate', data).then((response) => {
        return response
    });
}
export const authService = {
    loginWithUserCredentials
}