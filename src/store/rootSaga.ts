import { all, fork } from "redux-saga/effects";
import StudentSagas from "../services/students/sagas";

export default function* rootSaga() {
	yield all([fork(StudentSagas)]);
}
