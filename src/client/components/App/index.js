import './index.css';
import React from 'react';
import UsersList from "../UsersList";
import {Route, Routes} from "react-router-dom";
import UserCreate from "../UserCreate";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' exact element={<UsersList/>}/>
                <Route path='/create-user' element={<UserCreate/>}/>
            </Routes>
        </div>
    );
}

export default App;
