import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navabar'
import { BrowserRouter } from 'react-router-dom'
import styles from './App.module.css'
import btnStyles from './components/Button/Button.module.css'
import Hero from './components/Hero/Hero';
import Button from './components/Button/Button'
import Line from './components/Utils/Line'
import CarousalSection from './components/Sections/CarousalSection'
import axios from 'axios'


function App() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);

  useEffect(()=>{
    async function onLoadHandler() {
      try {
        let token = '123.456.7890'
        let topresponse = await axios.get(`https://qtify-backend-labs.crio.do/albums/top`, {
          headers:{
            'Authorization': `Bearer ${token}`,
          },
        });

        let newresponse = await axios.get(`https://qtify-backend-labs.crio.do/albums/new`, {
          headers:{
            'Authorization': `Bearer ${token}`,
          },
        })

        // console.log(response);

        setTopAlbums(topresponse.data);
        setNewAlbums(newresponse.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    onLoadHandler();
  }, [])

  return (
    <BrowserRouter>
      <Navbar searchData=""/>
      <Hero/>

      <section className={[styles['flex-container'], styles['gap-2'], styles['flex-column'], styles['container']].join(" ")}>

        <div className={[styles['flex-container'], styles['align-center'], styles['container']].join(" ")}>
          <p style={{fontWeight:'400', fontSize:'20px'}}>Top Albums</p>
          <Button customStyle={{border:'0', fontSize:'20px'}} className={[btnStyles.btnColor]}>Collapse</Button>
        </div>
        <CarousalSection items={topAlbums} sectionId="__1__"/>
        
        <Line />

        <div className={[styles['flex-container'], styles['align-center'], styles['container']].join(" ")}>
          <p style={{fontWeight:'400', fontSize:'20px'}}>New Albums</p>
          <Button customStyle={{border:'0', fontSize:'20px'}} className={[btnStyles.btnColor]}>Collapse</Button>
        </div>
        <CarousalSection items={newAlbums} sectionId="__2__"/>
        
        <Line />

      </section>
    </BrowserRouter>
  )
}

export default App
