import React from 'react'
import { useState, useEffect } from 'react'
import { convertTZ, taskDate, formatDate } from '../../../utils/datesFunctions';
import { getBooking, checkLogin, getUser } from '../../../api';

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
    return (
        <section className='container mx-auto'>
        
        </section>
    )
}

export default BookingAdmin