import api from '../Utils/Api'

const getDonvitinh = async () => {
    return await api.get('Donvitinh').then((response) => {
        return response
    });
};

const putDonvitinh = async (donvitinh) => {
    return await api.put('Donvitinh/UpdateMultiple', donvitinh).then((response) => {
        console.log(response)
        return response

    });
}
export const donvitinhService = {
    getDonvitinh,
    putDonvitinh
}