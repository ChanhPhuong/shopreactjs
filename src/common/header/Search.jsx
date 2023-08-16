import React, { useEffect, useState } from "react"
import logo from "../../components/assets/images/logo.svg"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import { SearchProduct } from "../../components/config/ProductService";
const Search = ({ CartItem }) => {
  // fixed Header
  const [SearchProductts, setSearchProduct] = useState([])
  const [search, setSearch] = useState('')
  const { logout, user } = useContext(UserContext);
  const navigate = useHistory()
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })
  const handleLoguot = () => {
    logout();
    navigate.push("/");
    toast.success("Đã đăng xuất thành công")
  }
  useEffect(() => {
    SearchProducts()
    navigate.push("/");
  }, [])

  const SearchProducts = async () => {
    let res = await SearchProduct(search)
    console.log("check search>>> ", res)
    setSearchProduct(res);

  }
  const handlePressEnter = async (event) => {
    if (event && event.key === 'Enter') {
      await SearchProducts();
      navigate.push(`/allproduct/${encodeURIComponent(search)}`);
      setSearch("");
    }
  }


  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <img src={logo} alt='' />
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input className="inputtext" type='text' value={search} onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => handlePressEnter(event)}
              placeholder='Search and hit enter...' />
            <span>All Category</span>
          </div>

          <div className='icon f_flex width'>
            {user && user.username &&
              <p className="user-name" >{user.username} <a href={user.id}></a></p>
            }
            {user && user.auth === true ?
              <i class="fa icon-circle fa-right-from-bracket" onClick={() => handleLoguot()}></i> :
              <Link to="/login">
                <i className='fa fa-user icon-circle'>

                </i>
              </Link>
            }
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Search
