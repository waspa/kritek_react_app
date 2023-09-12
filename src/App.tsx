import React, { Suspense } from "react";
import Box from "@mui/material/Box";
import Spinner from "./components/Spinner";
import { PageHeader } from "./components/PageHeader";
import { PageContainer } from "./components/PageContainer";

import { AppRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Spinner size={40} color={"#eee"} />}>
				<PageHeader />
				<Box sx={{ display: "flex" }}>
					<PageContainer>
						<div>
							<AppRoutes />
						</div>
					</PageContainer>
				</Box>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
