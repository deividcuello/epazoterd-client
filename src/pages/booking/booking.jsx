import React from 'react'
import { useState, useEffect } from 'react'
import { checkLogin, getBooking, deleteBooking } from '../../api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { convertTZ, taskDate, formatDate } from '../../utils/datesFunctions';

function Booking() {

    return (
        <section>holaa</section>
    )
}

export default Booking