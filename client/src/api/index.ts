import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

const createUser = (payload: any) => api.post("/signup", payload);

const loginUser = (payload: any) => {
  return api.post("/login", payload);
};

const logoutUser = () => {
  return api.post("/logout");
};

const getUsers = () => {
  return api.get("/users");
};

const getCards = () => {
  return api.get("/cards");
};

const addCard = (payload: any) => api.post("/cards", payload);

const updateCard = (payload: any) => {
  return api.put(`/cards/${payload.id}`, payload);
};

const moveCard = (payload: any) => {
  return api.put("/cards/move/board", payload);
};

const apis = {
  createUser,
  loginUser,
  logoutUser,
  getUsers,
  getCards,
  addCard,
  updateCard,
  moveCard,
};

export default apis;
