import api from '../services/api';

const uploadNewArticle = async (data) => api.post('/articles/auth/upload-file', data);
const getArticles = async() => api.get('/articles/auth');
const deleteArticles = async() => api.delete('/articles/auth')
const getAllUsersArticles = async() => api.get('/articles/auth/get-articles')

export {uploadNewArticle, getArticles, deleteArticles, getAllUsersArticles};