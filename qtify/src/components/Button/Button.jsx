import styles from './Button.module.css';

function Button({
        customStyle = {backgroundColor: "black", color: "var(--color-primary)", pr:"16px", pl:"16px", pt:"10px", pb:"10px"},
        handleButtonClick=()=>{console.log("Button clicked")},
        className=[],
        children
    }) {

    // console.log(className);
    return (
        <button
            style={customStyle}
            className={[...className, styles.btn].join(" ")}
            onClick={handleButtonClick}
        >{children}</button>
    );
}


export default Button;