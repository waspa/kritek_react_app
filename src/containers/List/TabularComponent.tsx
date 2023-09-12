import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Spinner from "../../components/Spinner";
import { fetchStudents } from "../../services/students/slice";
import { useNavigate } from "react-router-dom";

const ButtonActions = ({ id }: { id: number }) => {
	const navigate = useNavigate();

	return (
		<>
			<Button
				variant="contained"
				color="warning"
				onClick={() => navigate("edit", { state: { id } })}
			>
				Edit
			</Button>
			<Button
				variant="contained"
				color="error"
				onClick={() => navigate("delete", { state: { id } })}
			>
				Delete
			</Button>
		</>
	);
};

const TabularComponent = () => {
	const dispatch = useAppDispatch();
	const { fetchStudentsState } = useAppSelector((state) => state.student);
	const { students, isloading, errors } = fetchStudentsState;

	React.useEffect(() => {
		dispatch(fetchStudents());
	}, []);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>First Name</TableCell>
						<TableCell align="right">Last Name</TableCell>
						<TableCell align="right">Email</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{isloading === "processing" && <Spinner size={30} color={"black"} />}
					{students.map((row, index) => (
						<TableRow
							key={index}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.first_name}
							</TableCell>
							<TableCell align="right">{row.last_name}</TableCell>
							<TableCell align="right">{row.email}</TableCell>
							<TableCell align="right">
								{<ButtonActions id={row.id} />}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TabularComponent;
