import api from '../Utils/Api'
const loginWithUserCredentials = async (email, password) => {
    const data = {
        email, password
    }
    return await api.post('Users/authenticate', data).then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data));
        return response.data
    });
}
const logout = () => {
    localStorage.clear();
};

export const authService = {
    loginWithUserCredentials,
    logout
}