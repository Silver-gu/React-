import React, {useEffect, useState} from 'react';
import SinglePost from "../components/SinglePost";

const IndexPage = ({username, secret}) => {
    const [items, setItems] = useState([])

    useEffect(() => {

        fetch("http://167.99.138.67:1111/getallposts")
            .then(res => res.json())
            .then(response => {
                setItems(response.data)
            })

    }, [])


    function removeSingleItem(id) {
        let copy = [...items]
        copy = copy.filter(x => x.id !== id)
        setItems(copy)
    }

    return (
        <div className="d-flex wrap gap10">
            {items.map((x) => (
                <SinglePost remove={removeSingleItem} secret={secret} username={username} post={x} key={x.id}/>
            ))}
        </div>
    );
};

export default IndexPage;