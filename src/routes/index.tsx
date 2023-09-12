import React from "react";
import { Route, Routes } from "react-router-dom";
import List from "../containers/List";
import NotFound from "../components/NotFound";
import UpdateContainer from "../containers/Update";
import DeleteContainer from "../containers/Delete";
import CreateContainer from "../containers/Create";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<List />} />
			<Route path="/create" element={<CreateContainer />} />
			<Route path="/edit" element={<UpdateContainer />} />
			<Route path="/delete" element={<DeleteContainer />} />
			<Route element={<NotFound redirect_pathname="/" />} />
		</Routes>
	);
};
