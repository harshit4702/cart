import axios from 'axios';

export default axios.create({
<<<<<<< HEAD
    baseURL: process.env.backendUrl,
=======
    baseURL: '/',
>>>>>>> b804c165b6a5a9876a27993715b0ec1c7e6f4b9d
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
});