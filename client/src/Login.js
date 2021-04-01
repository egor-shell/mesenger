import React, { useState } from 'react';
import Axios from "axios";

function Login() {

    // const msg = () => {
    //     Axios({
    //         method: "GET",
    //         url: "http://localhost:3001/",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     }).then(res => {
    //         return res.data.message
    //     });
    // }
    const url = "http://localhost:3001/"
    function msg() {
        return Axios.get(url).then(res => {
            return res.data.message
        })
    }

    return (
        <div className="auth">
            {/* <input type="text" /> */}
            <p>Кликни на кнопку</p>
            <button onClick={() => msg()}>
                Нажми на меня
            </button>
        </div>
    );
}

export default Login;