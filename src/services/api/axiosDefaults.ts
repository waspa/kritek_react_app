import axios from "axios";
import { BASE_URL } from "./urls";

// for endpoints that require jwt
export const axiosInstance = () => {
	const instance = axios.create({
		baseURL: BASE_URL,
		withCredentials: true,
		headers: {
			Accept: "application/json",
			"X-Requested-With": "XMLHttpRequest",
			Cache: "no-cache",
		},
	});

	return instance;
};
