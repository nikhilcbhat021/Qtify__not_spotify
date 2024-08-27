import styles from './Button.module.css';

function Button({
        customStyle = {backgroundColor: "black", color: "var(--color-primary)"},
        handleButtonClick=()=>{console.log("Button clicked")} , 
        children
    }) {
    return (
        <button
            style={customStyle}
            className={styles.btn}
            onClick={handleButtonClick}
        >{children}</button>
    );
}


export default Button;