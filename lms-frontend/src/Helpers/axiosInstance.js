import axios from 'axios';

// Yeh apne server ka url hai , 
// Kyuki hame frontend aur backend ko connect
// karna padega
const BASE_URL = "https://localhost:5014/api/v1"

const axiosInstance = axios.create();

// Yeh instance ki ham property st up kar sakte hai!!
axiosInstance.defaults.baseURL = BASE_URL;

// Hame har request abb credentails ke sath hi send karni hai.
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;