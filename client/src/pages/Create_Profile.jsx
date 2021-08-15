import React, { useState } from 'react';
import '../styles/pages/create-profile.scss';
import { useHistory } from 'react-router-dom'
import { CreateUserProfile } from '../services/user'
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Navbar from "../components/Navbar";

function CreateProfile() {

    const [avatar, setAvatar] = useState('null');
    const [username, setUsername] = useState('');
    const [position, setPosition] = useState('');
    const [affiliation, setAffiliation] = useState('');
    const [researchInterest, setResearchInterest] = useState('');
    const [location, setLocation] = useState('');
    const history = useHistory();
    // const [redirect, setRedirect] = useState(false);

    const onChange = (e) => {
        console.log(e.target.files)
        setAvatar(e.target.files[0]);
    }

    const onSubmit = async (data) => {        
        
        let formData = new FormData();
        formData.append('avatar', avatar);

        try {
            const profile = {
                username,
                position,
                affiliation,
                researchInterest,
                location
            }
            formData.append('profile', JSON.stringify(profile))
            const response = await CreateUserProfile(formData);
            console.log(response.data)
            history.push('/profile/:id')
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
            <form className="form-create-profile-container" onSubmit={onSubmit}>
                <div className="create-profile-avatar" name="avatar">
                    <AccountCircle className="create-profile-avatar-icon"/ >
                </div>
                <input 
                type="file"
                name="avatar"
                className="avatar-upload"
                id="input"
                accept="image/*"
                onChange={onChange}
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
                    onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-inputs">
                    <input
                    type="text"
                    name="position"
                    className="form-input"
                    placeholder="Enter your position"
                    onChange={e => setPosition(e.target.value)}
                    />
                </div>
                <div className="form-inputs">
                    <input
                    type="text"
                    name="affiliation"
                    className="form-input"
                    placeholder="Enter your affiliation"
                    onChange={e => setAffiliation(e.target.value)}
                    />

                </div>
                <div className="form-inputs">
                    <input
                    type="text"
                    name="researchInterest"
                    className="form-input"
                    placeholder="Enter your research interest"
                    onChange={e => setResearchInterest(e.target.value)}
                    />
                </div>
                <div className="form-inputs"> 
                    <input
                    type="text"
                    name="location"
                    className="form-input"
                    placeholder="Enter your location"
                    onChange={e => setLocation(e.target.value)}
                    />
                </div>
                <button type="submit" className="create-profile-btn">Submit</button>     
            </form>
        </>
    )
}

export default CreateProfile;
