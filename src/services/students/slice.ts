import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IStudent, IStudentCreateUpdate, StudentState } from "../../utils/types";

const initialState: StudentState = {
	createStudentState: { isloading: "", errors: null },
	editStudentState: { isloading: "", errors: null },
	deleteStudentState: { isloading: "", errors: null },
	fetchStudentState: { student: null, isloading: "", errors: null },
	fetchStudentsState: { students: [], isloading: "", errors: null },
};

export const studentSlice = createSlice({
	name: "student",
	initialState,
	reducers: {
		createStudent: (state, action: PayloadAction<{data: IStudentCreateUpdate}>) => {
			state.createStudentState.isloading = "processing";
			state.createStudentState.errors = null;
		},
		createStudentSuccess: (state, action: PayloadAction<IStudent>) => {
			state.createStudentState.isloading = "success";
		},
		createStudentFailed: (state, action: PayloadAction<object|string|null>) => {
			state.createStudentState.isloading = "failed";
			state.createStudentState.errors = action.payload;
		},
		editStudent: (state, action: PayloadAction<{id: number, data: IStudentCreateUpdate}>) => {
			state.editStudentState.isloading = "processing";
			state.editStudentState.errors = null;
		},
		editStudentSuccess: (state, action: PayloadAction<object|string|null>) => {
			state.editStudentState.isloading = "success";
		},
		editStudentFailed: (state, action: PayloadAction<object|string|null>) => {
			state.editStudentState.isloading = "failed";
			state.editStudentState.errors = action.payload;
		},
		deleteStudent: (state, action: PayloadAction<{id: number}>) => {
			state.deleteStudentState.isloading = "processing";
			state.deleteStudentState.errors = null;
		},
		deleteStudentSuccess: (state, action: PayloadAction<object|string|null>) => {
			state.deleteStudentState.isloading = "success";
		},
		deleteStudentFailed: (state, action: PayloadAction<object|string|null>) => {
			state.deleteStudentState.isloading = "failed";
			state.deleteStudentState.errors = action.payload;
		},
		fetchStudent: (state, action: PayloadAction<{id: number}>) => {
            state.fetchStudentState.isloading = "processing";
			state.fetchStudentState.errors = null;
		},
		fetchStudentSuccess: (state, action: PayloadAction<IStudent>) => {
			state.fetchStudentState.isloading = "success";
			state.fetchStudentState.student = action.payload;
		},
		fetchStudentFailed: (state, action: PayloadAction<object|string|null>) => {
			state.fetchStudentState.isloading = "failed";
			state.fetchStudentState.errors = action.payload;
		},
		fetchStudents: (state) => {
			state.fetchStudentsState.isloading = "processing";
			state.fetchStudentsState.errors = null;
		},
		fetchStudentsSuccess: (state, action: PayloadAction<IStudent[]>) => {
			state.fetchStudentsState.isloading = "success";
			state.fetchStudentsState.students = action.payload;
		},
		fetchStudentsFailed: (state, action: PayloadAction<object|string|null>) => {
			state.fetchStudentsState.isloading = "failed";
			state.fetchStudentsState.errors = action.payload;
        },
        resetCreateStudent: (state) => {
            state.createStudentState.isloading = ""
            state.createStudentState.errors = ""
        },
        resetEditStudent: (state) => {
            state.editStudentState.isloading = ""
            state.editStudentState.errors = ""
        },
        resetDeleteStudent: (state) => {
            state.deleteStudentState.isloading = ""
            state.deleteStudentState.errors = ""
        },
	},
});

export const {
	createStudent,
	createStudentSuccess,
	createStudentFailed,
	editStudent,
	editStudentSuccess,
	editStudentFailed,
	deleteStudent,
	deleteStudentSuccess,
	deleteStudentFailed,
	fetchStudent,
	fetchStudentSuccess,
	fetchStudentFailed,
	fetchStudents,
	fetchStudentsSuccess,
    fetchStudentsFailed,
    resetCreateStudent,
    resetEditStudent,
    resetDeleteStudent
} = studentSlice.actions;

export default studentSlice.reducer;
