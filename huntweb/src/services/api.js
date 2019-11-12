//conexoes com serviços externos

import axios from 'axios';

//todas requisições partiram dessa url
const api = axios.create({baseURL: 'https://rocketseat-node.herokuapp.com/api'});

export default api;