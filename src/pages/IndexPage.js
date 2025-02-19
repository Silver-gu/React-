import React, {useEffect, useState} from 'react';
import mainStore from "../store/main"
import Login from "../components/Login";
import Register from "../components/Register";


const IndexPage = () => {
    return (
        <div className="d-flex gap-2 flex-wrap">
            <div className="grow1">
                <Login/>
            </div>
            <div className="grow1">
                <Register/>
            </div>
        </div>
    );
};

export default IndexPage;