import React, {useRef} from 'react';
import http from "../plugins/https"
import mainStore from "../store/main";

const HomePage= () => {
    const ref = useRef();
    const {user, setUser} = mainStore( state => state );
    async function addMoney () {
        const money = ref.current.value;
        const res =await http.postToken("http://localhost:2002/addMoney", {money})
        console.log(res)
        setUser({
            username: res.updatedUser.username,
            money: res.updatedUser.money
        })

    }
    return (
        <div>
            <div className="d-flex a-center">
                <h1>Logged in as: <b style={{color:"yellow"}}>{user.username}</b></h1>
                <img src={user.profileImage} alt="Profile"
                     style={{width: "150px", height: "150px", borderRadius: "50%", margin: "10px"}}/>
            </div>
            <h4>Current money : {user.money}</h4>

            <div className="mt-5 d-flex gap10">
                <input type="number" ref={ref} placeholder="money amount"/>
                <button style={{backgroundColor:"green", border:"none", borderRadius:"10px", color:"whitesmoke"}} onClick={addMoney}>Add Money</button>
            </div>
        </div>
    );
};

export default HomePage;
