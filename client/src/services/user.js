import api from '../services/api';



const CreateUserProfile = async (data) => {
    return await api.patch('/user/create-profile', data)
}

const UpdateUserProfile = async (data) => {
    return await api.patch('/user/update-profile', data);
}

export {CreateUserProfile, UpdateUserProfile};