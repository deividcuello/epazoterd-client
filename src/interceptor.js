import axios from "axios";
let refresh = false;

export default axios.interceptors.response.use(resp => resp, async error => {
    if(error.response.status === 401 && !refresh){
        refresh = true;
        const response = await axios.post('https://epazote.pythonanywhere.com/api/auth/token/refresh/', {refresh:localStorage.getItem('refreshToken')}, {headers: {'Content-Type': 'application/json'}}, {withCredentials: true})
        
        if(response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
            
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            console.clear()
            return axios(error.config);
        }

    }
    console.clear()
    refresh = false;
    return error
})