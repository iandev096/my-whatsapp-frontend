import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-whatsapp-backend.herokuapp.com',
})

export default instance;