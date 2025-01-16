import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

const LoginPage = ({setLogin}) => {

    const nameRef = useRef()
    const passRef = useRef()
    const nav = useNavigate()

    const [error, setError] = useState(null)

    function auth() {
        const user = {
            name: nameRef.current.value,
            password: passRef.current.value
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch("http://167.99.138.67:1111/login", options)
            .then(res => res.json())
            .then(response => {
                if(response.success) {
                    setError(null)
                    setLogin(response.secretKey, user.name)
                    nav("/upload")
                } else {
                    setError(response.message)
                }
            })
    }

    return (
        <div className="d-flex j-center">
            <div className="d-flex direction-col gap10 authForm">
                <h1>Login</h1>
                <input type="text" placeholder="username" ref={nameRef}/>
                <input type="password" placeholder="password" ref={passRef}/>

                {error && <h3>{error}</h3>}

                <button onClick={auth}>Login</button>
            </div>

        </div>
    );
};

export default LoginPage;