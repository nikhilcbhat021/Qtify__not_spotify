import styles from './Button.module.css';

function Button({
        customStyle = {backgroundColor: "black", color: "var(--color-primary)"},
        handleButtonClick=()=>{console.log("Button clicked")} , 
        title = "Button Title"
    }) {
    return (
        <button
            style={customStyle}
            className={styles.btn}
            onClick={handleButtonClick}
        >{title}</button>
    );
}


export default Button;