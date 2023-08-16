import React, { useEffect, useState } from "react"
import "./style.css"
import { CartUserItemList } from "../../components/config/CartService";
import { ProductDetaill } from "../../components/config/ProductService";

const Cart = () => {
  // Stpe: 7   calucate total of items
  // const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0)

  // prodcut qty total
  const [ListCartItem, setListCartItem] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const token = localStorage.getItem('token');

  const getListCartItem = async () => {
    let res = await CartUserItemList();
    console.log("Check Cart List >>>", res);
    setListCartItem(res);

    for (const item of res) {
      await getProductCart(item.product_id);
    }
  };

  const getProductCart = async (productId) => {
    const res = await ProductDetaill(productId);
    console.log("check product Cart detail >>>", res, productId);
    setProductCart((prevProductCart) => [...prevProductCart, res]);
  };


  useEffect(() => {
    getListCartItem();
  }, [token]);
  useEffect(() => {
    setProductCart([]);
    for (const item of ListCartItem) {
      getProductCart(item.product_id);
    }
  }, [ListCartItem]);

  useEffect(() => {
    const totalPrice = ListCartItem.reduce((price, item) => item.quantity + item.id, 0);
    setTotalPrice(totalPrice);
  }, [ListCartItem]);
  return (
    <>
      <section className='cart-items'>
        <div className='container d_flex'>
          {/* if hamro cart ma kunai pani item xaina bhane no diplay */}

          <div className='cart-details'>
            {ListCartItem.length === 0 && <h1 className='no-items product'>No Items are add in Cart</h1>}

            {/* yasma hami le cart item lai display garaaxa */}
            {ListCartItem.map((item) => {

              // const productcart = productCart.find((product) => product.product_id === item.product_id);
              const productcart = productCart.find((product) => product.id === item.product_id);
              const productName = productcart && productcart.name ? productcart.name : 'Product Name Not Available';
              const productQty = item.price * (productcart && productcart.price)

              return (
                <div className='cart-list product d_flex' key={item.id}>
                  <div className='img' style={{ marginLeft: 10 }}>
                    <img src={productcart && productcart.image_url} alt='' />
                  </div>
                  <div className='cart-details' style={{ marginLeft: 10 }}>
                    {/* <h3 href={item.product_id}>{productCart?.name || "Product Name Not Available"}</h3> */}
                    <h3 href={item.product_id}>{productName}  </h3>
                    <h4>
                      ${productcart && productcart.price}.00 * {item.quantity}
                      <span>${item.total}.00</span>
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button className='removeCart'>
                        <i className='fa-solid fa-xmark'></i>
                      </button>
                    </div>
                    {/* stpe: 5 
                    product ko qty lai inc ra des garne
                    */}
                    <div className='cartControl d_flex'>
                      <button className='incCart'
                      // onClick={() => addToCart(item)}
                      >
                        <i className='fa-solid fa-plus'></i>
                      </button>
                      <button className='desCart'
                      // onClick={() => decreaseQty(item)}
                      >
                        <i className='fa-solid fa-minus'></i>
                      </button>
                    </div>
                  </div>

                  <div className='cart-item-price'></div>
                </div>
              )
            })}
          </div>

          <div className='cart-total product'>
            <h2>Cart Summary</h2>
            <div className=' d_flex'>
              <h4>Total Price :</h4>
              <h3>${totalPrice}</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart
