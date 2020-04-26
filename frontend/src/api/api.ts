import axios from 'axios';

const endpoint = 'http://localhost:8080';

export const getUsers = async () => await axios.get(`${endpoint}/api/users`);
export const postUser = async (data: Object) =>
    await axios.post(`${endpoint}/api/user`, data);

export const getRounds = async () => await axios.get(`${endpoint}/api/rounds`);

export const getTeams = async () => await axios.get(`${endpoint}/api/teams`);
