import api from '../services/api';

const UpdateUser = async (data) => await api.patch('/user/auth/update-profile', data);

export {UpdateUser};