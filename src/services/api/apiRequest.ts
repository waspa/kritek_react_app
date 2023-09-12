import { axiosInstance } from "./axiosDefaults";

export const apiRequest = (method: string, url: string, data?: object) => {
	const response = axiosInstance()({
		method,
		url,
		data,
	});

	return response;
};
