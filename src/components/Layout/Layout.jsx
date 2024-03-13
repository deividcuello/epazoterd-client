import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Asidebar from '../admin/Asidebar';
import { useLocation } from 'react-router-dom';
import { checkLogin } from '../../api';
import { useState, useEffect } from 'react';

const Layout = ({ children }) => {
  const location = useLocation()
  const justAdmins = ['/login', '/admin']
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await checkLogin()
        const userData = res.data.user
        setUserInfo(userData)
      } catch (error) {
        console.log(error)
      }
    }

    getUserInfo()
  }, [])

  return (
    <>
      {((!location.pathname.toLowerCase().startsWith('/admin')) || (userInfo.adminAccount == false || userInfo.adminAccount == undefined)) &&
        <div>
          {((location.pathname != '/login/' && location.pathname != '/login' && location.pathname != '/registrar' && location.pathname != '/recover-account')) && <Header />}
          {children}
          {((location.pathname != '/login/' && location.pathname != '/login' && location.pathname != '/registrar' && location.pathname != '/recover-account')) && <Footer />}
        </div>
      }
      

      {(location.pathname.toLowerCase().startsWith('/admin') && userInfo.adminAccount) &&
        <div className='flex items-start justify-start'>
          {location.pathname != '/login' && <Asidebar />}
          <main className='relative flex-grow ml-4 bg-customBlack mt-5 mr-5 h-[calc(100vh-2.5rem)] overflow-y-auto rounded-xl'>
            {userInfo.username && <div className='w-full bg-mainColor px-3 text-end text-blackBodyBg font-semibold py-1'>
              Hola, <span className='py-[0.10rem] px-2 bg-blackBodyBg rounded-xl text-white'>
                
                {userInfo.username}
                </span>
            </div>}
            <div className='px-5 py-1'>
              {children}
            </div>
          </main>
        </div>}
    </>
  )
}

export default Layout;