import { IStudent } from "../../utils/types";
import { apiRequest } from "../api/apiRequest";
import { STUDENTS_ENDPOINT } from "../api/urls";

export const createStudent = (data: IStudent) => {
	return apiRequest("POST", STUDENTS_ENDPOINT, data);
};

export const editStudent = (id: number, data: IStudent) => {
	return apiRequest("PATCH", `${STUDENTS_ENDPOINT}${id}`, data);
};

export const deleteStudent = (id: number) => {
	return apiRequest("DELETE", `${STUDENTS_ENDPOINT}${id}`);
};

export const fetchStudents = () => {
	return apiRequest("GET", STUDENTS_ENDPOINT);
};

export const fetchStudent = (id: number) => {
	return apiRequest("GET", `${STUDENTS_ENDPOINT}${id}`);
};
