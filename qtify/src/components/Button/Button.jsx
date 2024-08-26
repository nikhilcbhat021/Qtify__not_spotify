
export default function Button({
        handleButtonClick=()=>{console.log("Button clicked")} , 
        title = "Button Title"
    }) {
    return (
        <button
            onClick={handleButtonClick}
        >{title}</button>
    );
}