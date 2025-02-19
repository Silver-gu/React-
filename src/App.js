import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import mainStore from "./store/main";
import Toolbar from "./components/Toolbar";
import HomePage from "./pages/HomePage";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import Reservation from "./components/Reservation";
import UsersPage from "./pages/UsersPage";
import FavoritesPage from "./pages/FavoritesPage";
import SubscribersPage from "./pages/SubscribersPage";

function App() {
    const {user} = mainStore(state => state)

    return (
        <div>
            <div className="p-5">
                <BrowserRouter>
                    {user && <Toolbar />}
                    <Routes>
                        <Route path="/" element={<IndexPage />} />
                        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/" />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="/createPost" element={user ? <CreatePost /> : <Navigate to="/" />} />
                        <Route path="/posts" element={<PostList />} />
                        <Route path="/reservation/:postId" element={<Reservation />} />
                        <Route path="/users" element={<UsersPage/>}></Route>
                        <Route path="/favorite" element={<FavoritesPage/>}></Route>
                        <Route path="/subscribers" element={<SubscribersPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
