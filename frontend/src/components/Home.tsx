import React from 'react'
import '../css/Home.css'
import Navbar from './Navbar';

function Home() {
    return (
        <body>
            <header>
                <div className="container">
                    <Navbar></Navbar>
                </div>
            </header>

            <section className="Profile">
                <div className="container">
                    <div className="header-profile">
                        <h1>Profile</h1>
                    </div>
                </div>

            </section>
        </body>
    );
}

export default Home;