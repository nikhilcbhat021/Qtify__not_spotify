import { display } from '@mui/system';
import styles from './Button.module.css';

function Button({
        customStyle = {backgroundColor: "black", color: "var(--color-primary)", pr:"16px", pl:"16px", pt:"10px", pb:"10px", flex:'1 1 auto'},
        onClick=()=>{console.log("Button clicked")},
        className=[],
        text,
        children
    }) {

    console.log();

    return (
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <button
                style={customStyle}
                className={[className, styles.btn].join(" ")}
                onClick={onClick}
                onMouseEnter={()=>{console.log(`mouse hovered, text=${text} , children=${children}`);}}
                >{text? text : children}</button>
        </div>
    );
}


export default Button;