import styles from './Button.module.css';

function Button({
        customStyle = {backgroundColor: "black", color: "var(--color-primary)", pr:"16px", pl:"16px", pt:"10px", pb:"10px"},
        onClick=()=>{console.log("Button clicked")},
        className=[],
        children
    }) {

    return (
        <button
            style={customStyle}
            className={[...className, styles.btn].join(" ")}
            onClick={onClick}
        >{children}</button>
    );
}


export default Button;