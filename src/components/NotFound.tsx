import React from "react";
import { Navigate } from "react-router-dom";

const NotFound = (props: any) => {
	return <Navigate to={{ pathname: props.redirect_pathname }} />;
};

export default NotFound;
