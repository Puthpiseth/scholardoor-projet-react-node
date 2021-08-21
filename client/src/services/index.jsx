import axios from 'axios';
 
export const loginRequest = async(data) => axios.post('http://localhost:9000/user/signin',data);

export const registerRequest = async (data) =>  axios.post('http://localhost:9000/user/signup', data);
