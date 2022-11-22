import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { PostProvider } from "./context/PostContext";
import { AuthProvider } from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<AuthProvider>
		<PostProvider>
			<App />
		</PostProvider>
	</AuthProvider>
);
