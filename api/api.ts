import axios from 'axios';
import { pathProvider } from '@/helper/pathProvider';


const api = axios.create({
    baseURL: pathProvider.getBasePath(),
})

export default api;