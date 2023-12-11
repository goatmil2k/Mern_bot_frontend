import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div style={
                {
                    width: '100%',
                    padding: '20',
                    minHeight: '20vh',
                    maxHeight: '30vh',
                    marginTop: '50'
                }
            }> 
                <p style={{
                    fontSize: '30px',
                    textAlign: 'center' 
                }}>
                    Created By <Link className="nav-link" style={{color: 'white'}} to={'https://www.linkedin.com/in/krishna-kaflay-65715a232'}>Krishna.</Link>
                </p>
            </div>
        </footer>
    )
}

export default Footer;