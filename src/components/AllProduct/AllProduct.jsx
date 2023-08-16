import './allproduct.css'
import { SearchProduct, fetchAllProduct } from '../config/ProductService'
import ReactStars from 'react-stars'
import React, { useState, useEffect } from "react"
import Catg from '../shops/Catg'
import _, { debounce, times } from "lodash";
import { useParams } from 'react-router-dom'
const AllProduct = (props) => {
    const { search } = useParams();
    const [ListProduct, setListProduct] = useState([]);
    const [count, setCount] = useState(0)
    const [sortBy, setSorBy] = useState("asc");
    const [sorField, setSortField] = useState("id");

    const increment = () => {
        setCount(count + 1)
    }
    useEffect(() => {

        getUser();
    }, [search])
    const getUser = async () => {
        let res = await SearchProduct(search);
        console.log('check search', res);
        setListProduct(res.slice(0, 9));
    }

    const handelSor = (sortBy, sorField) => {
        setSorBy(sortBy);
        setSortField(sorField);

        let clonelistUsers = _.cloneDeep(ListProduct);
        clonelistUsers = _.orderBy(clonelistUsers, [sorField], [sortBy]);
        setListProduct(clonelistUsers);
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
                            <h1 className='text-search'> Search <strong className=''>{search}</strong></h1>

                        </div>
                    </div>
                    <p></p>
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
                        {
                            ListProduct.map((item, index) => {
                                return (
                                    <div className='box' key={item.id} >
                                        <div className='product mtop'>
                                            <div className='img'>
                                                <span className='discount'>{item.id}% Off</span>
                                                <img className='image-allproduct' src={item.image_url} alt='' />
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
                                                    {/* step : 3  
                                                        if hami le button ma click garryo bahne 
                                                        */}
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

export default AllProduct
