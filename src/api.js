import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;


export const checkLogin = async () => {
  try {   
    const res = await axios.get("https://epazote.pythonanywhere.com/api/auth/user", { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} }).then(response => {response.response.status != 401 ? response : console.clear()});
  } catch (error) {
    return axios.get("https://epazote.pythonanywhere.com/api/auth/user", { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} })
  }
  
};

export const getToken = async (user) => {
  try {
    return axios.post('https://epazote.pythonanywhere.com/api/auth/token/',user);
  } catch (error) {
  }
};

export const getUsers = (url_parameters = {}) => {
  if(url_parameters.email){
    return axios.get(`https://epazote.pythonanywhere.com/api/auth/users?email=${url_parameters.email}`)
}

  return axios.get("https://epazote.pythonanywhere.com/api/auth/users");
};

export const getUser = (id) => {
  try{
    return axios.get(`https://epazote.pythonanywhere.com/api/auth/users/${id}`);
  }
  catch(error){
    ''
  }
};

export const deleteUser = (id) => {
  return fetch(`https://epazote.pythonanywhere.com/api/auth/users/${id}/`, {
      credentials: 'include',
      headers: {"X-CSRFToken": Cookies.get("csrftoken"), "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`},
      method: "DELETE",
    }).then(res => window.location.reload(false))
}

export const sendEmail = (url_parameters) => {
  if(url_parameters.code){
      return axios.get(`https://epazote.pythonanywhere.com/api/email/send/?subject=${url_parameters.subject}&text=${url_parameters.text}&recipient_list=${url_parameters.recipientList}&code=${url_parameters.code}`)
  }
  return axios.get(`https://epazote.pythonanywhere.com/api/email/send/?subject=${url_parameters.subject}&text=${url_parameters.text}&recipient_list=${url_parameters.recipientList}`)
}

export const getBooking = () => {
  return axios.get("https://epazote.pythonanywhere.com/api/booking/", { headers: {"Authorization" : `Bearer ${localStorage.getItem("accessToken")}`} });
};

export const deleteBooking = (id) => {
  return fetch(`https://epazote.pythonanywhere.com/api/booking/${id}/`, {
      credentials: 'include',
      headers: {"X-CSRFToken": Cookies.get("csrftoken"), "Authorization" : `Bearer ${localStorage.getItem("accessToken")}`},
      method: "DELETE",
    })
}

export const getPartners = () => {
  return axios.get("https://epazote.pythonanywhere.com/api/partner/");
};

export const deletePartner = (id) => {
  return fetch(`https://epazote.pythonanywhere.com/api/partner/${id}/`, {
      credentials: 'include',
      headers: {"X-CSRFToken": Cookies.get("csrftoken")},
      method: "DELETE",
    }).then(res => window.location.reload(false))
}
