import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { checkLogin } from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        async function userData(){
          try {
            const res = await checkLogin()
            window.location.href = '/'
          } catch (error) {
            console.log(error)
          }
        }
    
        userData()
      }, [])
    function submitLogin(e) {
        e.preventDefault()
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        fetch('https://deividcuello.pythonanywhere.com/api/auth/login', {
            credentials: "include",
            method: "POST",
            body: formData,
        }).then((res) => res.json())
        .then(jsondata => console.log(jsondata))
        .catch(() => toast.error(`Hubo un error`, {
            position: "top-center"
          }))


    }

    return (
        <section className='container mx-auto min-h-[calc(100vh-141.97px-38.73px)] mt-5'>
            <Link to='/' className='bg-blue-500 py-1 px-2 text-blackBodyBg font-semibold rounded-xl'>Ir a homepage</Link>
            <div className='container mx-auto max-w-[35rem] mt-16'>
                <h2 className='px-10 text-center mb-5'>Login</h2>
                <div>
                    <form onSubmit={(e) => submitLogin(e)} className='[&>*]:w-full w-full [&>*]:mt-2 p-10 rounded-xl bg-customBlack'>
                        <div className='flex justify-center items-center'>
                            <img src="/logo.png" alt="" className='w-60' />
                        </div>
                        <div>
                            <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='w-full p-2 rounded-xl bg-blackBodyBg' />
                        </div>
                        <div>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' className='w-full p-2 rounded-xl bg-blackBodyBg' />
                        </div>
                        <input type='submit' value='Iniciar sesion' className='bg-yellow w-full text-customBlack p-2 font-bold rounded-xl cursor-pointer' />
                    </form>
                    <Link to='/registrar' className='text-red-500 text-sm mt-3 text-end block'>Registarse aqui</Link>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Login