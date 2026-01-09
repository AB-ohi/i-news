import React from 'react';
import demoImage from '../../../../public/ImgForHome/demoImage.jpg'
import Image from 'next/image';
import "./NewsContainer.css";
const NewsContainer = () => {
  return (
    <div className='homeNewsCards'>
        <div className='mainCard'>
            {/* card heading */}
            <h1 className='cardHeading'>Darun News</h1>
            {/* new heading */}
            <p className='headline'>Kawha kader ar jonno nijer hate kabor kurte prostut miraj afridi</p>
            <Image className='mainCardImg' src={demoImage} alt="" />

            <p></p>
        </div>
        <div>

        </div>
    </div>
  )
}

export default NewsContainer
