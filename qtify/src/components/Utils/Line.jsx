
import { styled } from '@mui/system'
import { memo } from 'react';

const StylesLine = styled("div")(() => ({
    height: '1px', 
    width: '100%',
    backgroundColor: 'var(--color-primary)',
    position:'absolute',
    left:'0',
    opacity: '70%',
    zIndex: '1',
    marginTop: '5px',
}))

const Line = memo(() => {
    console.log("Line executed...");
    return (
        <div>
            {/* <div style={{height:'1px', width: '100vw', backgroundColor: 'var(--color-primary)', position:'absolute', left:'0', opacity: '70%'}}></div> */}
            <StylesLine/>
        </div>
    )
})

export default Line;