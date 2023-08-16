import React, { useContext } from 'react'
import './login.css'
import { useState, useEffect } from 'react'
import { loginAip } from '../config/UserService'
import { useHistory } from "react-router-dom"
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"

const Login = () => {
    const navigate = useHistory()
    const { loginContext } = useContext(UserContext)
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        let token = localStorage.getItem("token");
        token = sessionStorage.getItem("token");
        if (token) {
            navigate.push("/");
        }
    })
    const handleLogin = async () => {
        if (!username || !password) {
            toast.error("Nhập tài khoản mật khẩu đầy đủ!");
            return;
        }
        let res = await loginAip(username.trim(), password);
        console.log("check res:", res)
        if (res && res.access_token) {
            // localStorage.setItem("token", res.access_token);
            loginContext(username, password, res.access_token)
            navigate.push("/");

            toast.success("Đăng nhập thành công")
        }
        else {
            if (res && res.status === 404 || res.status === 401) {
                toast.error('Tài khoản mật khẩu không đúng')
            }
        }
    }
    //sự kiện Enter khi đăng nhập
    const handlePressEnter = async (event) => {
        if (event && event.key === 'Enter') {
            await handleLogin();
        }
    }
    return (
        <div>
            <div className="wrapper login-container">
                <div action="" className="form-login">
                    <h1 class="form-heading">Login</h1>
                    <p></p>
                    <div className="title">
                    </div>
                    <div>
                        <input id='username' className='inputlogin' value={username} type="text" placeholder='UserName...'
                            onChange={(event) => setUsername(event.target.value)}
                        /><br />
                    </div>
                    <div className='input-2'>
                        <input className='inputlogin' id='password'
                            value={password}
                            type={isShowPassword === true ? "text" : "password"}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(event) => handlePressEnter(event)}
                            placeholder='Password...' />
                        <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                            onClick={() => setIsShowPassword(!isShowPassword)}>

                        </i>
                    </div>


                    <button className='loginn' onClick={() => handleLogin()}>Login</button>
                    {/* <input type="submit" value="Đăng nhập" class="form-submit" /> */}

                    <p>Ban chua co tai khoan <NavLink className='login-register' to="/register" >Đăng Ký</NavLink></p>
                </div>
            </div>
        </div>
    )
}

export default Login
