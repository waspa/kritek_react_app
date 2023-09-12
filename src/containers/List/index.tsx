import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TabularComponent from "./TabularComponent";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const List = () => {
	const navigate = useNavigate();

	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "end",
					alignItems: "center",
					marginBottom: "10px",
				}}
			>
				<Button
					variant="contained"
					color="success"
					onClick={() => navigate("/create")}
				>
					Add
				</Button>
			</Box>

			<TabularComponent />
		</Box>
	);
};

export default List;
