import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;


export const checkLogin = () => {
  return axios.get("https://deividcuello.pythonanywhere.com/api/auth/user", { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} });
};

export const getToken = (user) => {
  return axios.post('https://deividcuello.pythonanywhere.com/api/auth/token/',user);
};

export const getUsers = () => {
  return axios.get("https://deividcuello.pythonanywhere.com/api/auth/users");
};

export const getUser = (id) => {
  try{
    return axios.get(`https://deividcuello.pythonanywhere.com/api/auth/users/${id}`);
  }
  catch(error){
    ''
  }
};

export const deleteUser = (id) => {
  return fetch(`https://deividcuello.pythonanywhere.com/api/auth/users/${id}/`, {
      credentials: 'include',
      headers: {"X-CSRFToken": Cookies.get("csrftoken"), "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`},
      method: "DELETE",
    }).then(res => window.location.reload(false))
}

export const sendEmail = (url_parameters) => {
  if(url_parameters.code){
      return axios.get(`https://deividcuello.pythonanywhere.com/api/email/send/?subject=${url_parameters.subject}&text=${url_parameters.text}&recipient_list=${url_parameters.recipientList}&code=${url_parameters.code}`)
  }
  return axios.get(`https://deividcuello.pythonanywhere.com/api/email/send/?subject=${url_parameters.subject}&text=${url_parameters.text}&recipient_list=${url_parameters.recipientList}`)
}

export const getBooking = () => {
  return axios.get("https://deividcuello.pythonanywhere.com/api/booking/", { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} });
};

export const deleteBooking = (id) => {
  return fetch(`https://deividcuello.pythonanywhere.com/api/booking/${id}/`, {
      credentials: 'include',
      headers: {"X-CSRFToken": Cookies.get("csrftoken"), "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`},
      method: "DELETE",
    })
}

export const getPartners = () => {
  return axios.get("https://deividcuello.pythonanywhere.com/api/partner/");
};

export const deletePartner = (id) => {
  return fetch(`https://deividcuello.pythonanywhere.com/api/partner/${id}/`, {
      credentials: 'include',
      headers: {"X-CSRFToken": Cookies.get("csrftoken")},
      method: "DELETE",
    }).then(res => window.location.reload(false))
}
