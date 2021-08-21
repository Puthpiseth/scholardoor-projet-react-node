import React, {useState, useEffect} from 'react';

const AppContext = React.createContext();

export const  AppStore = ({children}) => {

    const [user, setUser] = useState({});
    
    const updateUser = (updatedUser) => setUser(updatedUser);

    useEffect(() => {
        if(localStorage.getItem('token')){
            const {user} = JSON.parse(localStorage.getItem('token'))
            setUser(user);
        }
    }, []);

    const value = {
        user,
        updateUser
    }

    return(
        <AppContext.Provider value = {value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;