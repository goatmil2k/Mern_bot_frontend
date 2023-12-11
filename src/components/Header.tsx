import React from 'react';
import AppBar from '@mui/material/AppBar'
import ToolBar from '@mui/material/Toolbar'
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {

    const authorization = useAuth();
    return (
        <AppBar sx={{ bgcolor: 'transparent', position: 'static', boxShadow: 'none'}}>
            <ToolBar sx={{ display: 'flex', }}>
                <Logo />
                <div >
                    { authorization && authorization?.isLoggedIn ? (
                    <>
                        <NavigationLink bg="#00fffc" to="/chat" text="Go To Chat" textColor='black' /> 
                        <NavigationLink bg="#51538f" to="/" text="logout" textColor='white' onClick={authorization.logout} /> 
                    </> ) :  
                    (<>
                        <NavigationLink bg="#00fffc" to="/login" text="Login" textColor='black' /> 
                        <NavigationLink bg="#51538f" to="/signup" text="Sign Up" textColor='white' /> 
                    </>) }
                </div>
            </ToolBar>
        </AppBar>
    )
}

export default Header;