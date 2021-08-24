import React, { useState } from 'react';
import '../styles/pages/update_profile.scss';
import { Redirect } from 'react-router-dom'
import { UpdateUserProfile } from '../services/user'
import Navbar from "../components/Navbar";

function UpdateProfile() {
    const [file, setFile] = useState('null');
    const [position, setPosition] = useState('');
    const [affiliation, setAffiliation] = useState('');
    const [researchInterest, setResearchInterest] = useState('');
    const [location, setLocation] = useState('');
    const [redirect, setRedirect] = useState(false);

    const onChange = (e) => {
        console.log(e.target.files)
        setFile(e.target.files[0]);
    }

    const onSubmit = async (e) => {        
        
        let formData = new FormData();
        formData.append('avatar', file);

        try {
            const profile = {
                position: position,
                affiliation: affiliation,
                researchInterest: researchInterest,
                location: location
            }
            formData.append('profile', JSON.stringify(profile))
            const response = await UpdateUserProfile(formData);
            console.log(response.data)
            setRedirect(true);
        }
        catch(error) {
            console.log(error);
        }        

    if (redirect) {
        return <Redirect to ="/profile/:id"/>;
    }
}
    return (
        <>
            <Navbar />
            <form className="form-update-profile-container" onSubmit={onSubmit}>
                <p className="form-info">
                    Click "Browse" to choose your profile photo and  
                </p>
                <p className="form-info">
                    "submit" to submit your profile information
                </p>
                <div className="form-inputs">
                    <label className="browse-btn">Browse</label>
                    <input
                    type="file"
                    name="avatar"
                    className="file-input"
                    onChange={onChange}
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
                <button
                    type="submit" 
                    className="create-profile-btn"
                >
                    Submit
                </button>     
            </form>
        </>
    )
}


export default UpdateProfile;