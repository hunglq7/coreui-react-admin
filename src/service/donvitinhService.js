import api from '../Utils/Api'

const getDonvitinh = async () => {
    return await api.get('Donvitinh').then((response) => {
        return response
    });
};
export const donvitinhService = {
    getDonvitinh
}