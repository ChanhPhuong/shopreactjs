import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { fetchAllProduct } from '../config/ProductService'
import ReactStars from 'react-stars'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"



const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <i className='fa fa-long-arrow-alt-right'></i>
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <i className='fa fa-long-arrow-alt-left'></i>
      </button>
    </div>
  )
}
const FlashCard = ({ productItems, addToCart }) => {

  const [count, setCount] = useState(0)
  const [ListProduct, setListProduct] = useState([]);
  const [ListProductDetail, setProductDetail] = useState({});
  const increment = () => {
    setCount(count + 1)
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  useEffect((props) => {

    getUser();
  }, [])

  const getUser = async () => {
    let res = await fetchAllProduct();
    console.log('check product', res)

    setListProduct(res);

  }


  // useEffect(() => {
  //   const getTodo = async () => {
  //     try {
  //       const res = await axios.get(
  //         'https://reqres.in/api/users'
  //       )
  //       // console.log(res.data)
  //       setListProduct(res.data)
  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //   }
  //   getTodo()
  // })
  // useEffect(() => {
  //   fetch('http://localhost:3001/frontend/produkHome')
  //     .then(Response => {
  //       return Response.json()

  //     })
  //     .then(ListProduct => {
  //       setListProduct(ListProduct)
  //       console.log(">>>> check data:  ", ListProduct)
  //     })
  // }, [])



  const handleProductDetail = (product) => {
    setProductDetail(product)

  }

  return (
    <>


      <Slider {...settings}>
        {ListProduct && ListProduct.length > 0 &&
          ListProduct.map((item, index) => {
            return (
              <div className='box' key={item.id} >
                <div className='product mtop'>
                  <div className='img'>
                    <span className='discount'>% Off</span>
                    <img className="imageheder" src={item.image_url} alt='' />
                    <div className='product-like'>
                      <label>{count}</label> <br />
                      <i className='fa-regular fa-heart'  ></i>
                      <br />
                      <i class="detail fa-sharp fa-regular fa-eye" onClick={() => handleProductDetail(item)}></i>
                    </div>
                  </div>
                  <div className='product-details'>
                    <NavLink to={`/produkDetil/${item.id}`}><h3 >{item.name}</h3></NavLink>
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
                      <button onClick={() => addToCart(item)}>
                        <i className='fa fa-plus'></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            )
          })
        }

      </Slider>
    </>
  )
}

export default FlashCard
