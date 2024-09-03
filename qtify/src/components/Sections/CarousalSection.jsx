import Card from "../Card/Card";
import styles from './CarousalSection.module.css'
import Carousal from './Carousal'
import Line from '../Utils/Line'
import { SwiperSlide } from "swiper/react";

function CarousalSection({items, sectionId, btnState}) {

  const sectionInnerContent = items.map((item) => {
      return (
        <div key={item.id} className={styles['grid-item']}>
          <Card details={item} /> 
        </div>
      );
  });

  // console.log(sectionInnerContent[0]);

  return (
    btnState === 'Show All' ? (
      <section key={sectionId} className={styles['section-container']}>
        <Carousal items={sectionInnerContent}></Carousal>
      </section>
    ) : (
      <section key={sectionId} className={styles['section-container']}>
        <div className={styles['grid-container']}>
          {sectionInnerContent}
        </div>
      </section>
    )
  );
}

export default CarousalSection;