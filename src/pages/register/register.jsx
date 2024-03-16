import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkLogin, sendEmail } from '../../api';


function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [activationCode, setActivationCode] = useState(Math.random())
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        async function isLogged(){
            const res = await checkLogin()
            if(res.data.user){
                window.location.href = '/'
            }
        }
        isLogged()
    }, [])

    function submitLogin(e) {
        e.preventDefault()
        let formData = new FormData();
        formData.append("email", emai.toLowerCase().trim());
        formData.append("password", password);
        fetch('https://deividcuello.pythonanywhere.com/api/auth/login', {
            credentials: "include",
            method: "POST",
            body: formData,
        }).then((res) => res.ok ? window.location.reload(false) : toast.error(`Hubo un error`, {
            position: "top-center"
          }))
        .catch(() => toast.error(`Hubo un error`, {
            position: "top-center"
          }))
    }

    function confirmSubmitUser(){
        let formData = new FormData();
        setActivationCode(Math.random())
        formData.append("email", email.toLowerCase().trim());
        formData.append("password", password);
        fetch('https://deividcuello.pythonanywhere.com/api/auth/login', {
            credentials: "include",
            method: "POST",
            body: formData,
        }).then((res) => res.ok ? window.location.href = '/' : toast.error(`Hubo un error`, {
            position: "top-center"
          }))
        .catch(() => toast.error(`Hubo un error`, {
            position: "top-center"
          }))
    }

    async function submitUser(e) {
        e.preventDefault()
        if (username && email && password.length >= 8 && password == confirmPassword && code == activationCode) {
            try {
                let formData = new FormData();
                formData.append("email", email.toLowerCase().trim());
                formData.append("username", username.toLowerCase().replace(" ", ""));
                formData.append("password", password);
                formData.append("isDelete", true);
                formData.append("adminAccount", false);
                formData.append("status", 'NONE');

                let newUser = fetch('https://deividcuello.pythonanywhere.com/api/auth/register', {
                    credentials: "include",
                    headers: { "X-CSRFToken": Cookies.get("csrftoken") },
                    method: "POST",
                    body: formData,
                }).then(res => res.ok ? confirmSubmitUser() : toast.error(`El usuario o correo ya existe`, {
                    position: "top-center"
                })
                )
            } catch (error) {
                toast.error(`Hubo un error`, {
                    position: "top-center"
                })
            }
        } else {
            if(code != activationCode){
                return toast.error(`El codigo no es valido`, {
                    position: "top-center"
                })
            }
            toast.error(`Hubo un error`, {
                position: "top-center"
            })
        }
    }

    async function sendCode() {
        const tempCode = Math.floor(1000 + Math.random() * 9000);
        setActivationCode(tempCode);
        const res = await sendEmail({
          subject: `Epazote - Codigo para verificar email de registro`,
          recipientList: email,
          text: `Hola, su codigo para verificar el registro de su Email es ${tempCode}`,
          code: Math.floor(1000 + Math.random() * 9000),
        });
        toast.success(`El codigo fue enviado`, {
            position: "top-center"
        })
      }

    return (
        <section className='container mx-auto min-h-[calc(100vh-141.97px-38.73px)] pb-5 mt-5'>
            <div className='flex flex-col items-center'>
                <h2 className='mb-4'>Registrate</h2>
                <div className='bg-customBlack  w-[25rem] rounded-2xl px-4'>
                    <form onSubmit={(e) => submitUser(e)} className='flex flex-col gap-2 w-full p-5 rounded-2xl'>
                        <img src="/logo.png" alt="" className=' w-36 mx-auto' />
                        <div>
                            <input type="text" onChange={(e) => setUsername(e.target.value)} name="" id="" placeholder='Usuario' className='w-full p-2 rounded-xl bg-blackBodyBg' />
                        </div>
                        <div>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} name="" id="" placeholder='Correo' className='w-full p-2 rounded-xl bg-blackBodyBg' />
                        </div>
                        <div>
                            <input type="text" name="" id="" placeholder='Codigo' maxlength="4" onChange={(e) => setCode(e.target.value)} value={code} className='w-full p-2 rounded-xl bg-blackBodyBg' />
                            <span onClick={sendCode} className='text-sm text-blue-500 break-words cursor-pointer'>Click para enviar codigo a: {email}</span>
                        </div>
                        <div>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} name="" id="" placeholder='Contraseña' className='w-full p-2 rounded-xl bg-blackBodyBg' />
                        </div>
                        <div>
                            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} name="" id="" placeholder='Confirmar ontraseña' className='w-full p-2 rounded-xl bg-blackBodyBg' />
                        </div>
                        <input type="submit" value='Crear' className='p-1 cursor-pointer bg-mainColor rounded-2xl font-semibold text-customBlack' />
                    </form>
                </div>
                <Link to='/login' className='text-sm py-1 px-2 text-blue-500 font-semibold rounded-xl'>Ir a Iniciar sesion</Link>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Register