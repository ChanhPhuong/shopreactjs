//import React, { useState } from "react"

//const ShopCart = ({ addToCart, shopItems }) => {
//  const [count, setCount] = useState(0)
//  const increment = () => {
//    setCount(count + 1)
//  }

//  return (
//    <>
//      {shopItems.map((shopItems) => {
//        return (
//          <div className='product mtop'>
//            <div className='img'>
//              <span className='discount'>{shopItems.discount}% Off</span>
//              <img src={shopItems.cover} alt='' />
//              <div className='product-like'>
//                <label>{count}</label> <br />
//                <i className='fa-regular fa-heart' onClick={increment}></i>
//              </div>
//            </div>
//            <div className='product-details'>
//              <h3>{shopItems.name}</h3>
//              <div className='rate'>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//              </div>
//              <div className='price'>
//                <h4>${shopItems.price}.00 </h4>
//                <button onClick={() => addToCart(shopItems)}>
//                  <i className='fa fa-plus'></i>
//                </button>
//              </div>
//            </div>
//          </div>
//        )
//      })}
//    </>
//  )
//}

//export default ShopCart
import { fetchAllProduct } from '../config/ProductService'
import ReactStars from 'react-stars'
import React, { useState, useEffect } from "react"

const ShopCart = ({ shopItems, addToCart }) => {

  const [ListProduct, setListProduct] = useState([]);
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }
  useEffect((props) => {

    getUser();
  }, [])

  const getUser = async () => {
    let res = await fetchAllProduct();
    console.log('check userr', res)
    setListProduct(res.slice(0, 6));

  }
  return (
    <>
      {ListProduct && ListProduct.length > 0 &&
        ListProduct.map((item, index) => {
          return (
            <div className='box' key={`user-${index}`} >
              <div className='product mtop'>
                <div className='img image-shop'>
                  <span className='discount'>{item.id}% Off</span>
                  <img className='imageheder' src={item.image_url} alt='' />
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
    </>
  )
}

export default ShopCart
