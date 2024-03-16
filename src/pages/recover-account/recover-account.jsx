import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { sendEmail, getUsers } from "../../api";
import Cookies from "js-cookie";
import { IoMdArrowDropleft } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

function RecoverAccount() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [activationCode, setActivationCode] = useState(999999);


  async function sendCode() {
    const res1 = await getUsers({ email: email.toLowerCase().trim()});
    try {
        const id = res1.data.users[0].id;
    } catch (error) {
        return toast.error(`Su cuenta no fue encontrada`, {
            position: "top-center"
          })
    }

    const tempCode = Math.floor(1000 + Math.random() * 9000);
    setActivationCode(tempCode);
    const res = await sendEmail({
      subject: `Recupera tu cuenta en Epazote: Sigue los pasos para restablecer tu contraseña `,
      recipientList: email,
      text: `Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Epazote. Para completar este proceso y recuperar el acceso, por favor utiliza el siguiente código de verificación: ${tempCode}. Una vez que hayas verificado tu identidad, podrás establecer una nueva contraseña y acceder nuevamente a tu cuenta en Epazote. Si no has solicitado este cambio, por favor ignora este mensaje o contáctanos de inmediato. ¡Gracias! El equipo de Epazote`,
      code: Math.floor(1000 + Math.random() * 9000),
    });
    return toast.success(`Codigo enviado`, {
        position: "top-center"
      })
  }

  async function restorePassword(e) {
    e.preventDefault();
    const res = await getUsers({ email: email.toLowerCase().trim()});
    let id
    try {
        id = res.data.users[0].id;
    } catch (error) {
        return toast.error(`Su cuenta no fue encontrada`, {
            position: "top-center"
          })
    }
    if (id) {
    let formData = new FormData();
      formData.append("password", password);
      formData.append("recover_password", true);
      if(password.length >= 8 && password == confirmPassword && codeInput == activationCode){
          let editUser = fetch(`https://deividcuello.pythonanywhere.com/api/auth/users/${id}/`, {
            credentials: "include",
            headers: { "X-CSRFToken": Cookies.get("csrftoken") },
            method: "PUT",
            body: formData,
          })
            .then((response) =>
              email && password && confirmPassword
                ? toast.success(`Tu cuenta fue recuperada exitosamente`, {
                    position: "top-center"
                  })
                : toast.error(`Hubo un error`, {
                    position: "top-center"
                  })
            )
            .catch((error) =>
            toast.error(`Hubo un error`, {
                position: "top-center"
              })
            );
      } else{
        if(password.length < 8){
            return toast.error(`Longitud mínima de contraseña debe ser de 8 caracteres`, {
                position: "top-center"
              })
        }
        else if(codeInput != activationCode){
            return toast.error(`Código de recuperación`, {
                position: "top-center"
              })
        }
        else if(password != confirmPassword){
            return toast.error(`Contraseñas no coinciden`, {
                position: "top-center"
              })
        }
        toast.error(`Su cuenta fue encontrada. Coloque los datos correctamente`, {
            position: "top-center"
          })
      }
    } else{
        toast.error(`Hubo un error`, {
            position: "top-center"
          })
    }
  }

  return (
    <div className="min-h-screen flex justify-center bg-cover bg-no-repeat w-full bg-center relative overflow-hidden">
      <div className="flex items-center justify-center">
        <div className="min-h-screen w-screen flex justify-center py-5 backdrop-brightness-[.3] overflow-y-auto">
          <div className="h-fit bg-customBlack bg-opacity-80 p-3 rounded-2xl">
            <div className="bg-normalBlue text-white pr-3 text-sm py-1 rounded-2xl mb-5 w-fit">
              <Link to="/login" className="flex justify-center w-fit">
                <IoMdArrowDropleft size={"1.5rem"} /> Login
              </Link>
            </div>
            <form
              action=""
              onSubmit={(event) => restorePassword(event)}
              className="h-full w-[30rem]"
            >
              <div className="text- center mx-auto">
                <img src="/logo.png" alt="" className="mx-auto w-96"/>
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="emailInput"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:outline-none rounded-2xl px-2 bg-blackBodyBg py-1"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="password">Código de verificación</label>
                <input
                  type="text"
                  id="codeInput"
                  value={codeInput}
                  required
                  onChange={(e) => setCodeInput(e.target.value)}
                  className="focus:outline-none rounded-2xl px-2 bg-blackBodyBg py-1"
                />
                <button
                  type="button"
                  className="text-blue-500 text-sm font-bold text-start break-words"
                  onClick={sendCode}
                >
                  Enviar código de verificación a:{" "}
                  <span>{email}</span>
                </button>
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="password">Nueva contraseña</label>
                <input
                  type="password"
                  id="passwordInput"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:outline-none rounded-2xl px-2 bg-blackBodyBg py-1"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="password">Confirmar nueva contraseña</label>
                <input
                  type="password"
                  id="confirmPasswordInput"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="focus:outline-none  rounded-2xl px-2 bg-blackBodyBg py-1"
                />
              </div>
              <input
                type="submit"
                value="Recuperar cuenta"
                className="bg-normalBlue text-blackBodyBg w-full mt-3 p-1 cursor-pointer font-bold rounded-2xl bg-green-500"
              />
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RecoverAccount;