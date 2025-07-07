/* This component is used so that user can't directly go to service inventory page or platform dashboard page or customer solution 
dashboard page without logging in first. 

When user logs-in they're first name is stored as session storage. So this is the condition when the first name is stored in session 
storage then user can freely navigate through different routes else they will be taken back to login page where they have to login. 
When user clicks the log out button the first name of user is cleared from session storage.*/

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = sessionStorage.getItem("userFirstName"); // Check if user is logged in

    return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
