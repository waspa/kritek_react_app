import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
	editStudent,
	fetchStudent,
	resetEditStudent,
} from "../../services/students/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Spinner from "../../components/Spinner";
import { IStudentCreateUpdate } from "../../utils/types";

const UpdateContainer = () => {
	const [first_name, setFirstName] = useState<string | null>(null);
	const [last_name, setLastName] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { fetchStudentState, editStudentState } = useAppSelector(
		(state) => state.student,
	);
	const { isloading, errors, student } = fetchStudentState;

	const { isloading: isUpdating, errors: updateErrors } = editStudentState;

	useEffect(() => {
		const _id: { id: number } = { id: location.state.id };
		dispatch(fetchStudent(_id));
	}, [navigate]);

	useEffect(() => {
		if (isloading === "success") {
			setFirstName(student && student.first_name);
			setLastName(student && student.last_name);
			setEmail(student && student.email);
		}
	}, [student, isloading]);

	const handleUpdate = () => {
		const _updateDetails: { id: number; data: IStudentCreateUpdate } = {
			id: location.state.id,
			data: { first_name, last_name, email },
		};
		dispatch(editStudent(_updateDetails));
	};

	useEffect((): (() => void) => {
		if (isUpdating === "success") {
			alert("User updated successfully");
			navigate(-1);
		}

		return () => dispatch(resetEditStudent());
	}, [isUpdating]);

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
								onClick={handleUpdate}
							>
								Update
							</Button>
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default UpdateContainer;
