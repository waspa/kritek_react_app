import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface SpinnerProps {
	color: string;
	size: number;
}

const Spinner: React.FC<SpinnerProps> = ({ color = "#54ADEC", size = 40 }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress
				size={size}
				data-testid="loader"
				sx={{ color: color }}
			/>
		</Box>
	);
};

export default Spinner;
