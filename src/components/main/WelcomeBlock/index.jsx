import './WelcomeBlock.styles.css'

import { Link } from "react-router-dom";
import React from 'react'

const WelcomeBlock = () => {
    return (
        <div className="wel-text">
            {/* Welcome Heading */}
            <h1 className="wel-heading">
                Simply manage your
                <span> Reminders </span>
            </h1>
            <div className="wel-quote">
                "Create reminders and receive notifications"
            </div>
            <div className="responsive-img">

            </div>
            <Link className="sign-up-btn" to='/signup'>Get Started</Link>

        </div>
    )
}


export default WelcomeBlock;
