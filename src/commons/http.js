import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3000',
});

export default {
    'GET': http.get(),
    'POST': http.post(),
    'PUT': http.put(),
    'DELETE': http.delete(),
};