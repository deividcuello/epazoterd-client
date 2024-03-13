import React from 'react'

function About() {
  return (
    <section className='container mx-auto mt-5'>
        <h2>¿Quienes somos?</h2>
      <div>
        <div>
          <p>En Epazote, nos enorgullecemos de ser el hogar de la auténtica gastronomía mexicana en Santo Domingo. Con una rica variedad de platos que reflejan la diversidad culinaria de México, cada bocado es una experiencia sensorial que te transporta a las calles de Oaxaca, los mercados de Puebla o las playas de Yucatán. Nuestro compromiso con la calidad se refleja en cada ingrediente fresco y en nuestras recetas tradicionales cuidadosamente elaboradas.</p><br></br>
          <p>Desde los vibrantes colores de nuestros platos hasta el cálido ambiente de nuestro restaurante, en Epazote te sumergirás en una experiencia única. Ya sea que estés disfrutando de nuestros tacos al pastor perfectamente sazonados, deleitándote con un guacamole fresco o saboreando un mole poblano casero, cada visita es una celebración de la rica herencia culinaria de México.</p><br></br>
          <p>Nuestro equipo está dedicado a brindarte un servicio excepcional y una experiencia inolvidable en cada visita. Nos esforzamos por crear un ambiente acogedor donde te sientas como en casa mientras exploras los sabores y las tradiciones de México. ¡Ven y descubre por qué Epazote es mucho más que un restaurante mexicano en Santo Domingo: es un viaje culinario que no querrás perderte!</p>
        </div>
      </div>
      <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='bg-customBlack p-7 rounded-xl text-center'>
          <h3 className='from-[#01AA55] via-white to-[#F62E2C] bg-gradient-to-r bg-clip-text text-transparent font-dancing-script text-3xl inline-block'>Misión</h3>
          <p>En Epazote, nos comprometemos a ser el puente que une México con Santo Domingo a través de la autenticidad de nuestra gastronomía. Nuestra misión es ofrecer una experiencia culinaria excepcional, donde cada plato refleje la riqueza y la diversidad de la cocina mexicana. Nos esforzamos por crear un ambiente acogedor y hospitalario donde nuestros clientes se sientan como en casa, mientras disfrutan de sabores auténticos y recuerdos perdurables.</p>
        </div>
        <div className='bg-customBlack p-7 rounded-xl text-center'>
          <h3 className='from-[#01AA55] via-white to-[#F62E2C] bg-gradient-to-r bg-clip-text text-transparent font-dancing-script text-3xl inline-block'>Valores</h3>
          <p>En Epazote, nuestros valores son el alma de nuestro negocio. Valoramos la autenticidad, comprometiéndonos a utilizar ingredientes frescos y genuinos en cada plato que servimos. La calidad es nuestra máxima prioridad, desde la selección de ingredientes hasta la presentación final de cada plato. La hospitalidad es parte de nuestra esencia, brindando un servicio excepcional y creando vínculos duraderos con nuestros clientes. Nos esforzamos por la innovación, buscando constantemente nuevas formas de sorprender y deleitar a nuestros comensales, manteniendo siempre nuestras raíces mexicanas.</p>
        </div>
        <div className='bg-customBlack p-7 rounded-xl text-center'>
          <h3 className='from-[#01AA55] via-white to-[#F62E2C] bg-gradient-to-r bg-clip-text text-transparent font-dancing-script text-3xl inline-block'>Visión</h3>
          <p>Nuestra visión es convertirnos en el destino gastronómico de referencia para los amantes de la cocina mexicana en Santo Domingo y más allá. Nos esforzamos por ser reconocidos por nuestra excelencia culinaria, nuestra autenticidad y nuestra capacidad para crear experiencias memorables que trasciendan lo ordinario. Deseamos ser un lugar donde los clientes puedan experimentar la riqueza cultural de México a través de su comida, y donde cada visita sea un viaje sensorial que despierte los sentidos y nutra el alma. En Epazote, aspiramos a ser más que un restaurante; queremos ser un lugar de encuentro, celebración y conexión, donde la pasión por la buena comida y la buena compañía se unan en armonía.</p>
        </div>
      </div>
    </section>
  )
}

export default About