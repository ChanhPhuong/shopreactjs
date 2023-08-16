import React, { useState, useEffect } from 'react'
import './login.css'

import { loginAip, registerApi } from '../config/UserService'
import { useHistory } from "react-router-dom"
import { toast } from 'react-toastify';


const Register = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowPassword2, setIsShowPassword2] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [full_name, setFullName] = useState("");
    const [password_confirmation, setpassword_confirmation] = useState("");
    const navigate = useHistory()

    useEffect(() => {


    }, [])
    const isValidEmail = (email) => {
        // Regular expression to validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegsiter = async () => {
        // if (password === password2) {

        // }
        let res = await registerApi(username, email, phone, address, password, password_confirmation, full_name);
        console.log("check res:", res)
        if (res && res.id) {
            setFullName('')
            setUsername('')
            setEmail('')
            setPhone('')
            setAddress('')
            setPassword('')
            setpassword_confirmation('')
            navigate.push("/login");
            toast.success("Đăng ký thành công")
        } else {
            if (!isValidEmail(email) && res.status === 400) {
                toast.error("Sai Email");

            }
            if (res && res.status === 409) {
                toast.error("sai password")
            }
            else {
                toast.error("Vui long nhap day du thong tin")
            }
        }

    }
    return (
        <div>
            <div>
                <div className="wrapper register-container">
                    <div action="" className="form-login">
                        <h1 class="form-heading">Register</h1>
                        <p></p>
                        <div className="title">
                        </div>
                        <div>
                            <input id='username' className='inputlogin' value={username} type="text" placeholder='UserName...'
                                onChange={(event) => setUsername(event.target.value)}
                            /><br />
                        </div>
                        <div>
                            <input id='full_name' className='inputlogin' value={full_name} type="text" placeholder='Full Name...'
                                onChange={(event) => setFullName(event.target.value)}
                            /><br />
                        </div>
                        <div>
                            <input id='email' className='inputlogin' value={email} type="email" placeholder='Email...'
                                onChange={(event) => setEmail(event.target.value)}
                            /><br />
                        </div>
                        <div>
                            <input id='phone' className='inputaddress' value={phone} type="text" placeholder='Phone...'
                                onChange={(event) => setPhone(event.target.value)}
                            />
                            <input id='address' className='inputaddress' value={address} type="text" placeholder='Address...'
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </div>
                        <div className='input-2'>
                            <input className='inputlogin' id='password'
                                value={password}
                                type={isShowPassword === true ? "text" : "password"}
                                onChange={(event) => setPassword(event.target.value)}
                                // onKeyDown={(event) => handlePressEnter(event)}
                                placeholder='Password...' />
                            <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                                onClick={() => setIsShowPassword(!isShowPassword)}>

                            </i>
                        </div>
                        <div className='input-2'>
                            <input className='inputlogin' id='password'
                                value={password_confirmation}
                                type={isShowPassword2 === true ? "text" : "password"}
                                onChange={(event) => setpassword_confirmation(event.target.value)}
                                // onKeyDown={(event) => handlePressEnter(event)}
                                placeholder='Password...' />
                            <i className={isShowPassword2 === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                                onClick={() => setIsShowPassword2(!isShowPassword2)}>

                            </i>
                        </div>


                        <button className='loginn' onClick={() => handleRegsiter()}>Register</button>
                        {/* <input type="submit" value="Đăng nhập" class="form-submit" /> */}

                        {/* <p>Ban chua co tai khoan <a className='login-register' href="" >Đăng Ký</a></p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
