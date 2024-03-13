import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Cookies from 'js-cookie'
import { getUsers, getBooking, deleteBooking } from './api.js'
import {convertTZ, taskDate, formatDate} from './utils/datesFunctions';

async function checkAdmin() {
  try {
    const res = await getUsers()
    if (res.data.count == 0) {
      let formData = new FormData();
      formData.append("email", 'Info.epazote@gmail.com');
      formData.append("username", 'epazote');
      formData.append("password", 'adminadmin');
      formData.append("isDelete", false);
      formData.append("adminAccount", true);
      formData.append("status", 'INTERNAL');
      let newUser = fetch('https://deividcuello.pythonanywhere.com/api/auth/register', {
        credentials: "include",
        headers: { "X-CSRFToken": Cookies.get("csrftoken") },
        method: "POST",
        body: formData,
      })
    }
  } catch (error) {
    console.log('error')
  }
}

checkAdmin()

async function checkBookingsDates() {
  const res = await getBooking()
  const dateValue = convertTZ()
  const dateParse = Date.parse(dateValue)
  const dateTask = (taskDate(dateParse))
  const formattedDate = formatDate(dateTask)
  const todayDate = formattedDate
  const d = new Date();
  const hour = d.getHours();
  res.data.booking.forEach(element => {
    if (element.date > todayDate) {
      // deleteBooking(element.id)
    }
  });
}

setInterval(() => {
  checkBookingsDates()
}, 1000)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
