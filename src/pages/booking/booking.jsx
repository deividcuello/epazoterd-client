import React from 'react'
import { useState, useEffect } from 'react'
import { checkLogin, getBooking, deleteBooking } from '../../api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { convertTZ, taskDate, formatDate } from '../../utils/datesFunctions';

function Booking() {

    const [time, setTime] = useState(`${new Date().getHours()}`)
    const [time2, setTime2] = useState(`${new Date().getHours() + 1}`)
    const [date, setDate] = useState('')
    const [phone, setPhone] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [userInfo, setUserInfo] = useState({})
    const [bookingCode, setBookingCode] = useState('')
    const [bookings, setBookings] = useState([])
    const [peopleNo, setPeopleNo] = useState(1)
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
                const filteredData = data.filter((item) => item.user.id == res.data.user.id)
                setBookings(filteredData)
            } catch (error) {
                console.log('')
            }
        }

        getUserInfo()
    }, [])

    function uniqueId() {
        const letters = "ABCDEFGHJKMNPQRSTUXYabcdefghjkmnpqrstuxy";

        let text = "";
        for (let i = 0; i < 12; i++) {
            text += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return `EPA-${text}`;
    }

    function confirmSubmitBooking() {
        toast.success("reservacion realizada", {
            position: "top-center",
        })
    }

    console.log('holaaa', userInfo)

    async function submitBooking(e) {
        e.preventDefault()
        if (time == '' || time2 == '') {
            return toast.error("Selecciona un tiempo", { position: "top-center" })
        }
        let isSubmit = false

        const res = await getBooking()

        const filterBookings = res.data.booking.filter((item) => item.date == date)
        const isUserBooking = filterBookings.filter((item) => item.user == userInfo.id)

        // filterBookings.forEach(element => {
        //     console.log(element.time, element.time2)
        //     if(
        //         (Number(time) < Number(element.time) && Number(time2) < Number(element.time)) &&
        //         (Number(time) > Number(element.time2) && Number(time2) > Number(element.time2))
        //     )
        //     {

        //     }
        // });
        if (filterBookings.length == 0) {
            isSubmit = true
        }
        for (const element of filterBookings) {
            if (
                (Number(time) <= (element.time) && Number(time2) <= (element.time)) ||
                (Number(time) >= (element.time2) && Number(time2) >= (element.time2))
            ) {
                isSubmit = true
            } else {
                return toast.error("El local esta ocupado en este horario", { position: "top-center" })

            }
        }

        if ((isUserBooking.length <= 10) && isSubmit) {
            const getCode = uniqueId()
            setBookingCode(getCode)
            let formData = new FormData();
            formData.append("phone", phone);
            formData.append("date", date);
            formData.append("time", time);
            formData.append("time2", time2);
            formData.append('people_no', peopleNo);
            formData.append('additional_info', additionalInfo);
            formData.append('booking_code', getCode);
            formData.append('user_pk', userInfo.id)

            fetch("https://deividcuello.pythonanywhere.com/api/booking/", {
                credentials: "include",
                headers: { "X-CSRFToken": Cookies.get("csrftoken") },
                method: "POST",
                body: formData,
            })
                .then((response) =>
                    phone, date, time
                    ? confirmSubmitBooking()
                    : toast.error("Hubo un error", {
                        position: "top-center",
                    })
                )
                .catch((error) =>
                    toast.error("Hubo un error", { position: "top-center" })
                );
        } else {
            if (isUserBooking.length > 0) {
                return toast.error("No puedes reservar mas de una vez en el mismo horario", { position: "top-center" })
            }
            toast.error("No puedes reservar mas de 10 veces", { position: "top-center" })
        }
    }

    function setAdditionalInfoFunc(e) {
        setAdditionalInfo(e.target.value)
        if (additionalInfo.length > 255) {
            setAdditionalInfo(additionalInfo.substring(0, 255))
        }
    }

    async function deleteBookingFunc(id) {
        await deleteBooking(id)
        window.location.reload(false)
    }

    return (
        <section>holaa</section>
    )
}

export default Booking