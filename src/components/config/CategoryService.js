import axios from './config'

const CategoryProductAll = (category_id) => {
    return axios.get(`/api/products/category/${category_id}`);
}
const CategoryAll = () => {
    return axios.get("/api/categories");
}
const CategoryDetaillll = (category_id) => {
    return axios.get(`/api/categories/${category_id}`)
}



export { CategoryProductAll, CategoryAll, CategoryDetaillll };