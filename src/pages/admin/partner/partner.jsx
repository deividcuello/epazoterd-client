import React from 'react'
import { useState, useEffect } from 'react'
import { getPartners, checkLogin, getUser, deletePartner } from '../../../api';

function PartnerAdmin() {
    const [userInfo, setUserInfo] = useState({})
    const [partners, setPartners] = useState([])

    useEffect(() => {
        async function getUserInfo() {
            try {
                const res = await checkLogin()
                setUserInfo(res.data.user)

                const res1 = await getPartners()
                const data = res1.data.partner
                setPartners(data)
            } catch (error) {
                console.clear()
            }
        }

        getUserInfo()
    }, [])

    function deletePartnerFunc(id){
        deletePartner(id)
    }
    
    return (
        <section className='container mx-auto'>
            {partners.length > 0 ? <div className='flex flex-col sm:flex-row flex-wrap sm:justify-center gap-3 mt-5'>
              {partners.map((item, index) => (
                  <div key={index} className='bg-blackBodyBg p-2 rounded-xl sm:w-[15rem] pb-10 md:w-[20rem] overflow-y-auto relative overflow-x-hidden'>
                    <div className='max-h-[20rem]'>
                      <h1 className='capitalize'>{item.name}</h1>
                      <p className='text-sm'>{item.user.email}</p>
                      <p className='mt-5'>Contacta llamando a: <span className='text-red-500'>{item.phone}</span></p>
                      <p className='mt-5 text-gray-400'>{item.message}</p>
                    </div>
                    <div className='absolute bottom-0 left-0 w-full'>
                      <button onClick={() => deletePartner(item.id)} className='bg-red-500 w-full py-1 font-semibold text-blackBodyBg'>
                        Eliminar socio
                      </button>
                    </div>
                  </div>
              ))}
            </div> : 
            <div><h2>No hay socios</h2></div>}
        </section>
    )
}

export default PartnerAdmin