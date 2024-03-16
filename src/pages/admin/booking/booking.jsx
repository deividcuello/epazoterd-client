import React from 'react'
import { useState, useEffect } from 'react'
import { convertTZ, taskDate, formatDate } from '../../../utils/datesFunctions';
import { getBooking, checkLogin, getUser, deleteBooking } from '../../../api';

function BookingAdmin() {
    const [userInfo, setUserInfo] = useState({})
    const [bookings, setBookings] = useState([])
    const [hourRange, setHourRange] = useState(new Date().getHours())
    const [todayDate, setTodayDate] = useState('')

    const arrayRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );

    useEffect(() => {
        async function getUserInfo() {
            try {
                const res = await checkLogin()
                setUserInfo(res.data.user)
                setHourRange(arrayRange(new Date().getHours(), 23, 1))

                const dateValue = convertTZ()
                const dateParse = Date.parse(dateValue)
                const dateTask = (taskDate(dateParse))
                const formattedDate = formatDate(dateTask)
                setTodayDate(formattedDate)

                const res1 = await getBooking()
                const data = res1.data.booking
                setBookings(data)
            } catch (error) {
                console.log('')
            }
        }

        getUserInfo()
    }, [])


    async function deleteBookingFunc(id) {
        await deleteBooking(id)
        window.location.reload(false)
    }

    return (
        <section className='container mx-auto'>
            <div className='overflow-x-auto'>
                <table className='mt-5 w-full'>
                    <tr>
                        <th>Usuario</th>
                        <th>Fecha</th>
                        <th>Teléfono</th>
                        <th>Hora de llegada</th>
                        <th>Hora de salida</th>
                        <th>Código de la reservación</th>
                        <th>Información adicional</th>
                        <th>Acciones</th>
                    </tr>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                        <td className='min-w-[3rem] overflow-x-auto text-nowrap'>{booking.user.username} (ID: {booking.user.id})</td>
                            <td className='min-w-[8rem] overflow-x-auto text-nowrap'>{booking.date}</td>
                            <td className='min-w-[10rem] overflow-x-auto text-nowrap'>{booking.phone}</td>
                            <td className='min-w-[5rem] overflow-x-auto text-nowrap'>
                                <span className='p-[0.5rem]'>
                                    {Number(booking.time) <= 12 ? booking.time : booking.time - 12}:00 {Number(booking.time) <= 12 ? 'A.M' : 'P.M'}
                                </span>
                            </td>

                            <td className='min-w-[5rem] overflow-x-auto'>
                                <span className='p-[0.5rem] text-nowrap'>
                                    {Number(booking.time2) <= 12 ? booking.time2 : booking.time2 - 12}:00 {Number(booking.time2) <= 12 ? 'A.M' : 'P.M'}
                                </span>
                            </td>
                            <td className='min-w-[10rem] overflow-x-auto'>
                                <span className='p-[0.5rem] text-nowrap'>
                                    {booking.booking_code}
                                </span>
                            </td>
                            <td className='min-w-[10rem] max-w-[15rem] overflow-x-auto'>
                                <span className='p-[0.5rem] text-nowrap'>
                                    {booking.additional_info ? booking.additional_info : 'N/A'}
                                </span>
                            </td>
                            <td>
                                <div className='flex gap-3 items-center justify-between'>
                                    <button onClick={() => deleteBookingFunc(booking.id)} className='bg-red-500 p-1 rounded-xl text-blackBodyBg font-semibold'>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </section>
    )
}

export default BookingAdmin