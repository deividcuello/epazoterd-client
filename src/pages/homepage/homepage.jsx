import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FaHandPointLeft } from "react-icons/fa";
import { LuChefHat } from "react-icons/lu";
import { IoMdHappy } from "react-icons/io";

function Homepage() {
    const [isSm, setIsSm] = useState(false)

    const handleResize = () => {
        if (window.innerWidth < 640) {
            setIsSm(true)
        } else {
            setIsSm(false)
        }
      }
      
      useEffect(() => {
        window.addEventListener("resize", handleResize)
      })

    return (
        <section>
            <div className="bg-[url('https://5.imimg.com/data5/SELLER/Default/2022/12/AF/ZX/XF/14177800/fast-food-restaurant-interior-designer.jpg')] min-h-[calc(100vh-141.97px)] bg-no-repeat w-full bg-cover bg-center relative">
                <div className='w-full min-h-[calc(100vh-141.97px)] bg-black bg-opacity-70'>
                    <div className='container mx-auto'>
                        <div>
                            <h1 className="hero-text font-dancing-script translate-y-3 text-6xl w-3/4 from-[#01AA55] via-white to-[#F62E2C] bg-gradient-to-r bg-clip-text text-transparent">¡Descubre a nuestro héroe culinario! Un plato legendario que cautiva con su sabor único. ¡Ven y prueba la grandeza en cada bocado!</h1>
                        </div>
                        <div className='pt-10'>
                            <Link to='/reservar'>
                            <button className='bg-secondaryColor flex items-center gap-3 py-2 px-5 text-2xl sm:text-3xl md:text-5xl -rotate-6 rounded-2xl animate-waving-hand'>Reserva ya <FaHandPointLeft /></button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5 container mx-auto'>
                <p>En nuestro restaurante, no solo cocinamos platos exquisitos, sino que también tejemos historias. Cada plato es una página en blanco esperando ser llenada con los colores y sabores de nuestras experiencias compartidas. Somos más que un lugar para saciar el hambre; somos un escenario donde se despliegan emociones, donde se celebran los momentos especiales y se crean recuerdos inolvidables. Únete a nosotros en esta aventura culinaria, donde cada bocado es un viaje hacia la felicidad</p>
            </div>
            <div className='container mx-auto mt-5 [&>*]:mt-24 [&>*]:sm:mt-10'>
                <div className='grid grid-cols-1 sm:grid-cols-[40%_60%] place-items-center gap-6'>
                    <img src="https://handletheheat.com/wp-content/uploads/2015/06/beef-empanadas-SQUARE.jpg" alt="" className='w-full max-h-[10rem] object-cover rounded-2xl' />
                    <p className="relative before:absolute before:h-[5rem] before:-z-[1] before:w-full before:bg-secondaryColor before:bg-opacity-40 before:top-6">En Santo Domingo, somos simplemente los mejores. En nuestro restaurante, satisfacemos los caprichos más exigentes con sabores incomparables. Únete a nosotros y experimenta el egoísmo de lo excepcional</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-[40%_60%] place-items-center gap-6' dir={!isSm ? 'rtl' : 'lrt'}>
                    <img src="https://www.allrecipes.com/thmb/RKpnSHLUDT2klppYgx8jAF47GyM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/52490-PuertoRicanSteamedRice-DDMFS-061-4x3-3c3da714aa614037ad1c135ec303526d.jpg" alt="" className='w-full max-h-[10rem] object-cover rounded-2xl' />
                    <p className="relative before:absolute before:h-[5rem] before:-z-[1] before:w-full before:bg-secondaryColor before:bg-opacity-40 before:top-6">En nuestro restaurante, el arroz es una experiencia que te cautivará desde el primer bocado. Cada grano cocido a la perfección es una invitación a un mundo de sabores exquisitos. Ven y descubre por qué nuestro arroz es simplemente incomparable</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-[40%_60%] place-items-center gap-6'>
                    <img src="https://mojo.generalmills.com/api/public/content/d0OzlvMawUWJ6G_dDAdWQg_gmi_hi_res_jpeg.jpeg?v=271f2d6e&t=16e3ce250f244648bef28c5949fb99ff" alt="" className='w-full max-h-[10rem] object-cover rounded-2xl' />
                    <p className="relative before:absolute before:h-[5rem] before:-z-[1] before:w-full before:bg-secondaryColor before:bg-opacity-40 before:top-6">En nuestro restaurante, ningún menú está completo sin un postre exquisito. Es el toque final que eleva tu experiencia gastronómica a la perfección</p>
                </div>
            </div>
            <div className='mt-16 sm:mt-10'>
                <div className="bg-[url('https://i.ytimg.com/vi/flyrLbzmpMM/maxresdefault.jpg')] min-[30rem] bg-no-repeat w-full bg-cover bg-center relative">
                    <div className='w-full min-h-[30rem] bg-black bg-opacity-70 py-4'>
                        <div className='w-full min-h-[30rem] flex justify-center items-start gap-2 flex-col'>
                            <div className='container mx-auto'>
                                <h3 className='text-5xl w-3/4 translate-y-3 from-[#01AA55] via-white to-[#F62E2C] bg-gradient-to-r bg-clip-text text-transparent font-dancing-script'>El pollo frito más sabroso de toda la República Dominicana, ¡solo en nuestro restaurante!</h3>
                            </div>
                            <div className='bg-secondaryColor w-full bg-opacity-40 p-6 mt-7'>
                                <h3 className='container mx-auto text-4xl sm:text-6xl w-full '>Pero eso no es todo, tienes que ver nuestro menu 😋</h3>
                            </div>
                            <div className='container mx-auto'>
                                <Link to='/menu'>
                                    <button className='bg-yellow hover:bg-mainColor transition-all flex items-center gap-3 py-2 px-5 text-4xl sm:text-5xl mt-5 rounded-2xl text-gray-950'>Ver menu <FaHandPointLeft /></button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='container mx-auto text-center mt-10 '>
                    <div className='bg-customBlack p-10 rounded-2xl mt-16'>
                        <div className='flex justify-center relative'>
                            <LuChefHat color="#01AA55" size={'5rem'} className='absolute -top-20 bg-customBlack p-2 rounded-full' />
                        </div>
                        <p>En nuestro restaurante, nos enorgullecemos de contar con los mejores chefs, verdaderos artistas culinarios que dominan el arte de combinar sabores y texturas para ofrecerte una experiencia gastronómica inigualable. Con su pasión por la cocina y su dedicación a la excelencia, nuestros chefs están listos para cautivarte con cada plato que preparan. Ven y déjate sorprender por la creatividad y maestría de nuestros talentosos chefs, quienes transforman cada comida en una obra de arte para tu disfrute</p>
                    </div>
                    <div className='bg-customBlack p-10 rounded-2xl mt-16'>
                        <div className='flex justify-center relative'>
                            <IoMdHappy color="yellow" size={'5rem'} className='absolute -top-20 bg-customBlack p-2 rounded-full' />
                        </div>
                        <p>En nuestro restaurante, nos enorgullecemos de contar con los mejores chefs, verdaderos artistas culinarios que dominan el arte de combinar sabores y texturas para ofrecerte una experiencia gastronómica inigualable. Con su pasión por la cocina y su dedicación a la excelencia, nuestros chefs están listos para cautivarte con cada plato que preparan. Ven y déjate sorprender por la creatividad y maestría de nuestros talentosos chefs, quienes transforman cada comida en una obra de arte para tu disfrute</p>
                    </div>
                </div>
            </div>
            <div className='w-full min-h-[30rem] mt-5'>
                <h2 className='container mx-auto'>¿Donde estamos ubicados?</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.45205257614!2d-69.9493336!3d18.4631719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea563cf92a0181d%3A0x8ad279f1b9c85b85!2sEpazote%2C%20Comida%20Mexicana!5e0!3m2!1ses!2sdo!4v1709922231040!5m2!1ses!2sdo" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='w-full min-h-[30rem] object-cover'></iframe>
            </div>
        </section>
    )
}

export default Homepage