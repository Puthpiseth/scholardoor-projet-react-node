import React, {useState, useEffect} from 'react'
import {deleteAllUsersArticles} from '../services/article';

function DeleteArticles () {
    const [articles, setArticles] = useState([]);

    useEffect (()=>{
        const removeArticles = async() =>{
            const response = await deleteAllUsersArticles();
            // console.log(response);
            setArticles(response.data)
        }
        removeArticles();
       
    })
    return (
        <div>
            
        </div>
    )
}

export default DeleteArticles
