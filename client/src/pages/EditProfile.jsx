import React, { useState } from 'react';
import '../styles/pages/create-profile.scss';
import { useHistory } from 'react-router-dom'
import { UpdateUser } from '../services/user'
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Button} from '@material-ui/core';

function EditProfile() {

    const [, setAvatar] = useState('null');
    const [datas, setDatas] = useState({
        avatar :null,
        username: '',
        position: '',
        affiliation: '',
        researchInterest: '',
        location: ''
    })
   
    const history = useHistory();
    // const [redirect, setRedirect] = useState(false);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if(e.target.name === 'avatar'){
            setDatas({...datas, avatar : e.target.files[0]});
            return
        }
        setDatas({...datas, [name] : value});
    }

    const handleSubmit = async (e) => {        
        e.preventDefault();
        let formData = new FormData();

        formData.append('avatar', datas.avatar);

        try {
            const datasToSend = {...datas};
            delete datasToSend.avatar;

            for(let data in datasToSend){
                //if datasToSend[data]=== '' delete datasToSend[data]
                !datasToSend[data] && (delete datasToSend[data])
            }
            formData.append('profile', JSON.stringify(datasToSend))
            const response = await UpdateUser(formData);
            console.log(response.data)
            // history.push('/profile/:id')
            // setRedirect(true);
        }
        catch(error) {
            console.log(error);
        }        

    // if (redirect) {
    //     return <Redirect to ="/profile/:id"/>;
    // }
}

    return (
        <>
            <Navbar />
                <form className="form-create-profile-container" onSubmit={handleSubmit}>
                    <div className="create-profile-avatar" name="avatar">
                        <AccountCircle className="create-profile-avatar-icon" />
                    </div>
                    <input 
                        type="file"
                        mutilple = {false}
                        name="avatar"
                        className="avatar-upload"
                        id="input"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    <div className="label">
                        <label htmlFor="input" className="avatar-label">
                            <AddAPhotoIcon className="add-avatar-icon"/>
                            <p>Choose your avatar</p>
                        </label>
                    </div>
        
                    <div className="form-inputs">
                        <input
                        type="text"
                        name="username"
                        className="form-input"
                        placeholder="Enter your username"
                        onChange={handleChange}
                        />
                    </div>
        
                    <div className="form-inputs">
                        <input
                        type="text"
                        name="position"
                        className="form-input"
                        placeholder="Enter your position"
                        onChange={handleChange}
                        />
                    </div>
                    <div className="form-inputs">
                        <input
                        type="text"
                        name="affiliation"
                        className="form-input"
                        placeholder="Enter your affiliation"
                        onChange={handleChange}
                        />
    
                    </div>
                    <div className="form-inputs">
                        <input
                        type="text"
                        name="researchInterest"
                        className="form-input"
                        placeholder="Enter your research interest"
                        onChange={handleChange}
                        />
                    </div>
                    <div className="form-inputs"> 
                        <input
                        type="text"
                        name="location"
                        className="form-input"
                        placeholder="Enter your location"
                        onChange={handleChange}
                        />
                    </div>
                    <Button 
                        type="submit" 
                        size = 'medium' 
                        variant ='contained' 
                        color = 'primary'
                    >
                        Submit
                    </Button>     
                </form>
            <Footer/>
        </>
    )
}

export default EditProfile;
