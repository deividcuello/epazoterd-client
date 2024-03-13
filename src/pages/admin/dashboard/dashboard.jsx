import React from 'react'
import { getUsers, getBooking } from '../../../api'
import { useEffect, useState } from 'react'

function Dashboard() {
    const [usersCount, setUsersCount] = useState([])
    const [bookingsCount, setBookingsCount] = useState([])

    useEffect(() => {
        async function getUsersCount(){
            const res = await getUsers()
            setUsersCount(res.data.count)
        }
        
        async function getBookingsCount(){
            const res = await getBooking()
            setBookingsCount(res.data.count)
        }

        getBookingsCount()
        getUsersCount()
    }, [])
  return (
    <section className='container mx-auto mt-5'>
        <div className='flex flex-wrap gap-2'>
            <div className='bg-blackBodyBg w-[15rem] h-[8rem] p-5 flex flex-col justify-between rounded-2xl'>
                <span className='text-6xl'>{usersCount}</span>
                <span className='text-end'>Usuarios</span>
            </div>
            <div className='bg-blackBodyBg w-[15rem] h-[8rem] p-5 flex flex-col justify-between rounded-2xl'>
                <span className='text-6xl'>{bookingsCount}</span>
                <span className='text-end'>Reservaciones</span>
            </div>
        </div>
    </section>
  )
}

export default Dashboard