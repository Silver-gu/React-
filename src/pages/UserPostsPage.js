import React, {useEffect, useState} from 'react';
import SinglePost from "../components/SinglePost";
import {useParams} from "react-router-dom";

const UserPostsPage = ({username: myName, secret}) => {
    const [items, setItems] = useState([])
    const {username} = useParams()

    useEffect(() => {

        fetch("http://167.99.138.67:1111/getUserPosts/"+username)
            .then(res => res.json())
            .then(response => {
                setItems(response.data)
            })

    }, [])

    return (
        <div className="d-flex wrap gap10">
            {items.map(x => <SinglePost secret={secret} username={myName} post={x} key={x.id}/>)}
        </div>
    );
};

export default UserPostsPage;