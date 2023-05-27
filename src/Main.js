import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from './components/Auth/Login';
import Feed from './components/Aplication/Feed';

function App() {

	const routes = createBrowserRouter([
		{
			path: "/",
			element: <Login />
		},
		{
			path: "/feed",
			element: <Feed />
		}
	])

	return (
		<React.StrictMode>
			<RouterProvider router={routes} />
		</React.StrictMode>
	);
}
export default App;
