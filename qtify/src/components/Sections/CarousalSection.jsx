import Card from "../Card/Card";
import styles from './CarousalSection.module.css'
import Carousal from '../Utils/Carousal'

import Button from '../Button/Button'
import btnStyles from '../Button/Button.module.css'

import Line from '../Utils/Line'
import { SwiperSlide } from "swiper/react";
import { useCallback, useState, useMemo } from "react";
import { ChildCare } from "@mui/icons-material";
import { memo } from "react";

const CarousalSection = memo(
  function CarousalSection({children, iterable=[], sectionTitle, sectionId, showBtn=true, handleCardClick=undefined}) {
  const [btnState, setBtnState] = useState(0);
  const collapseBtnText=["Show All", "Collapse"]
  
  const sectionInnerContent = useMemo(() => {
    console.log("inside usememo");
    return iterable.map((item) => {
      return (
        <div key={item.id} className={styles['grid-item']}>
          <Card details={item} handleCardClick={handleCardClick}/> 
        </div>
      );
    });
  }, [iterable])
  
  if (!handleCardClick)
    handleCardClick = useCallback(() => {})

  const updateKey = (children && children[1]);

  const renderIterable = () => {
    if (iterable.length === 0) {
      return <></>;
    }

    if (showBtn && btnState===1) {
      return (
        <section key={sectionId} className={styles['section-container']}>
          <div className={styles['grid-container']}>
            {sectionInnerContent}
          </div>
        </section>
      );
    }

    return (
      <section key={sectionId} className={styles['section-container']}>
        <Carousal items={sectionInnerContent}/>
      </section>
    );
  }

  return (<>
    <div className={[styles['flex-container'], styles['align-center'], styles['container']].join(" ")}>
      <p style={{fontWeight:'400', fontSize:'20px'}}>{sectionTitle}</p>
      {showBtn && <Button 
        customStyle={{border:'0', fontSize:'20px'}} 
        className={[btnStyles.btnColor]}
        onClick={()=>setBtnState((curr)=>{return 1-curr;})}
        >{collapseBtnText[btnState]}</Button>}
    </div>

    {children}

    {renderIterable()}
  </>);
})

export default CarousalSection;