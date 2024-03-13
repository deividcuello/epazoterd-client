import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";
import Layout from "./components/Layout/Layout";
import Homepage from "./pages/homepage/homepage";
import About from "./pages/about/about";
import Menu from "./pages/menu/menu";
import Contact from "./pages/contact/contact";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Users from "./pages/admin/users/users";
import Asidebar from "./components/admin/Asidebar";
import Profile from "./pages/profile/profile";
import { checkLogin } from "./api";
import { useState, useEffect } from "react";
import NotFound from "./pages/not-found/not-found";
import Booking from "./pages/booking/booking";
import BookingAdmin from "./pages/admin/booking/booking";
import Dashboard from "./pages/admin/dashboard/dashboard";

function App() {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await checkLogin()
        setUserInfo(res.data.user)
      } catch (error) {
        console.log(error)
      }
    }

    getUserData()
  }, [])

  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/quienes-somos" element={<About />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
            <Route path="/contacto" element={<Contact />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/registrar" element={<Register />}></Route>
            <Route path="/perfil" element={<Profile />}></Route>
            <Route path="/reservar" element={<Booking />}></Route>
            {userInfo.adminAccount && <Route path="/admin/tablero" element={<Dashboard />}></Route>}
            {userInfo.adminAccount && <Route path="/admin/usuarios" element={<Users />}></Route>}
            {userInfo.adminAccount && <Route path="/admin/reservaciones" element={<BookingAdmin />}></Route>}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>

    </>
  );
}

export default App;
