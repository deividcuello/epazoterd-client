import React from 'react'
import { useState, useEffect } from 'react'
import { checkLogin, sendEmail } from '../../api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

function Profile() {

    const [userInfo, setUserInfo] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [activationCode, setActivationCode] = useState(Math.random())
    const [code, setCode] = useState('')

    useEffect(() => {
        async function userData() {
            try {
                const res = await checkLogin()
                setUserInfo(res.data.user)
                setUsername(res.data.user.username)
                setEmail(res.data.user.email)
            } catch (error) {
                console.log(error)
            }
        }
        userData()
    }, [])

    async function updateUser(e) {
        e.preventDefault();
    
        let formData = new FormData();
        formData.append("username", username.toLowerCase().replace(" ", ""));
        formData.append("update_username", true);
        if (username) {
          let editUser = fetch(
            `https://deividcuello.pythonanywhere.com/api/auth/users/${userInfo.id}/`,
            {
              credentials: "include",
              headers: { "X-CSRFToken": Cookies.get("csrftoken") },
              method: "PUT",
              body: formData,
            }
          )
            .then((response) =>
              username && response.ok
                ? toast.success("Su usuario fue actualizado exitosamente", {
                    position: "top-center",
                  })
                : toast.error("El usuario ya existe", {
                    position: "top-center",
                  })
            )
            .catch((error) =>
              toast.error("Hubo un error", { position: "top-center"})
            );
        } else {
          toast.error("Hubo un error", { position: "top-center" });
        }
      }

      function updateEmailConfirm(){
        toast.success("Su email fue actualizado exitosamente", {
          position: "top-center",
        })
        setActivationCode(Math.random())
      }

    async function updateEmail(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("email", email.toLowerCase().trim());
        formData.append("update_email", true);
        if (email && code == activationCode) {
          let editUser = fetch(
            `https://deividcuello.pythonanywhere.com/api/auth/users/${userInfo.id}/`,
            {
              credentials: "include",
              headers: { "X-CSRFToken": Cookies.get("csrftoken") },
              method: "PUT",
              body: formData,
            }
          )
            .then((response) =>
              email && response.ok
                ? updateEmailConfirm()
                : toast.error("El email ya existe", {
                    position: "top-center",
                  })
            )
            .catch((error) =>
              toast.error("Hubo un error", { position: "top-center" })
            );
        } else {
          if(activationCode != code){
            return toast.error("El código no es correcto", { position: "top-center" });
          }
          toast.error("Hubo un error", { position: "top-center" });
        }
      }

    async function updatePassword(e) {
        e.preventDefault();
    
        let formData = new FormData();
        formData.append("password", password);
        formData.append("update_password", true);
        if (password.length >= 8 && password == confirmPassword) {
          let editUser = fetch(
            `https://deividcuello.pythonanywhere.com/api/auth/users/${userInfo.id}/`,
            {
              credentials: "include",
              headers: { "X-CSRFToken": Cookies.get("csrftoken") },
              method: "PUT",
              body: formData,
            }
          )
            .then((response) =>
              password
                ? toast.success("Su contraseña fue actualizada exitosamente", {
                    position: "top-center",
                  })
                : toast.error("Hubo un error", {
                    position: "top-center",
                  }),
            )
            .catch((error) =>
              toast.error("Hubo un error", { position: "top-center" }),
            );
        } else if (password.length < 8) {
          toast.error("Longitud mínima de contraseña es 8", {
            position: "top-center",
          });
        } else {
          toast.error("Hubo un error", { position: "top-center" });
        }
      }

      async function sendCode() {
        const tempCode = Math.floor(1000 + Math.random() * 9000);
        setActivationCode(tempCode);
        const res = await sendEmail({
          subject: `Epazote - Código para verificar email de registro`,
          recipientList: email,
          text: `Hola, su código para verificar el registro de su email en Epazote es ${tempCode}`,
          code: Math.floor(1000 + Math.random() * 9000),
        });
        toast.success(`El código fue enviado`, {
            position: "top-center"
        })
      }

    return (
        <section className='container mx-auto'>
            <div className='max-w-[22rem]'>
                <h2>Edita tu perfil:</h2>
                <div className='mt-5 flex flex-col gap-6'>
                    <form onSubmit={(e) => updateUser(e)} className='[&>*]:flex [&>*]justify-start bg-customBlack w-fit p-5 rounded-2xl'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm'>Usuario</label>
                            <div className='flex gap-2 items-end justify-start'>
                                <input type="text" name="" id="" onChange={(e) => setUsername(e.target.value)} value={username} className='bg-blackBodyBg p-2 rounded-xl' />
                                <input type="submit" name="" id="" value='Guardar' className='bg-mainColor px-2 py-1 rounded-2xl text-blackBodyBg font-semibold cursor-pointer' />
                            </div>
                        </div>
                    </form>
                    <form onSubmit={(e) => updateEmail(e)} className='[&>*]:flex max-w-[22rem] [&>*]justify-start bg-customBlack w-fit p-5 rounded-2xl'>
                        <div>
                          <div className='flex flex-col gap-1 w-full'>
                            <label className='text-sm'>Email</label>
                            <div className='flex gap-2 items-end justify-start'>
                                <div className='gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <input type="email" name="" id="" onChange={(e) => setEmail(e.target.value)} value={email} className='bg-blackBodyBg p-2 rounded-xl' />
                                    </div>
                                    <label className='text-sm mt-4 inline-block'>Código</label>
                                    <div className='flex flex-col gap-2'>
                                        <input type="text" name="" id="" maxlength="4" onChange={(e)=>setCode(e.target.value)} className='bg-blackBodyBg p-2 rounded-xl' />
                                    </div>
                                </div>
                                <input type="submit" name="" id="" value='Guardar' className='bg-mainColor px-2 py-1 rounded-2xl text-blackBodyBg font-semibold cursor-pointer' />
                            </div>
                                <span onClick={sendCode} className='text-sm text-blue-500 break-words cursor-pointer'>Click para enviar codigo a: {email}</span>
                          </div>
                        </div>
                    </form>
                    <form onSubmit={(e) => updatePassword(e)} className='[&>*]:flex [&>*]justify-start bg-customBlack w-fit p-5 rounded-2xl'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm'>Contraseña</label>
                            <div className='flex gap-2 items-end justify-start'>
                                <div className='gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="" id=""className='bg-blackBodyBg p-2 rounded-xl' />
                                    </div>
                                    <label className='text-sm mt-4 inline-block'>Confirmar contraseña</label>
                                    <div className='flex flex-col gap-2'>
                                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} name="" id=""className='bg-blackBodyBg p-2 rounded-xl' />
                                    </div>
                                </div>

                                <input type="submit" name="" id="" value='Guardar' className='bg-mainColor px-2 py-1 rounded-2xl text-blackBodyBg font-semibold cursor-pointer' />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Profile