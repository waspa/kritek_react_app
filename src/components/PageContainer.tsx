import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

interface PageContainerProps {
	children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
	return (
		<Container sx={{ mt: "100px", mb: "100px" }}>
			<Box sx={{ flexGrow: 1 }}>{children}</Box>
		</Container>
	);
};
