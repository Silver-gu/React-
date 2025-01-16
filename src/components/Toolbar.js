import React from 'react';
import {Link} from "react-router-dom"

const Toolbar = ({secret}) => {
    return (
        <div className="d-flex gap10 p20 border">
            <Link to="/">Home</Link>
            {!secret && <Link to="/login">Login</Link>}
            {!secret && <Link to="/Register">Register</Link>}
            {secret && <Link to="/upload">Upload</Link>}
        </div>
    );
};

export default Toolbar;