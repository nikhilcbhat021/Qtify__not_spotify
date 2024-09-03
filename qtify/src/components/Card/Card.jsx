import styles from './Card.module.css'
import { Chip } from '@mui/material'
// import '../../App.css'
import genStyles from '../../App.module.css'
import { makeStyles } from '@mui/material'
import styled from '@emotion/styled';
import { color } from '@mui/system';

function Card({details}) {
    // console.log(details);
    return (<>
        <div className={styles.cardParent}>
            <div className={[genStyles['flex-container'], genStyles['flex-column']].join(" ")} >
                <img className={styles.cardImg} src={details.image} alt="Image not found"/>
                <div className={styles.cardChipParent}>
                    <Chip variant='filled' label={details.follows!==undefined ? `${details.follows} Follows` : `${details.likes} Likes`} size='small' sx={{bgcolor: 'var(--color-secondary)', color: 'var(--color-text)', borderRadius:'10px' ,paddingTop:'1px', paddingBottom:'1px', fontSize:'10px', lineHeight:'15px'}} />
                </div>
            </div>
            <div className={styles.cardTitle}>
                {details.title}
            </div>
        </div>
    </>);
}

export default Card;