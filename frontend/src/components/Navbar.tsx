import React from 'react'
import '../css/Navbar.css'
import About4eve from '../img/About4eve.png';

function Navbar() {
    return (
        <div>
            <nav>
                <div className="logo">
                    <img src={About4eve} alt='logo'/>
                </div>
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/profile'>Profile</a></li>
                    <li><a href='/archive'>Archive</a></li>
                    <li><a href='/market'>Market</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;