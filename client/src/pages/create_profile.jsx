// import React, { useState } from 'react';
// import {useForm} from 'react-hook-form';
// import '../styles/pages/create-profile.scss';
// import { Link, Redirect } from 'react-router-dom'


// function CreateProfile() {
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

//     return (
//         <>
//             <div className="title">
//                 <h1>Create your profile</h1>
//             </div>
//             <form className="form-signup-container" >
                     
                            
//                 <div className="form-inputs">
                   
//                     <input
//                     type="text"
//                     name="firstname"
//                     className="form-input"
//                     placeholder="Enter your firstname"
//                     {...register('firstname', {
//                         required: "Firstname is required"
//                     })}
//                     onChange={e => setFirstname(e.target.value)}
//                     />
                    
//                 </div>
//                 <div className="form-inputs">
                    
//                     <input
//                     type="text"
//                     name="lastname"
//                     className="form-input"
//                     placeholder="Enter your lastname"
//                     {...register('lastname', {
//                         required: "Lastname is required"
//                     })}
//                     onChange={e => setLastname(e.target.value)}
//                     />
                    
//                 </div>
//                 <div className="form-inputs">
                    
//                     <input
//                     type="text"
//                     name="username"
//                     className="form-input"
//                     placeholder="Enter your username"
//                     {...register('username', {
//                         required: "Username is required", 
//                         minLength: {value: 5, 
//                         message: "Username must be greater than 5 charactors"
//                     }})}
//                     onChange={e => setUsername(e.target.value)}
//                     />
//                     {error &&
//                         <span style={{color: 'red', marginTop: '5px'}}>
//                             Username is already taken!
//                             <ErrorOutlineIcon style={{position: 'absolute', top: '10%', right: '3%', fontSize: '20px'}}/>
//                         </span>
//                     } 

//                     {errors.username && 
//                         <span style={{color: 'red', marginTop: '5px'}}>
//                             {errors.username.message}
//                             <ErrorOutlineIcon style={{position: 'absolute', top: '10%', right: '3%', fontSize: '20px'}}/>
//                         </span>}
//                 </div>
//                 <div className="form-inputs">
//                     <MailOutlineIcon className="icons"/>
//                     <input
//                     type="email"
//                     name="email"
//                     className="form-input"
//                     placeholder="Enter your email"
//                     {...register('email', {
//                         required: "Email is required", 
//                         pattern: {value: /^([a-z A-Z 0-9](\.)?)+@\w+\.(\w){2,4}$/, 
//                         message: "Email is invalid"
//                     }})}
//                     onChange={e => setEmail(e.target.value)}
//                     />
//                     {error && (
//                         <span style={{color: 'red', marginTop: '5px'}}>
//                             Email is already taken!
//                             <ErrorOutlineIcon style={{position: 'absolute', top: '10%', right: '3%', fontSize: '20px'}}/>
//                         </span>
//                     )}
//                     {errors.email && 
//                         <span style={{color: 'red', marginTop: '5px'}}>
//                             {errors.email.message}
//                             <ErrorOutlineIcon style={{position: 'absolute', top: '10%', right: '3%', fontSize: '20px'}}/>
//                         </span>}
//                 </div>
//                 <div className="form-inputs">
//                     <HttpsOutlinedIcon className="icons"/> 
//                     <input
//                     type="password"
//                     name="password"
//                     className="form-input"
//                     placeholder="Enter your password"
//                     {...register('password', {required: "Password is required", 
//                         pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
//                         message: "Password must be greater than 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
//                     }})}
//                     onChange={e => setPassword(e.target.value)}
//                     />
//                     {errors.password && 
//                         <span style={{color: 'red', marginTop: '5px'}}>
//                             {errors.password.message}
//                             <ErrorOutlineIcon style={{position: 'absolute', top: '10%', right: '3%', fontSize: '20px'}}/>
//                         </span>}
//                 </div>
//                 <div className="term-of-condition">
//                     <input 
//                     type="checkbox"
//                     name="termsAccepted"                    
//                     />
//                     <p>I agree to the term of service and acknowledge the <Link to="/private-policy">Privacy Policy</Link></p>
//                 </div>
//                 <button type="submit" className="signup-btn">Signup</button>     
//             </form>
//         </>
//     )
// }


// export default CreateProfile;