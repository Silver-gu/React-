import React, {useRef, useState} from 'react';

const RegisterPage = () => {

    const nameRef = useRef()
    const passRef = useRef()
    const passTwoRef = useRef()

    const [error, setError] = useState(null)

    function auth() {
        const user = {
            name: nameRef.current.value,
            passwordOne: passRef.current.value,
            passwordTwo: passTwoRef.current.value

        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch("http://167.99.138.67:1111/createaccount", options)
            .then(res => res.json())
            .then(response => {
                console.log(response)

                if(response.success) {
                    setError(null)
                } else {
                    setError(response.message)
                }
            })
    }

    return (
        <div className="d-flex j-center">
            <div className="d-flex direction-col gap10 authForm">
                <h1>Register</h1>
                <input type="text" placeholder="username" ref={nameRef}/>
                <input type="password" placeholder="password one" ref={passRef}/>
                <input type="password" placeholder="password two" ref={passTwoRef}/>

                {error && <h3>{error}</h3>}

                <button onClick={auth}>Register</button>
            </div>
        </div>
    );
};

export default RegisterPage;