import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

const getCards = () => api.get("/cards");

const addCard = (payload: any) => api.post("/cards", payload);

const apis = {
  getCards,
  addCard,
};

export default apis;
