import api from '../services/api';

const uploadNewArticle = async (data) => api.post('/articles/auth/upload-file', data);
const getArticles = async() => api.get('/articles/auth');
const deleteArticle = async(id) => api.delete(`/articles/auth/delete-articles/${id}`)
const getAllUsersArticles = async() => api.get('/articles/auth/get-articles')
const getDetails = async (userId) => api.get(`/articles/auth/details/${userId}`)
export {uploadNewArticle, getArticles, getAllUsersArticles, deleteArticle, getDetails};