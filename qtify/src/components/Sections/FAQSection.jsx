import { memo } from 'react'
import FAQAccordian from '../Utils/Accordian'
import sectionStyles from './CarousalSection.module.css'


const FAQSection = memo((props) => {
    const { faqs=[] } = props;
    console.log("Reconciling FAQSection");
    if (faqs.length && faqs[faqs.length - 1].question !== 'Can this app really play music??') {
        faqs.push({
            question: "Can this app really play music??" , 
            answer: "No, Since I was having too much free time, I thought let me annoy you, soo.. enjoy the app!!"
        })
    }

    return (
        <div className={[sectionStyles['container'], sectionStyles['flex-container'], sectionStyles['flex-column'], sectionStyles['align-center'], sectionStyles['justify-center']].join(" ")}>
            <h1 className={sectionStyles.accorodianHeader}>FAQs</h1>
            {faqs.map((faq) => <FAQAccordian faq={faq}/>)}
        </div> 
    )
})


// const FAQAccordian = memo(function FAQAccordian({faq}) {

//     const [collapsed, setCollapsed] = useState(true);

//     console.log("Reconciling FAQAccordian");
//     return (
//         <div className={sectionStyles.accordianItem}>
//             <div className={sectionStyles.accordianQuestion} onClick={() => setCollapsed(curr => !curr)}>
//                 <div>{faq.question}</div>
//                 <button className={collapsed ? sectionStyles.btn : `${sectionStyles.btn} ${sectionStyles.expanded}`}>
//                     {/* <img src={collapsed ? DownArrow : UpArrow} alt="" style={{height: '40px', width:'40px', backgroundColor: 'white' ,transition: 'ease-in-out all 0.2s'}}/> */}
//                 </button>
//             </div>
//             <div className={collapsed ? sectionStyles.accordianAnsCollapsed : sectionStyles.accordianAnsExpanded}>{faq.answer}</div>
//         </div>
//     )
// })

export default FAQSection;