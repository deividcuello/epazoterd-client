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
                console.clear()
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
        toast.success("Reservación realizada", {
            position: "top-center",
        })
    }

    async function submitBooking(e) {
        e.preventDefault()
        if(!additionalInfo){
            return toast.error("Describa para que desea el local", { position: "top-center" })
        }

        if (time == '' || time2 == '') {
            return toast.error("Selecciona horas correctas", { position: "top-center" })
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
            try {
                if(userInfo.id == null){
                    return toast.error("Hubo un error", {
                        position: "top-center",
                    })
                }
            } catch (error) {
                return toast.error("Hubo un error", {
                    position: "top-center",
                })
            }
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

            fetch("https://epazote.pythonanywhere.com/api/booking/", {
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
                return toast.error("No puedes reservar más de una vez en el mismo horario", { position: "top-center" })
            }
            toast.error("No puedes reservar más de 10 veces", { position: "top-center" })
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
        <section className='container mx-auto mt-5'>
            {userInfo.username ?
                <div>
                    <div className='flex flex-col md:flex-row items-start justify-start gap-5'>
                        <div className='bg-customBlack p-5 rounded-xl max-w-[30rem]'>
                            <h2>Reservar local:</h2>
                            <form onSubmit={(e) => submitBooking(e)} className='mt-4 flex flex-col gap-5 items-start justify-start [&>*]:w-full'>
                                <div>
                                    <label htmlFor="">Número de teléfono</label>
                                    <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={(e) => setPhone(e.target.value)} value={phone} className='bg-blackBodyBg p-1 rounded-xl w-full mt-2' required />
                                    <span className='text-xs text-secondaryColor'>Formato solo números: XXX-XXX-XXXX</span>
                                </div>
                                <div>
                                    <label htmlFor="">Fecha</label>
                                    <input type='date' onChange={(e) => setDate(e.target.value)} value={date} min={todayDate} className='bg-blackBodyBg p-1 rounded-xl w-full mt-2' required />
                                </div>
                                <div>
                                    <label htmlFor="">Hora de llegada</label>
                                    <select onChange={(e) => setTime(e.target.value)} value={time} step="3600" className='bg-blackBodyBg p-1 rounded-xl w-full mt-2 focus:outline-none' required>
                                        <option value='' selected></option>
                                        {arrayRange(todayDate == date ? new Date().getHours() + 1 : 0, 23, 1).map((element, index) => (
                                            <option key={index} value={`${element}`}>{todayDate == date ? ((element <= 12 ? element : element - 12)) : (element <= 12 ? element : element - 12)}:00 {element <= 12 ? 'A.M' : 'P.M'}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">Hora de salida</label>
                                    <select onChange={(e) => setTime2(e.target.value)} value={time2} step="3600" className='bg-blackBodyBg p-1 rounded-xl w-full mt-2 focus:outline-none' required>
                                        <option value='' selected></option>
                                        {arrayRange(Number(time) + 1, 23, 1).map((element, index) => (
                                            <option key={index} value={`${element}`}>{todayDate == date ? ((element <= 12 ? element : element - 12)) : (element <= 12 ? element : element - 12)}:00 {element <= 12 ? 'A.M' : 'P.M'}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">Cantidad de personas</label>
                                    <input type='number' min="1" max="50" onChange={(e) => setPeopleNo(e.target.value)} value={peopleNo} className='bg-blackBodyBg p-1 rounded-xl w-full mt-2' required />
                                </div>
                                <div>
                                    <label htmlFor="">Información adicional</label>
                                    <textarea name="" onChange={(e) => setAdditionalInfoFunc(e)} value={additionalInfo} className='bg-blackBodyBg p-1 rounded-xl resize-none w-full h-[10rem]'></textarea>
                                    <span className='text-sm text-secondaryColor font-semibold'>{additionalInfo.length}/255</span>
                                </div>
                                <input type="submit" value='Reservar' className='bg-mainColor text-blackBodyBg p-2 rounded-xl font-semibold cursor-pointer' />
                                {bookingCode && <h3>Tu código es de reservación es: {bookingCode}</h3>}
                            </form>
                        </div>
                        <div>
                            <h3>Si tienes reservaciones, puedes visualizarlas deslizando hacia abajo ⬇️</h3>
                        </div>
                    </div>
                    <div className='bg-customBlack rounded-xl p-5 mt-5 overflow-x-auto'>
                        <h2>Tus reservaciones</h2>
                        {bookings.length > 0 ? <table className='mt-5 w-full'>
                            <tr>
                                <th>Fecha</th>
                                <th>Hora de llegada</th>
                                <th>Hora de salida</th>
                                <th>Código de la reservación</th>
                                <th>Información adicional</th>
                                <th>Acciones</th>
                            </tr>
                            {bookings.map((booking, index) => (
                                <tr key={index}>
                                    <td className='max-w-[6rem] overflow-x-auto text-nowrap'>{booking.date}</td>
                                    <td className='max-w-[5rem] overflow-x-auto text-nowrap'>
                                        <span className='p-[0.5rem]'>
                                            {Number(booking.time) <= 12 ? booking.time : booking.time - 12}:00 {Number(booking.time) <= 12 ? 'A.M' : 'P.M'}
                                        </span>
                                    </td>

                                    <td className='max-w-[5rem] overflow-x-auto'>
                                        <span className='p-[0.5rem] text-nowrap'>
                                            {Number(booking.time2) <= 12 ? booking.time2 : booking.time2 - 12}:00 {Number(booking.time2) <= 12 ? 'A.M' : 'P.M'}
                                        </span>
                                    </td>
                                    <td className='max-w-[10rem] overflow-x-auto'>
                                        <span className='p-[0.5rem] text-nowrap'>
                                            {booking.booking_code}
                                        </span>
                                    </td>
                                    <td className='max-w-[10rem] overflow-x-auto'>
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
                        </table> :
                            <h1 className='hidden md:block text-center mt-5'>No tienes reservaciones activas</h1>}
                    </div>
                </div>
                :
                <div className='bg-customBlack p-5 rounded-xl w-fit mx-auto flex items-center justify-center flex-col gap-2 min-h-screen'>
                    <h1>Inicia sesión para reservar:</h1>
                    <Link to='/login' className='mx-auto text-center'><button className='px-2 py-1 bg-mainColor font-semibold text-blackBodyBg rounded-xl'>Inicia sesión</button></Link>
                </div>
            }
            <ToastContainer />
        </section>
    )
}

export default Booking