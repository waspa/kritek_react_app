import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import LogoIcon from "../../assets/logo.svg";
import { Typography, makeStyles } from "@mui/material";

export const PageHeader = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="fixed"
				sx={{
					background: "white",
					color: "black",
				}}
			>
				<Toolbar>
					<Box component="div">
						<Typography typography={"menu6"}>Kritek</Typography>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
