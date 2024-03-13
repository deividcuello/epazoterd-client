import React from 'react'
import { useState, useEffect } from 'react'
import { sendEmail } from '../../api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')


    function onSubmitContact(e){
        e.preventDefault()
        if(name && email && message){
            sendEmail({subject: `${name} te ha enviado un mensaje`, text: `${name} (${email}) te ha enviado este mensaje:  ${message}`, recipientList:'Info.epazote@gmail.com'})
            toast.success(`Mensaje enviado`, {
                position: "top-center"
              })
              setName('')
              setEmail('')
              setMessage('')

        } else{
            toast.error(`Llena todo el formulario`, {
                position: "top-center"
              })
        }
    }

  return (
    <section className='container mx-auto min-h-[calc(100vh-141.97px-38.73px)]'>
        <div className='container mx-auto max-w-[50rem] mt-5'>
                <h2>Ponte en contacto con nosotros con un<span className='from-[#01AA55] via-white to-[#F62E2C] bg-gradient-to-r bg-clip-text text-transparent font-dancing-script text-3xl'> EpaMensaje</span> 😋</h2>
                <form onSubmit={(e) => onSubmitContact(e)} className='[&>*]:w-full w-full [&>*]:mt-2'>
                    <div>
                        <input type="text" placeholder='Nombre' onChange={(e) => setName(e.target.value)} value={name} className='w-full p-2 rounded-xl bg-customBlack'/>
                    </div>
                    <div>
                        <input type="text" placeholder='Correo' onChange={(e) => setEmail(e.target.value)} value={email} className='w-full p-2 rounded-xl bg-customBlack'/>
                    </div>
                    <div>
                        <textarea placeholder='Mensaje' onChange={(e) => setMessage(e.target.value)} value={message}  className='w-full min-h-32 p-2 rounded-xl bg-customBlack resize-none'></textarea>
                    </div>
                    <input type='submit' value='Enviar' className='bg-yellow w-full text-customBlack p-2 font-bold rounded-xl cursor-pointer'/>
                </form>
            </div>
            <ToastContainer />
    </section>
  )
}

export default Contact