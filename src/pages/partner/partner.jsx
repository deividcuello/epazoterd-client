import React from 'react'
import { useState, useEffect } from 'react'
import { checkLogin, deletePartner, getPartners } from '../../api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function Partner() {

    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [userInfo, setUserInfo] = useState({})
    const [isUserPartner, setIsUserPartner] = useState({})
    const [cv, setCv] = useState('')

    useEffect(() => {
        async function getUserInfo() {
            try {
                const res = await checkLogin()
                setUserInfo(res.data.user)

                const res1 = await getPartners()
                const filterPartners = res1.data.partner.filter((item) => item.user.id == res.data.user.id)
                setIsUserPartner(filterPartners)
                if(filterPartners.length > 0){
                    setPhone(filterPartners[0].phone)
                    setName(filterPartners[0].name)
                    setAdditionalInfo(filterPartners[0].message)
                    setCv(filterPartners[0].cv_file)

                }
            } catch (error) {
                console.log('')
            }
        }

        getUserInfo()
    }, [])


    function deletePartnerFunc(id){
        deletePartner(id)
    }

    function confirmSubmitPartner() {
        toast.success("Formulario enviado", {
            position: "top-center",
        })
    }

    function setAdditionalInfoFunc(e) {
        setAdditionalInfo(e.target.value)
        if (additionalInfo.length > 255) {
            setAdditionalInfo(additionalInfo.substring(0, 255))
        }
    }

    function titleCase(str) {
        const splitStr = str.toLowerCase().split(" ");
      
        for (let i = 0; i < splitStr.length; i++) {
          if (splitStr.length[i] < splitStr.length) {
            splitStr[i].charAt(0).toUpperCase();
          }
      
          str = splitStr.join(" ");
        }
      
        return str;
      }

    async function submitPartner(event) {
        event.preventDefault();

        const res = await getPartners()
        const filterPartners = res.data.partner.filter((item) => item.user.id == userInfo.id)
        if(filterPartners.length > 0){
            return toast.error(`Ya eres socio`, {
                position: "top-center"
              })
        }

        const cvInput = document.querySelector("#cvInput");
        let cv = cvInput.files[0];
        let formData = new FormData();
        formData.append("cv_file", cv);
        formData.append("name", name.trim());
        formData.append("phone", phone);
        formData.append("message", additionalInfo.trim());
        formData.append("user_pk", userInfo.id);
        fetch('https://deividcuello.pythonanywhere.com/api/partner/', {
          credentials: "include",
          headers: { "X-CSRFToken": Cookies.get("csrftoken") },
          method: "POST",
          body: formData,
        })
          .then((response) => name && phone && cv ? toast.success(`Formulario enviado`, {
            position: "top-center"
          }) : toast.error(`Hubo un error`, {
              position: "top-center"
            }))
          .catch((error) => toast.error(`Hubo un error`, {
              position: "top-center"
            }));

      };

      async function updateName(e) {
        e.preventDefault();
    
        let formData = new FormData();
        formData.append("name", name.trim());
        formData.append("update_name", true);
        if (name) {
          fetch(
            `https://deividcuello.pythonanywhere.com/api/partner/${isUserPartner[0].id}/`,
            {
              credentials: "include",
              headers: { "X-CSRFToken": Cookies.get("csrftoken") },
              method: "PUT",
              body: formData,
            }
          )
            .then((response) =>
              name
                ? toast.success("Su nombre fue actualizado exitosamente", {
                    position: "top-center",
                  })
                : toast.error("Hubo un error", {
                    position: "top-center",
                  }),
            )
            .catch((error) =>
              toast.error("Hubo un error", { position: "top-center" }),
            );
        } else{
            toast.error("Introduce un nombre", { position: "top-center" })
        }
      }
      
      async function updatePhone(e) {
        e.preventDefault();
    
        let formData = new FormData();
        formData.append("phone", phone);
        formData.append("update_phone", true);
        if (name) {
          fetch(
            `https://deividcuello.pythonanywhere.com/api/partner/${isUserPartner[0].id}/`,
            {
              credentials: "include",
              headers: { "X-CSRFToken": Cookies.get("csrftoken") },
              method: "PUT",
              body: formData,
            }
          )
            .then((response) =>
              name
                ? toast.success("Su número de teléfono fue actualizada exitosamente", {
                    position: "top-center",
                  })
                : toast.error("Hubo un error", {
                    position: "top-center",
                  }),
            )
            .catch((error) =>
              toast.error("Hubo un error", { position: "top-center" }),
            );
        } else{
            toast.error("Introduce un número de teléfono", { position: "top-center" })
        }
      }

    return (
        <section className='container mx-auto mt-5'>
            {userInfo.username ?
                isUserPartner.length == 0 ? 
                <div>
                    <div className='flex flex-col md:flex-row items-start justify-start gap-5'>
                        <div className='bg-customBlack p-5 rounded-xl max-w-[30rem]'>
                            <h2>Ser partner:</h2>
                            <form onSubmit={(e) => submitPartner(e)} className='mt-4 flex flex-col gap-5 items-start justify-start [&>*]:w-full'>
                                <div>
                                    <label htmlFor="">Nombre completo</label>
                                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} className='bg-blackBodyBg p-1 rounded-xl w-full mt-2' required />
                                </div>
                                <div>
                                    <label htmlFor="">Número de teléfono</label>
                                    <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={(e) => setPhone(e.target.value)} value={phone} className='bg-blackBodyBg p-1 rounded-xl w-full mt-2' required />
                                    <span className='text-xs text-secondaryColor'>Formato solo numeros: XXX-XXX-XXXX</span>
                                </div>
                                <div>
                                    <label htmlFor="">Curriculum (*pdf)</label>
                                    <input type="file" id='cvInput' accept="application/pdf" className='bg-blackBodyBg p-1 rounded-xl w-full mt-2' required />
                                </div>
                                <div>
                                    <label htmlFor="">Describe porque quieres ser nuestro socio</label>
                                    <textarea name="" id="" onChange={(e) => setAdditionalInfoFunc(e)} value={additionalInfo} placeholder='Describe aqui porque deseas ser nuestro socio detalladamente para que nosotros podamos tomarlo en cuenta' className='bg-blackBodyBg p-1 rounded-xl resize-none w-full h-[10rem]'></textarea>
                                    <span className='text-sm text-secondaryColor font-semibold'>{additionalInfo.length}/255</span>
                                </div>
                                <input type="submit" value='Reservar' className='bg-mainColor text-blackBodyBg p-2 rounded-xl font-semibold cursor-pointer' />
                                <span className='text-xs text-white bg-gray-800 p-2 rounded-xl'>Asegúrese que tiene acceso tanto al correo<span className='text-sm text-red-500 font-bold'>{userInfo.email}</span> y a su número telefónico <span className='text-sm text-red-500 font-bold'>{phone}</span> ya que serán utilizados para comunicarnos con usted</span>

                                <span className='text-xs text-white bg-gray-800 p-2 rounded-xl'>Para seguridad, al momento de hacerse socio, no podrá editar el curriculum ni el mensaje que describe porque deseas ser socio nuestro, para cambios, deberá dejar de ser socios y volver a inscribirse como socio nuevamente</span>
                            </form>
                        </div>
                    </div>
                </div> : 
                <div>
                    <span className='bg-blue-500 text-blackBodyBg py-1 px-2 rounded-xl font-semibold'>Eres socio</span>
                    <div className='mt-5'>
                        <div>
                            <form  onSubmit={(e) => updateName(e)} className='bg-customBlack p-6 rounded-xl flex items-start justify-start flex-col w-fit'>
                                <h4>Nombre</h4>
                                <div className='mt-2'>
                                    <div className='flex gap-2'>
                                        <input type="text" onChange={e => setName(e.target.value)} value={name} className='bg-blackBodyBg rounded-xl p-1'/>
                                        <input type="submit" value='Guardar' className='bg-mainColor py-1 px-2 rounded-xl text-blackBodyBg font-semibold cursor-pointer'/>
                                    </div>
                                </div>
                            </form>
                            <form onSubmit={(e) => updatePhone(e)} className='bg-customBlack p-6 rounded-xl flex items-start justify-start flex-col w-fit mt-5'>
                                <h4>Número de teléfono</h4>
                                <div className='mt-2'>
                                    <div className='flex gap-2'>
                                        <input type="tel" onChange={e => setPhone(e.target.value)} value={phone} className='bg-blackBodyBg rounded-xl p-1'/>
                                        <input type="submit" value='Guardar' className='bg-mainColor py-1 px-2 rounded-xl text-blackBodyBg font-semibold cursor-pointer'/>
                                    </div>
                                </div>
                            </form>
                            <div className='bg-red-950 p-6 rounded-xl flex items-start justify-start flex-col max-w-[33.9rem] mt-5'>
                                <h4>Curriculum</h4>
                                <a href={`https://www.pythonanywhere.com/user/deividcuello/files/home/deividcuello${cv}`} target='_blank' className='text-blue-400 underline break-words'>Ver curriculum</a>
                            </div>
                            <div className='bg-red-950 p-6 rounded-xl flex items-start justify-start flex-col max-w-[33.9rem] mt-5'>
                                <h4>Mensaje</h4>
                                <span>{additionalInfo}</span>
                            </div>
                        </div>
                        <button onClick={() => deletePartnerFunc(isUserPartner[0].id)} className='mt-5 bg-red-500 py-1 px-2 rounded-xl text-blackBodyBg font-semibold'>Dejar de ser socios</button>
                    </div>
                </div>
                :
                <div className='bg-customBlack p-5 rounded-xl w-fit mx-auto flex items-center min-h-screen justify-center flex-col gap-2'>
                    <h1>Inicia sesión para ser partner:</h1>
                    <Link to='/login' className='mx-auto text-center'><button className='px-2 py-1 bg-mainColor font-semibold text-blackBodyBg rounded-xl'>Iniciar sesión</button></Link>
                </div>
            }
            <ToastContainer />
        </section>
    )
}

export default Partner