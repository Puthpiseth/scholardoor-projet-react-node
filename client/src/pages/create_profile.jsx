import React from 'react';
// import {useForm} from 'react-hook-form';
import '../styles/pages/create_profile.scss';
// import { Link, Redirect } from 'react-router-dom'


function CreateProfile() {
//     const {register, handleSubmit, formState: {errors}} = useForm();
//     const [firstname, setFirstname] = useState('');
//     const [lastname, setLastname] = useState('');
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [redirect, setRedirect] = useState(false);

//     const onSubmit = async (e) => {        
//         const user = {
//             firstname: firstname,
//             lastname: lastname,
//             username: username,
//             email: email,
//             password: password
//         }
        
//         try {
//             const response = await Register(user);
//             setRedirect(true);
//             console.log(response)
//         }
//         catch(error) {
//             setError(error)
//             // Check if the username is already taken
//             if(user.username || user.email) {
//                 setError(error.response.data.message)
//             }        
//         }        
//     }

//     if (redirect) {
//         return <Redirect to ="/profile/:username"/>;
//     }

    return (
        <>
            <div className="title">
                <h1>Create your profile</h1>
            </div>
            <form className="form-create-profile-container" >
                <div className="form-inputs">
                    <label className="browse-btn">Upload avatar</label>
                    <input
                    type="file"
                    name="avatar"
                    className="file-input"
                    // {...register('firstname', {
                    //     required: "Firstname is required"
                    // })}
                    // onChange={e => setFirstname(e.target.value)}
                    />
                </div>
                <div className="form-inputs">
                    <input
                    type="text"
                    name="position"
                    className="form-input"
                    placeholder="Enter your position"
                    // {...register('lastname', {
                    //     required: "Lastname is required"
                    // })}
                    // onChange={e => setLastname(e.target.value)}
                    />
                </div>
                <div className="form-inputs">
                    <input
                    type="text"
                    name="affiliation"
                    className="form-input"
                    placeholder="Enter your affiliation"
                    // {...register('username', {
                    //     required: "Username is required", 
                    //     minLength: {value: 5, 
                    //     message: "Username must be greater than 5 charactors"
                    // }})}
                    // onChange={e => setUsername(e.target.value)}
                    />
                    {/* {error &&
                        <span style={{color: 'red', marginTop: '5px'}}>
                            Username is already taken!
                        </span>
                    }  */}

                    {/* {errors.username && 
                        <span style={{color: 'red', marginTop: '5px'}}>
                            {errors.username.message}
                        </span>} */}
                </div>
                <div className="form-inputs">
                    <input
                    type="text"
                    name="researchInterest"
                    className="form-input"
                    placeholder="Enter your research interest"
                    // onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-inputs"> 
                    <input
                    type="text"
                    name="location"
                    className="form-input"
                    placeholder="Enter your location"
                    // onChange={e => setPassword(e.target.value)}
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