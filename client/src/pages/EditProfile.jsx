import React, { useState, useContext } from 'react';
import '../styles/pages/edit-profile.scss';
import { UpdateUser } from '../services/user'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Navbar from "../components/Navbar";
import {Avatar} from '@material-ui/core';
import AppContext from '../store';
import {ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function successEditProfile() {
    toast.success("You have successfully updated your profile", {
        className:"success-toast",
        draggable: true,
        position: toast.POSITION.BOTTOM_LEFT,
    });
}


function EditProfile() {
    const appContext = useContext(AppContext);
    const [datas, setDatas] = useState({
        avatar :null,
        firstname: '',
        lastname: '',
        position: '',
        affiliation: '',
        researchInterest: '',
        location: ''
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if(e.target.name === 'avatar'){
            //real time update avatar 
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () =>{
                const newAvatar = reader.result.split(',')[1]
                appContext.updateUser({...appContext.user, avatar : newAvatar})
            }
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
            //return user new datas
            const response = await UpdateUser(formData);
            appContext.updateUser(response.data.user);
            //update localStorage with user new datas
            localStorage.setItem('token', JSON.stringify(response.data))

        }
        catch(error) {
            console.log(error);
        }        
}

    return (
        <>
            <Navbar />
                <form className="form-edit-profile-container" onSubmit={handleSubmit}>
                    <div className="edit-profile-avatar" name="avatar">
                        <Avatar className="edit-profile-avatar-icon" src = {`data:image/png;base64,${appContext.user.avatar}`}/>
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
                        name="firstname"
                        className="form-input"
                        placeholder="Enter your firstname"
                        onChange={handleChange}
                        />
                    </div>
                    <div className="form-inputs">
                        <input
                        type="text"
                        name="lastname"
                        className="form-input"
                        placeholder="Enter your lastname"
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
                    <ToastContainer
                        draggable={false}
                        transition={Zoom}
                        autoClose={3000}
                    />
                    <button
                        onClick={successEditProfile}  
                        type="submit" 
                        className="edit-profile-btn"
                    >
                        Submit
                    </button>      
                </form>
        </>
    )
}

export default EditProfile;
