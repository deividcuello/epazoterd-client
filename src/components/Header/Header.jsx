import React from "react";
import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { checkLogin } from "../../api";

function Header() {
  const [isMenu, setIsMenu] = useState(false)
  const [userDropDown, setUserDropDown] = useState(false)
  const [isMd, setIsMd] = useState(false)
  const [userInfo, setUserInfo] = useState('')

  useEffect(() => {
    async function userData() {
      try {
        const res = await checkLogin()
        setUserInfo(res.data.user)
      } catch (error) {
        console.log(error)
      }
    }

    userData()
  }, [])

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMd(true)
    } else {
      setIsMd(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  function submitLogout() {
    return fetch(`https://deividcuello.pythonanywhere.com/api/auth/logout`, {
      credentials: "include",
      method: "POST",
      body: "",
    }).then(res => window.location.reload(false));
  }

  return (
    <header className="sticky top-0 left-0 right-0 pt-5 z-50 bg-blackBodyBg">
      <div className="md:container mx-auto">
        <div className="flex justify-between items-center">
          <Link to='/'>
            <img src="/logo.png" alt="" className="w-32" />
          </Link>
          {!userInfo.username ? <Link to='login' className="hidden md:inline-block bg-blue-500 text-blackBodyBg px-2 py-1 font-semibold rounded-xl">Iniciar sesion</Link> :
            <div className="relative hidden md:inline-block">
              <button onClick={() => setUserDropDown(!userDropDown)} className="flex items-center justify-center gap-2">Hola, {userInfo.username} {!userDropDown ? <FaChevronDown /> : <FaChevronUp />}</button>
              <div className={`${!userDropDown ? 'hidden' : 'flex'} text-xs items-start flex-col gap-2 w-28 absolute bg-customBlack p-2 rounded-xl`}>
              <button>
                  <Link to='/admin/tablero'>Admin</Link>
                </button>
                <button>
                  <Link to='perfil'>Editar perfil</Link>
                </button>
                <button onClick={submitLogout}>Cerrar sesion</button>
              </div>
            </div>
          }
          {!isMenu ? <button onClick={() => setIsMenu(true)} className="inline-block md:hidden">
            <IoMdMenu size={'2rem'} />
          </button> : <button onClick={() => setIsMenu(false)} className="inline-block md:hidden">
            <IoMdClose size={'2rem'} />
          </button>

          }
        </div>
        {(isMenu || !isMd) && <nav className="md:mt-2 py-5 md:py-0">
          <ul className="flex flex-col md:flex-row md:items-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/quienes-somos"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Quienes somos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menu"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/clases-de-comida"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Clases de comida
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacto"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Contacto
              </NavLink>
            </li>
            <li>
              <div className="inline-block md:hidden">
               {userInfo.username ?  <button onClick={() => setUserDropDown(!userDropDown)} className="flex items-center justify-center gap-2">Hola, {userInfo.username} {!userDropDown ? <FaChevronDown /> : <FaChevronUp />}</button> : <Link to='login' className="inline-block md:hidden bg-blue-500 text-blackBodyBg px-2 py-1 font-semibold rounded-xl">Iniciar sesion</Link>}
                <div className={`${!userDropDown ? 'hidden' : 'flex'} text-sm items-start pl-3 mt-2 flex-col gap-4 w-28 p-2 rounded-xl`}>
                {userInfo.adminAccoun && <button>
                  <Link to='/admin/tablero'>Admin</Link>
                </button>}
                  <button>
                    <Link to='perfil'>Editar perfil</Link>
                  </button>
                  <button onClick={submitLogout}>Cerrar sesion</button>
                </div>
              </div>
            </li>
            <Link to='/reservar'>
              <button className="bg-secondaryColor text-blackBodyBg font-semibold py-1 px-2 rounded-2xl mt-3 md:mt-0 ml-5 w-fit">
                Reservacion
              </button>
            </Link>
          </ul>
        </nav>}
      </div>
    </header>
  );
}

export default Header;
