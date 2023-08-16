import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import "./Detail.css";
import { CategoryDetaill, ProductDetaill } from "../config/ProductService";
import axios from "axios";
import { fetchAllProduct } from '../config/ProductService'
import ReactStars from 'react-stars'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { CartUserItem } from "../config/CartService";
import { toast } from 'react-toastify';

const ProductDetail = (props) => {
    const navigate = useHistory()
    const imgs = document.querySelectorAll('.img-select a');
    const [productt, setProductt] = useState([]);
    const [quantity, setQuatity] = useState(1);
    const [cartitem, setCartItem] = useState([]);
    const { id } = useParams();

    const [ListProduct, setListProduct] = useState([]);
    const [count, setCount] = useState(0)
    const [Categorys, setCategory] = useState([])

    const [product_id, setProduct_id] = useState(productt.id);

    const imgBtns = [...imgs];
    let imgId = 1;
    imgBtns.forEach((imgItem) => {
        imgItem.addEventListener('click', (event) => {
            event.preventDefault();
            imgId = imgItem.dataset.id;
            slideImage();
        });
    });
    // useEffect(() => {
    //     const getProduct = async () => {
    //         const response = await fetch(`http://localhost:3001/frontend/produkDetil/${url}`);
    //         setProductt(await response.json());
    //         console.log('data>>>>', response)
    //     }
    //     getProduct();
    // }, []);

    const getProduct = async () => {
        const res = await ProductDetaill(id)
        console.log("check detaill >>>", res)
        setProductt(res)

    }
    const getCategory = async () => {
        const res = await CategoryDetaill(productt.category_id)
        console.log("check categori >>>", res)
        setCategory(res)

    }


    const increment = () => {
        setCount(count + 1)
    }
    useEffect(() => {
        getProduct();
        // getUser();

    }, [])
    useEffect(() => {
        getCategory();
    }, [productt]);

    // useEffect(() => {
    //     getCartItem();
    // }, [])
    const getAuthToken = () => {
        return localStorage.getItem('authToken'); // Assuming you stored the token with the key 'authToken' in local storage
    };

    const addCartItem = async () => {
        try {
            const token = localStorage.getItem('token');

            // Kiểm tra token có tồn tại
            if (!token) {
                // Xử lý khi không có token
                return;
            }

            // Gửi yêu cầu thêm sản phẩm vào giỏ hàng đến API với bearer token
            const response = await CartUserItem(productt.id, quantity)

            // Xử lý phản hồi từ API
            if (response.status === 200) {
                // Xử lý khi thêm sản phẩm vào giỏ hàng thành công
                toast.success('Thêm vào giỏ hàng thành công');
            } else {
                // Xử lý khi có lỗi xảy ra
                toast.error('Đã xảy ra lỗi khi thêm vào giỏ hàng');
            }
        } catch (error) {
            // Xử lý khi có lỗi xảy ra trong quá trình gọi API
            console.error(error);
            toast.error('Đã xảy ra lỗi khi gọi API');
        }
    };


    const getCartItem = async () => {
        const token = localStorage.getItem("token");

        // Kiểm tra token có tồn tại
        if (!token) {
            // Xử lý khi không có token
            alert("Lỗi ko lấy đc token!")
            return;
        }
        let res = await CartUserItem(productt.id, quantity)
        console.log("Check cart >>>>", res, productt.id)
        if (res && res.status === 401) {
            navigate.push("/login");
            toast.error('Đăng nhập mới đc mua hàng')


        }
        setCartItem(res)

    }
    const handleCartItem = () => {

        getCartItem();
    }
    // const getUser = async () => {
    //     let res = await fetchAllProduct();
    //     console.log('check userr', res)
    //     if (res && res.data) {
    //         setListProduct(res.data.slice(0, 3));
    //     }
    // }
    function slideImage() {
        const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }

    window.addEventListener('resize', slideImage);

    return (
        <>
            <div class="card-wrapper">
                <div class="card">

                    <div class="product-imgs">
                        <div class="img-display">
                            <div class="img-showcase">
                                <img src={productt.image_url} alt="shoe image" />
                                <img src={productt.image_url} alt="shoe image" />
                                <img src={productt.image_url} alt="shoe image" />
                                <img src={productt.image_url} alt="shoe image" />
                            </div>
                        </div>
                        <div class="img-select">
                            <div class="img-item">
                                <a href="#" data-id="1">
                                    <img src={productt.image_url} alt="shoe image" />
                                </a>
                            </div>
                            <div class="img-item">
                                <a href="#" data-id="2">
                                    <img src={productt.image_url} alt="shoe image" />
                                </a>
                            </div>
                            <div class="img-item">
                                <a href="#" data-id="3">
                                    <img src={productt.image_url} alt="shoe image" />
                                </a>
                            </div>
                            <div class="img-item">
                                <a href="#" data-id="4">
                                    <img src={productt.image_url} alt="shoe image" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="product-content">
                        <h2 class="product-title">{productt.name}</h2>
                        <a href="#" class="product-link">visit nike store</a>
                        <div class="product-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span>4.7(21)</span>
                        </div>

                        <div class="product-price">
                            <p class="last-price">Old Price: <span>$257.00 {productt.id} </span></p>
                            <p class="new-price">New Price: <span>${productt.price}.00 (5%)</span></p>
                        </div>

                        <div class="product-detail">
                            <h2>about this item: </h2>
                            <p>{productt.description}</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
                            <ul>
                                <li>Color: <span className="color-item" >
                                    <button className="color-item" style={{ backgroundColor: productt.color }}></button>
                                </span>
                                </li>
                                <li>Available: <span>in stock</span></li>
                                <li>Category: <span >
                                    <NavLink to={`/categorys/${productt.category_id}`}>{Categorys.name}</NavLink>

                                </span>
                                </li>
                                <li>Shipping Area: <span>All over the world</span></li>
                                <li>Shipping Fee: <span>Free</span></li>
                            </ul>
                        </div>

                        <div class="purchase-info">
                            <input type="number" min={1} value={quantity} max={10} onChange={(event) => setQuatity(event.target.value)} />
                            <button type="button" class="btn" onClick={() => addCartItem()}>
                                Add to Cart <i class="fas fa-shopping-cart"></i>
                            </button>
                            <button type="button" class="btn">Compare</button>
                        </div>

                        <div class="social-links">
                            <p>Share At: </p>
                            <a href="#">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-whatsapp"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductDetail