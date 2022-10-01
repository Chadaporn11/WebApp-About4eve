import React from 'react'
import '../css/Navbar.css'

function Navbar() {
    return (
        <div>
            <nav>
                <div className="logo">
                </div>
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/profile'>Profile</a></li>
                    <li><a href='/archive'>Archive</a></li>
                    <li><a href='/dashboard'>Market</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;