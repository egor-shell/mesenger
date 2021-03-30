import React from 'react';
import Axios from "axios";

function Login() {
    Axios({
        method: "GET",
        url: "http://localhost:3001/",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        console.log(res.data.message);
    });

    return (
        <div className="auth">
            <input type="text" />
            <button></button>
        </div>
    );
}

export default Login;