import './allproduct.css'
import { CategoryProductAll } from '../config/CategoryService'
import { CategoryDetaillll } from '../config/CategoryService'
import ReactStars from 'react-stars'
import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import Catg from '../shops/Catg'
import _, { debounce, times } from "lodash";

const AllCategory = () => {

    const [ListCategory, setListCategory] = useState([]);
    const [CategoryDetaill, setCategoryDetaill] = useState([]);
    const [count, setCount] = useState(0)
    const { category_id } = useParams();
    const [sortBy, setSorBy] = useState("asc");
    const [sorField, setSortField] = useState("id");
    const increment = () => {
        setCount(count + 1)
    }
    useEffect(() => {
        getCategory();
        getCategoryDetaills();
    }, [category_id]);


    const getCategory = async () => {
        let res = await CategoryProductAll(category_id);
        console.log('check category', category_id)
        setListCategory(res);
    };
    const getCategoryDetaills = async () => {
        let res = await CategoryDetaillll(category_id);
        console.log('check category id', category_id)
        setCategoryDetaill(res);
    }
    const handelSor = (sortBy, sorField) => {
        setSorBy(sortBy);
        setSortField(sorField);

        let clonelistUsers = _.cloneDeep(ListCategory);
        clonelistUsers = _.orderBy(clonelistUsers, [sorField], [sortBy]);
        setListCategory(clonelistUsers);
    }
    return (
        <>
            <div className='arrange-product container d_flex'>
                <div className='contentWidth '>
                    <div className='grid1 product-content'>

                    </div>

                </div>

            </div>
            <div className='container d_flex'>

                <Catg />
                <div className='contentWidth'>
                    <div className='heading d_flex'>

                        <div className='heading-right row '>
                            <div>
                                <h1 className='text-search'> {CategoryDetaill.name}</h1>

                            </div>
                        </div>
                    </div>
                    <div className='heading container'>
                        <div className='d_flex '>
                            <strong>Sắp xếp theo: </strong>
                            <div className='checkbox-arrange'>
                                <input className='checkbox' type="checkbox" id="vehicle3" name="vehicle3" value="Boat" onClick={() => handelSor("desc", "name")} />
                                Tên A-Z
                            </div>

                            <div>
                                <input className='checkbox' type="checkbox" id="vehicle3" name="vehicle3" value="Boat" onClick={() => handelSor("asc", "name")} />
                                Tên Z-A
                            </div>
                            <div>
                                <input className='checkbox' type="checkbox" id="vehicle3" name="vehicle3" value="Boat" onClick={() => handelSor("desc", "id")} />
                                Hàng mới
                            </div>
                            <div>
                                <input className='checkbox' type="checkbox" id="vehicle3" name="vehicle3" value="Boat" onClick={() => handelSor("asc", "price")} />
                                Giá cao đến thấp
                            </div>
                            <div>
                                <input className='checkbox' type="checkbox" id="vehicle3" name="vehicle3" value="Boat" onClick={() => handelSor("desc", "price")} />
                                Giá thấp đến cao
                            </div>

                        </div>
                    </div>
                    <div className='product-content  grid1'>
                        {ListCategory && ListCategory.length > 0 &&
                            ListCategory.map((item, index) => {
                                return (
                                    <div className='box' key={item.id} >
                                        <div className='product mtop'>
                                            <div className='img'>
                                                <span className='discount'>% Off</span>
                                                <img src={item.image_url} alt={item.name} />
                                                <div className='product-like'>
                                                    <label>{count}</label> <br />
                                                    <i className='fa-regular fa-heart'  ></i>
                                                    <br />
                                                    <i class="detail fa-sharp fa-regular fa-eye"></i>
                                                </div>
                                            </div>
                                            <div className='product-details'>
                                                <h3 >{item.name}</h3>
                                                <div className='rate'>
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        value={4}
                                                        edit={false}
                                                        activeColor="#ffd700"
                                                    />
                                                </div>
                                                <div className='price'>
                                                    <h4>${item.price}.00 </h4>

                                                    <button >
                                                        <i className='fa fa-plus'></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default AllCategory
