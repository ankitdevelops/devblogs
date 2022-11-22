import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoutes = () => {
	let { isLoggedin } = useContext(AuthContext);

	return isLoggedin ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
