import React, { useState } from 'react'
import '../css/Signin.css';
import { UserInterface } from '../models/IUser';

function Signin() {

    const [user, setUser] = useState<Partial<UserInterface>>({});

    const apiUrl = "http://localhost:4200/user/signin";
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };

    const signin = () => {
        console.log(requestOptions);
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.status) {
                    console.log("signin completed");
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("id", res.result.id);
                    window.location.href = '/market'
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
        <div className="signin-form-container">
            <form className="signin-form" onSubmit={
                (e: React.SyntheticEvent) => {
                    e.preventDefault();
                    signin();
                }}>
                <div className="signin-form-content">
                    <h3 className="signin-form-title">SIGN IN</h3>
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

export default Signin;
