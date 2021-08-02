import React, { useState } from 'react';
import '../styles/pages/create_profile.scss';
import { Redirect } from 'react-router-dom'
import { UpdateUserProfile } from '../services/user'
import { useForm } from 'react-hook-form';

function CreateProfile() {
    const {register, handleSubmit} = useForm('');
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
            console.log(error)    
        }        

    if (redirect) {
        return <Redirect to ="/profile/:username"/>;
    }
}
    return (
        <>
            <div className="title">
                <h1>Create your profile</h1>
            </div>
            <form className="form-create-profile-container" onSubmit={handleSubmit(onSubmit)}>
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
                    {...register('position', {
                        required: "position is required", 
                    })}
                    onChange={e => setPosition(e.target.value)}
                    />
                </div>
                <div className="form-inputs">
                    <input
                    type="text"
                    name="affiliation"
                    className="form-input"
                    placeholder="Enter your affiliation"
                    {...register('affiliation', {
                        required: "Affiliation is required", 
                    })}
                    onChange={e => setAffiliation(e.target.value)}
                    />

                </div>
                <div className="form-inputs">
                    <input
                    type="text"
                    name="researchInterest"
                    className="form-input"
                    placeholder="Enter your research interest"
                    {...register('researchInterest', {
                        required: "Research Interest is required", 
                    })}
                    onChange={e => setResearchInterest(e.target.value)}
                    />
                </div>
                <div className="form-inputs"> 
                    <input
                    type="text"
                    name="location"
                    className="form-input"
                    placeholder="Enter your location"
                    {...register('location', {
                        required: "location is required", 
                    })}
                    onChange={e => setLocation(e.target.value)}
                    />
                    {/* {errors.password && 
                        <span style={{color: 'red', marginTop: '5px'}}>
                            {errors.password.message}
                        </span>} */}
                </div>
                <button type="submit" className="create-profile-btn">Submit</button>     
            </form>
        </>
    )
}


export default CreateProfile;