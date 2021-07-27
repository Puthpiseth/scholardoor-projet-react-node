import React, { useState, useContext } from 'react';

const AuthCtx = React.createContext();

// export function useAuth() {
//     return useContext(AuthContext)
// }

// export function AuthContext (props) {
    
//     const [currentUser, setCurrentUser] = useState();
    
//     const value = {
//         currentUser
//     }

//     return (
//         <AuthCtx.Provider value={value}>
//             {props.children}
//         </AuthCtx.Provider>
//     )
// }

