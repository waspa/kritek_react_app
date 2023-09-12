import { all, call, put, takeLeading } from "redux-saga/effects";
import {
	createStudent as createStudentApi,
	editStudent as editStudentApi,
	deleteStudent as deleteStudentApi,
	fetchStudent as fetchStudentApi,
	fetchStudents as fetchStudentsApi,
} from "./api";
import {
	fetchStudent,
	fetchStudentSuccess,
	fetchStudentFailed,
	fetchStudents,
	fetchStudentsSuccess,
	fetchStudentsFailed,
	createStudent,
	createStudentSuccess,
	createStudentFailed,
	editStudent,
	editStudentSuccess,
	editStudentFailed,
	deleteStudent,
	deleteStudentSuccess,
	deleteStudentFailed,
} from "./slice";
import { IStudent, ResponseGenerator } from "../../utils/types";

export function* getStudent({
	payload,
}: {
	type: ReturnType<typeof fetchStudent>;
	payload: { id: number };
}) {
	try {
		const { id } = payload;
		const response: ResponseGenerator = yield call(fetchStudentApi, id);
		const resp = response && response.data;

		yield put(fetchStudentSuccess(resp));
	} catch (err) {
		const message = err || "Failed to fetch user";
		yield put(fetchStudentFailed(message));
	}
}

export function* getStudents() {
	try {
		const response: ResponseGenerator = yield call(fetchStudentsApi);
		const resp = response && response.data;

		yield put(fetchStudentsSuccess(resp));
	} catch (err) {
		const message = err || "Failed to fetch students";
		yield put(fetchStudentsFailed(message));
	}
}

export function* addStudent({
	payload,
}: {
	type: ReturnType<typeof createStudent>;
	payload: { data: IStudent };
}) {
	try {
		const { data } = payload;
		const response: ResponseGenerator = yield call(createStudentApi, data);
		const resp = response && response.data;

		yield put(createStudentSuccess(resp));
	} catch (err) {
		const message = err || "Failed to create student";
		yield put(createStudentFailed(message));
	}
}

export function* updateStudent({
	payload,
}: {
	type: ReturnType<typeof editStudent>;
	payload: {
		id: number;
		data: IStudent;
	};
}) {
	try {
		const { data, id } = payload;
		const response: ResponseGenerator = yield call(editStudentApi, id, data);
		const resp = response && response.data;

		yield put(editStudentSuccess(resp));
	} catch (err) {
		const message = err || "Failed to edit student";
		yield put(editStudentFailed(message));
	}
}

export function* removeStudent({
	payload,
}: {
	type: ReturnType<typeof deleteStudent>;
	payload: { id: number };
}) {
	try {
		const { id } = payload;
		const response: ResponseGenerator = yield call(deleteStudentApi, id);
		const resp = response && response.data;

		yield put(deleteStudentSuccess(resp));
	} catch (err) {
		const message = err || "Failed to delete user";
		yield put(deleteStudentFailed(message));
	}
}

export default function* StudentSagas() {
	yield all([takeLeading(fetchStudent.type, getStudent)]);
	yield all([takeLeading(fetchStudents.type, getStudents)]);
	yield all([takeLeading(createStudent.type, addStudent)]);
	yield all([takeLeading(editStudent.type, updateStudent)]);
	yield all([takeLeading(deleteStudent.type, removeStudent)]);
}
