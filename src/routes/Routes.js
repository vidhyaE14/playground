/* 
In this file we have routed the routes to its respective pages. We have different routes for different pages like for login/signup page, service 
inventory page, platform dashboard page, customer solution page. 
*/

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WhiteboardPage from "../pages/WhiteBoardPage.js"
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.js"; 


function AllRoutes() {
    return (
        <BrowserRouter>
            <Routes>  
                <Route path="/" element={<WhiteboardPage />} />
                <Route 
                    path="/whiteboard" 
                    element={<ProtectedRoute><WhiteboardPage /></ProtectedRoute>} 
                />
            </Routes>
        </BrowserRouter>       
    );
}

export default AllRoutes;
