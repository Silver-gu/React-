import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Toolbar from "./components/Toolbar";
import {useState} from "react";
import IndexPage from "./pages/IndexPage";
import UserPostsPage from "./pages/UserPostsPage";
import SinglePostPage from "./pages/SinglePostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UploadPage from "./pages/UploadPage";

function App() {

    const [secret, setSecret] = useState(null)
    const [username, setUsername] = useState(null)

    function setLogin(secretKey, username) {
        setSecret(secretKey)
        setUsername(username)
    }

    return (
        <div>
            <BrowserRouter>
                <Toolbar secret={secret}/>

                <div className="grow3 p20">
                    <Routes>
                        <Route path="/login" element={<LoginPage setLogin={setLogin} />}/>
                        <Route path="/register" element={<RegisterPage/>}/>

                        <Route path="/userPosts/:username" element={<UserPostsPage secret={secret} username={username}/>}/>
                        <Route path="/singlePost/:username/:id" element={<SinglePostPage secret={secret} username={username}/>}/>

                        <Route path="/upload" element={<UploadPage secret={secret}/>}/>

                        <Route path="/" element={<IndexPage secret={secret} username={username}/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
