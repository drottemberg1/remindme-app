import './AuthLayout.styles.css'

import React from 'react'
import { WelcomeBlock } from '../../main'

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-layout">

            <div className="auth-layout-content">

                <div className="auth-layout-content-advertisement">
                    <WelcomeBlock />
                </div>

                <div className="auth-layout-content-form">
                    {children}
                </div>
            </div>
        </div>
    );
}


export default AuthLayout;
