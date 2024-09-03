import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Breakpoints from conf file.
import Breakpoints from '../../../conf.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './CarousalSection.module.css'
import '../../index.css';

// import required modules
import { Navigation } from 'swiper/modules';

export default function Carousal({children, items=[]}) {

  return (<>
    <Swiper
      spaceBetween={40}
      slidesPerView={2}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      // slideWidth
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}

      breakpointsBase='container'
      breakpoints={Breakpoints.breakpoints}
      modules={[Navigation]}
    >
      <section className={styles['grid-container']}>
      {
        items.map((item) => {
          return (
            <SwiperSlide key={item.key}>
              {item}
            </SwiperSlide>
          );
        })
      }
      </section>

      <button className='swiper-button-next'></button>
      <button className='swiper-button-prev'></button>
    </Swiper>
    
  </>);
}
