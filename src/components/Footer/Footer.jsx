import React from 'react'

function Footer() {
  return (
    <footer className='container mx-auto mt-10 py-2'>
        <div className='flex justify-between items-center'>
            <img src="/logo.png" alt="" className='w-20'/>
            <span className='text-end'>© 2024 Epazote. All Rights Reserved</span>
        </div>
    </footer>
  )
}

export default Footer