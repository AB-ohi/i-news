import Image from 'next/image';
import React from 'react'
import error from '../../public/all_img/404.png'

const notFound = () => {
  return (
    <div className='flex justify-center items-center'>
      <Image className='w-1/4 mt-2.5' src={error} alt=''/>
    </div>
  )
}

export default notFound;
