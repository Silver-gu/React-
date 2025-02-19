import React from 'react';
import {Link} from "react-router-dom";
import mainStore from "../store/main";

const Toolbar = () => {
    const {user} = mainStore(state => state)

    return (
        <div className="d-flex justify-content-between p-3 mb-5 toolbarbox">
            <div className="d-flex a-center gap-2">
                <Link className="toolbarLink" to="profile">Profile</Link>
                <Link className="toolbarLink" to="/users">Users</Link>
                <Link className="toolbarLink" to="/favorite">Favorite</Link>
                <Link className="toolbarLink" to="/subscribers">Subscribers</Link>
            </div>
            <div className="loginUser">
                Logged in as: <b>{user.username}</b>
            </div>
        </div>
    );
};

export default Toolbar;
