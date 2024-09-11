import { useState, memo } from "react"; 
import accStyles from './Accordian.module.css'


const FAQAccordian = memo(function FAQAccordian({faq}) {

    const [collapsed, setCollapsed] = useState(true);

    console.log("Reconciling FAQAccordian");
    return (
        <div className={accStyles.accordianItem}>
            <div className={accStyles.accordianQuestion} onClick={() => setCollapsed(curr => !curr)}>
                <div>{faq.question}</div>
                <button className={collapsed ? accStyles.btn : `${accStyles.btn} ${accStyles.expanded}`}>
                    {/* <img src={collapsed ? DownArrow : UpArrow} alt="" style={{height: '40px', width:'40px', backgroundColor: 'white' ,transition: 'ease-in-out all 0.2s'}}/> */}
                </button>
            </div>
            <div className={collapsed ? accStyles.accordianAnsCollapsed : accStyles.accordianAnsExpanded}>{faq.answer}</div>
        </div>
    )
})

export default FAQAccordian;