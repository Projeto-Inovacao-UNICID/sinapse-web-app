import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
    throw new Error("A variável NEXT_PUBLIC_API_URL não está definida.");
}

export const axiosInstance = axios.create({
    baseURL,
});
