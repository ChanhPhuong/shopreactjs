
import axios from './config'

const loginAip = (username, password) => {
    return axios.post('/api/users/login', { username, password });
}
const registerApi = (username, email, phone, address, password, password_confirmation, full_name) => {
    return axios.post('/api/users/register', { username, email, phone, address, password, password_confirmation, full_name })
}
export { loginAip, registerApi };