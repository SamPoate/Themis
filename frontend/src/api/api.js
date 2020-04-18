import axios from 'axios';

const endpoint = 'http://localhost:8080';

export const getRounds = async () =>
    await axios.get(endpoint + '/api/getRounds');
