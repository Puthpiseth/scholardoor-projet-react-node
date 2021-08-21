import api from '../services/api';

const uploadNewArticle = async (data) => api.post('/articles/auth/upload-file', data);
const getArticles = async() => api.get('/articles/auth');
const deleteArticles = async() => api.delete('/articles/auth')

export {uploadNewArticle, getArticles, deleteArticles};