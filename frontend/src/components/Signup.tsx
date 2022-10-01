import React, { useState } from 'react'
import '../css/Signup.css';
import { UserInterface } from '../models/IUser';

function Signup() {

    const [user, setUser] = useState<Partial<UserInterface>>({});

    const apiUrl = "http://localhost:4200/user/signup";
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };

    const signup = () => {
        console.log(requestOptions);
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.message) {
                    console.log("signup completed");
                } else {
                    console.log("error");
                }
            });
    }

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof user;
        const { value } = event.target;
        setUser({ ...user, [id]: value });
        console.log(user);
      };

    return (
        <div className="signup-form-container">
            <form className="signup-form" onSubmit={
                    (e: React.SyntheticEvent) => {
                        e.preventDefault();
                        signup();
                    }}>
                <div className="signup-form-content">
                    <h3 className="signup-form-title">SIGN UP</h3>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter username"
                            id="username"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            id="email"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            id="password"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup;
