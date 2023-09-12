import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
	createStudent,
	resetCreateStudent,
} from "../../services/students/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Spinner from "../../components/Spinner";
import { IStudentCreateUpdate, StudentState } from "../../utils/types";

const CreateContainer = () => {
	const [first_name, setFirstName] = useState<string | null>(null);
	const [last_name, setLastName] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { createStudentState } = useAppSelector(
		(state: { student: StudentState }) => state.student,
	);
	const { isloading, errors } = createStudentState;

	const handleCreate = () => {
		const _studentDetails: { data: IStudentCreateUpdate } = {
			data: { first_name, last_name, email },
		};
		dispatch(createStudent(_studentDetails));
	};

	useEffect((): (() => void) => {
		if (isloading === "success") {
			alert("User created successfully");
			navigate(-1);
		}

		return () => dispatch(resetCreateStudent());
	}, [isloading]);

	return (
		<Box sx={{}}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
					marginBottom: "10px",
				}}
			>
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "25ch" },
					}}
					noValidate
					autoComplete="off"
				>
					<div>
						<TextField
							id="outlined-error"
							label="First Name"
							placeholder="Enter first name"
							value={first_name}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<TextField
							id="outlined-error-helper-text"
							label="Last Name"
							placeholder="Enter last name"
							value={last_name}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
					<div>
						<TextField
							label="Email"
							placeholder="Enter email"
							variant="filled"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						marginTop: "20px",
						width: "40%",
					}}
				>
					{isloading === "processing" ? (
						<Spinner size={25} color="black" />
					) : (
						<>
							<Button
								variant="contained"
								color="error"
								onClick={() => navigate(-1)}
							>
								Cancel
							</Button>
							<Button
								variant="contained"
								color="success"
								onClick={handleCreate}
							>
								Create
							</Button>
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default CreateContainer;
