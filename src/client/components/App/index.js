import './index.css';
import React from 'react';
import UsersList from "../UsersList";
import {Route, Routes} from "react-router-dom";
import UserCreate from "../UserCreate";
import UserDetails from "../UserDetails";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' exact element={<UsersList/>}/>
                <Route path='/create-user' element={<UserCreate/>}/>
                <Route path='/edit-user/:editId' element={<UserCreate/>}/>
                <Route path='/user-details/:id' element={<UserDetails/>}/>
            </Routes>
        </div>
    );
}

export default App;
