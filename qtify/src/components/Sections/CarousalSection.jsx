import Card from "../Card/Card";
import styles from './CarousalSection.module.css'

function CarousalSection({items, sectionId}) {

    if (!sectionId) sectionId=1234;
    console.log(items);
    return (
      <section key={sectionId} className={styles['section-container']}>
        <div className={styles['grid-container']}>
          {items.map((item) => {
              return (<div key={item.id} className={styles['grid-item']}>
                <Card key={item.id} details={item} /> {/* Here, 2 options-- send the img,chip and title as seperate props or send them as an object-prop */}
              </div>);
          })}
        </div>
      </section>
    );
}

export default CarousalSection;