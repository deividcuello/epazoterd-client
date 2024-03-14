import React from 'react'
import { useState, useEffect } from 'react'
import { getUsers, deleteUser, getUser, sendEmail } from '../../../api'
import { FaChevronCircleLeft } from "react-icons/fa";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Users() {
  const [users, setUsers] = useState([])
  const [isUserModal, setIsUserModal] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [action, setAction] = useState({ create: true, edit: false })
  const [code, setCode] = useState('')
  const [ActivationCode, setActivationCode] = useState(Math.random())

  useEffect(() => {
    async function getUsersList() {
      const res = await getUsers()
      const usersData = res.data.users
      setUsers(usersData)
    }

    getUsersList()
  }, [])

  function confirmUser(){
    toast.success(`Usuario creado`, {
      position: "top-center"
    })
    setActivationCode(Math.random())
    
  }
  
  function confirmUserEdit(){
    toast.success(`Usuario actualizado`, {
      position: "top-center"
    })
    setActivationCode(Math.random())
    
  }

  async function submitUser(e) {
    e.preventDefault()
    if ((username && email && password.length >= 8 && password == confirmPassword && code == ActivationCode) || (username && email && (password.length >= 8 || password.length == 0) && password == confirmPassword && action.edit)) {
      try {
        let formData = new FormData();
        formData.append("email", email.toLowerCase());
        formData.append("username", username);
        formData.append("password", password);
        if (action.create) {
          formData.append("isDelete", true);
          formData.append("adminAccount", true);
          formData.append("status", 'INTERNAL');
          let newUser = fetch('https://deividcuello.pythonanywhere.com/api/auth/register', {
            credentials: "include",
            headers: { "X-CSRFToken": Cookies.get("csrftoken") },
            method: "POST",
            body: formData,
          }).then(response =>
            response.ok ? confirmUser() : toast.error(`Hubo un error`, {
              position: "top-center"
            })
          )
        } else if (action.edit) {
          formData.append("isDelete", action.isDelete);
          formData.append("adminAccount", action.adminAccount);
          formData.append("status", action.status);
          if(action.tempEmail != email){
            if(code != ActivationCode){
              return toast.error(`El codigo es incorrecto`, {
                position: "top-center"
              })
            }
          }
          let editUser = fetch(
            `https://deividcuello.pythonanywhere.com/api/auth/users/${action.id}/`,
            {
              credentials: "include",
              headers: { "X-CSRFToken": Cookies.get("csrftoken") },
              method: "PUT",
              body: formData,
            }
          ).then((response) =>
            (email && username && response.ok)
              ? confirmUserEdit()
              : toast.error(`Hubo un error`, {
                position: "top-center"
              })
          ).catch((error) =>
              toast.error(`Hubo un error`, {
                position: "top-center"
              })
            );
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      if(ActivationCode != code){
        return toast.error(`Codigo erroneo`, {
          position: "top-center"
        })
      }
      toast.error(`Hubo un error`, {
        position: "top-center"
      })
    }
  }

  async function editUser(id) {
    const res = await getUser(id)
    const data = res.data
    setIsUserModal(true)
    setUsername(data.username)
    setEmail(data.email)
    setAction({ create: false, edit: true, id: id, status: data.status, isDelete: data.isDelete, adminAccount: data.adminAccount, tempEmail: data.email })
  }

  function setIsUserModalFunc() {
    if (!action.create) {
      setAction({ create: true, edit: false })
      setUsername('')
      setEmail('')
    }
    setIsUserModal(!isUserModal)
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

  async function deleteUserFunc(id){
    const res = await getUser(id)
    if(!res.data.isDelete){
      return toast.success(`Esta cuenta no puede ser eliminada`, {
        position: "top-center"
    })
    }
    deleteUser(id)
  }

  return (
    <section className=''>
      <div className='container mx-auto'>
        <div>
          <button onClick={() => setIsUserModal(true)} className='bg-blue-500 px-2 py-1 font-semibold text-blackBodyBg rounded-xl mt-1'>Crear interno</button>
        </div>
        <h2 className='mt-5'>Usuarios</h2>
        <div>
          <table className='mt-5'>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td className='max-w-[14rem] overflow-x-auto'>
                  <span className='p-[0.5rem]'>
                    {user.username}
                  </span>
                </td>

                <td className='max-w-[20rem] overflow-x-auto'>
                  <span className='p-[0.5rem]'>
                    {user.email}
                  </span>
                </td>

                <td className='max-w-[10rem] overflow-x-auto'>
                  <span className='p-[0.5rem]'>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className='flex gap-3 items-center justify-between'>
                    <button onClick={() => editUser(user.id)} className='bg-green-500 p-1 rounded-xl text-blackBodyBg font-semibold'>Editar</button>
                    <button onClick={() => deleteUserFunc(user.id)} className='bg-red-500 p-1 rounded-xl text-blackBodyBg font-semibold'>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      {isUserModal && <div className='bg-customBlack absolute top-0 bottom-0 right-0 left-0'>
        <button onClick={() => setIsUserModalFunc()} className='container mx-auto mt-5'>
          <FaChevronCircleLeft size={'2rem'} />
        </button>
        <form onSubmit={(e) => submitUser(e)} className='flex flex-col gap-2 max-w-[30rem] p-5 rounded-2xl'>
          <h2>Crear usuario <span className='text-xs bg-secondaryColor px-2 py-[0.1rem] text-customBlack rounded-xl'>Interno</span></h2>
          <div>
            <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} name="" id="" placeholder='Usuario' className='w-full p-2 rounded-xl bg-blackBodyBg' />
          </div>
          <div>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name="" id="" placeholder='Correo' className='w-full p-2 rounded-xl bg-blackBodyBg' />
          </div>
          <div>
            <input type="text" name="" id="" placeholder='Codigo' maxlength="4" onChange={(e) => setCode(e.target.value)} value={code} className='w-full p-2 rounded-xl bg-blackBodyBg' />
            <span onClick={sendCode} className='text-sm text-blue-500 break-words cursor-pointer'>Click para enviar codigo a: {email}</span>
          </div>
          <div>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="" id="" placeholder='Contraseña' className='w-full p-2 rounded-xl bg-blackBodyBg' />
          </div>
          <div>
            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} name="" id="" placeholder='Confirmar ontraseña' className='w-full p-2 rounded-xl bg-blackBodyBg' />
          </div>
          <input type="submit" value='Crear' className='p-1 cursor-pointer bg-mainColor rounded-2xl font-semibold text-customBlack' />
          <span className='text-secondaryColor text-xs mt-3'>Nota: Los usuarios creados seran usuarios internos, por lo que tendran acceso de administrador, para crear un usuario no interno, debe de realizarlo desde la pagina de registro fuera de /admin</span>
        </form>
      </div>}
      <ToastContainer />
    </section>
  )
}

export default Users