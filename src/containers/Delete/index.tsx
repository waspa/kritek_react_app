import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
	deleteStudent,
	fetchStudent,
	resetDeleteStudent,
} from "../../services/students/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Spinner from "../../components/Spinner";
import { StudentState } from "../../utils/types";

const DeleteContainer = () => {
	const [first_name, setFirstName] = useState<string | null>(null);
	const [last_name, setLastName] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { fetchStudentState, deleteStudentState } = useAppSelector(
		(state: { student: StudentState }) => state.student,
	);
	const { isloading, errors, student } = fetchStudentState;

	const { isloading: isDeleting, errors: deleteErrors } = deleteStudentState;

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

	const handleDelete = () => {
		const _id: { id: number } = { id: location.state.id };
		dispatch(deleteStudent(_id));
	};

	useEffect((): (() => void) => {
		if (isDeleting === "success") {
			alert("User deleted successfully");
			navigate(-1);
		}

		return () => dispatch(resetDeleteStudent());
	}, [isDeleting]);

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
							value={first_name}
							InputProps={{
								readOnly: true,
							}}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<TextField
							id="outlined-error-helper-text"
							label="Last Name"
							value={last_name}
							InputProps={{
								readOnly: true,
							}}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
					<div>
						<TextField
							label="Email"
							variant="filled"
							value={email}
							InputProps={{
								readOnly: true,
							}}
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
								color="primary"
								onClick={() => navigate(-1)}
							>
								Cancel
							</Button>
							<Button variant="contained" color="error" onClick={handleDelete}>
								Delete
							</Button>
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default DeleteContainer;
