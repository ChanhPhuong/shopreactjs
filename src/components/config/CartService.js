import axios from './config'
const CartUserItem = (product_id, quantity) => {
    const token = localStorage.getItem('token');
    return axios.post('api/users/carts/items', { product_id, quantity }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
const CartUserItemList = () => {
    const token = localStorage.getItem('token');
    return axios.get('api/users/carts/items', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export { CartUserItem, CartUserItemList }