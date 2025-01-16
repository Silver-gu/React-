import React, {useEffect, useState} from 'react';
import SinglePost from "../components/SinglePost";
import {useParams} from "react-router-dom";

const SinglePostPage = ({username: myName, secret}) => {

    const [item, setItem] = useState(null)
    const {username, id} = useParams()

    useEffect(() => {

        fetch(`http://167.99.138.67:1111/getsinglepost/${username}/${id}`)
            .then(res => res.json())
            .then(response => {
                console.log(response)
                setItem(response.data)
            })

    }, [])

    return (
        <div>
            {item && <SinglePost secret={secret} username={myName} post={item}/>}
        </div>
    );
};

export default SinglePostPage;