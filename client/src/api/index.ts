import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

const createUser = (payload: any) => api.post("/signup", payload);

const loginUser = (payload: any) => {
  return api.post("/login", payload, {
    withCredentials: true,
  });
};

const getCards = () => api.get("/cards");

const addCard = (payload: any) => api.post("/cards", payload);

const apis = {
  createUser,
  loginUser,
  getCards,
  addCard,
};

export default apis;
