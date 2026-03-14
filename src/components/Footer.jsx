import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-gray-300 py-6 mt-auto'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center'>
            <p className='text-sm'>
                &copy; {new Date().getFullYear()} Rit Enterprises All Rights Reserved.
            </p>
        </div>
     
    </footer>
  )
}

export default Footer
