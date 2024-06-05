import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import axios from "./axioscreds";

const isAuthenticated = async () => {
    try {
        const response = await axios.get("/auth/check");
        return response.status === 200;
    } catch (err) {
        return false;
    }
};

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const auth = await isAuthenticated();
            setIsAuth(auth);
        };
        checkAuth();
    }, []);

    if (isAuth === null) {
        return <div>Loading...</div>;
    }

    return isAuth ? <Component {...rest} /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;