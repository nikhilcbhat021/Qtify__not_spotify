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


// @mui
import { Tab, Tabs } from '@mui/material'

function App() {

  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(0);

  
  const collapseBtnText=["Show All", "Collapse"]

  useEffect(()=>{
    async function onLoadHandler() {
      try {
        let token = '123.456.7890'
        const topalbumsresponse = await axios.get(`https://qtify-backend-labs.crio.do/albums/top`, {
          headers:{
            'Authorization': `Bearer ${token}`,
          },
        });

        const newalbumsresponse = await axios.get(`https://qtify-backend-labs.crio.do/albums/new`, {
          headers:{
            'Authorization': `Bearer ${token}`,
          },
        })

        const allsongsresponse = await axios.get(`https://qtify-backend-labs.crio.do/songs`, {
          headers:{
            'Authorization': `Bearer ${token}`,
          },
        })

        const genresresponse = await axios.get(`https://qtify-backend-labs.crio.do/genres`, {
          headers:{
            'Authorization': `Bearer ${token}`,
          },
        })

        console.log("Inside useEffect");
        // console.log(response.data);

        setTopAlbums(topalbumsresponse.data);
        setNewAlbums(newalbumsresponse.data);
        setAllSongs(allsongsresponse.data);
        setFilteredSongs(allsongsresponse.data);
        setGenres([{key:"all", label: "All"}, ...genresresponse.data.data]);
        
        console.log([{key:"all", label: "All"}, ...genresresponse.data.data]);

      } catch (error) {
        console.log(error.message);
      }
    }

    onLoadHandler();
  }, [])

  useEffect(()=>{
    console.log("inside useeffect for genres only");
    console.log(genres);
  }, [genres])


  const handleChange = (event, newValue) => {
    console.log(`In handleChange ${genres[newValue].key}`);
    let postFiltering = [];

    if (genres[newValue].key === 'all')
      postFiltering = [...allSongs];
    else
      postFiltering = allSongs.filter((song) => (song.genre.key===genres[newValue].key));
    
    console.log(postFiltering.map(s=>s.title));
    console.log("all songs len="+allSongs.length)
    setSelectedGenre(newValue);
    setFilteredSongs(postFiltering);
  };

  console.log(selectedGenre);
  return (
    <BrowserRouter>
      <Navbar searchData=""/>
      <Hero/>

      <section className={[styles['flex-container'], styles['gap-2'], styles['flex-column'], styles['container']].join(" ")}>
        <CarousalSection iterable={topAlbums} sectionTitle="Top Albums" key="__1__" />
        <Line />
        <CarousalSection iterable={newAlbums} sectionTitle="New Albums" key="__2__" />        
        <Line />

        <CarousalSection showBtn={false} iterable={filteredSongs}  sectionTitle="Songs" key="__3__">
          <Tabs value={selectedGenre} onChange={handleChange} aria-label="basic tabs example">
            {genres.map( genre => {
              return (
                <Tab key={genre.key} label={genre.label} sx={{color: 'var(--color-text)'}}/>
              );
            })}
          </Tabs>
        </CarousalSection>
      </section>
    </BrowserRouter>
  )
}

function a11yProps(index) {
  return {
    id: `genre-tab-${index}`,
    'aria-controls': `genre-tabpanel-${index}`,
  };
}
function CustomTab({key, iterable, children}) {

}
export default App
