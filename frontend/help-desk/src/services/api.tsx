import axios from "axios";

// pegar .env e colocar no axios usando vite
// VITE_API_URL=http://localhost:3000
// para acessar a variavel de ambiente é só usar import.meta.env.VITE_API_URL

const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL,
});


export default api;