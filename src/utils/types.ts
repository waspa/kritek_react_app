export interface IStudent {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
}

export interface IStudentCreateUpdate {
	first_name: string | null;
	last_name: string | null;
	email: string | null;
}

export interface StudentState {
	createStudentState: { isloading: string; errors: object | string | null };
	editStudentState: { isloading: string; errors: object | string | null };
	deleteStudentState: { isloading: string; errors: object | string | null };
	fetchStudentState: {
		student: IStudent | null;
		isloading: string;
		errors: object | string | null;
	};
	fetchStudentsState: {
		students: IStudent[];
		isloading: string;
		errors: object | string | null;
	};
}

export interface ResponseGenerator {
	config?: any;
	data?: any;
	headers?: any;
	request?: any;
	status?: number;
	statusText?: string;
}

export interface ErrorResponse {
	response?: any;
}
