import axios from 'axios';

export default axios.create({
    baseURL: process.env.backendUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
});