import api from '../Utils/Api'

const getChucvu = async () => {
    return await api.get('Chucvu').then((response) => {
        return response
    });
};
export const chucvuService = {
    getChucvu
}