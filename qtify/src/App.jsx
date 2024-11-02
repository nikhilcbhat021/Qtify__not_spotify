import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navabar'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { createBrowserRouter, useNavigate, useLocation, RouterProvider } from 'react-router-dom'
import styles from './App.module.css'
import btnStyles from './components/Button/Button.module.css'
import Hero from './components/Hero/Hero';
import Button from './components/Button/Button'
import Line from './components/Utils/Line'
import CarousalSection from './components/Sections/CarousalSection'
import FAQSection from './components/Sections/FAQSection'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import axios from 'axios'


// @mui
import { Tab, Tabs } from '@mui/material'
import { color } from '@mui/system'
import AppLander from './pages/AppLander'
import Album from './pages/Album'
import { RecoilRoot } from 'recoil'


async function apploader() {
  let token = '123.456.7890'
  const topalbumsresponse = await axios.get(`https://qtify-backend-labs.crio.do/albums/top`, {
    headers:{
      'Authorization': `Bearer ${token}`,
    },
  });

  console.log("returning from apploader...");
  return topalbumsresponse;
}


const router = createBrowserRouter([
  {
    path: "/",
    loader: apploader,
    element: (<div style={{position: 'relative', maxWidth:'100%'}}>
      <Navbar/>
      <Outlet/>
      <MusicPlayer/> 
    </div>),

    children: [
      {
        path: "",
        element: <AppLander />,
      },
      {
        path: "album/:albumId",
        loader: someThing,
        element: <Album />,
      }
    ],

    errorElement: <>
      <div>What happened?</div>
      <div>Are you lost?</div>
      <div>If you are here, then it means something unexpected has occured.</div>
    </>
  },
])

async function someThing() {
  console.log("Doing Something..");
  return 5;
}

function App() {

  // const [topAlbums, setTopAlbums] = useState([]);
  // const [newAlbums, setNewAlbums] = useState([]);
  // const [allSongs, setAllSongs] = useState([]);
  // const [faqs, setFaqs] = useState([]);
  // const [filteredSongs, setFilteredSongs] = useState([]);
  // const [genres, setGenres] = useState([]);
  // const [selectedGenre, setSelectedGenre] = useState(0);
  // const [loading, setLoading] = useState(true);
  
  // const collapseBtnText=["Show All", "Collapse"]

  // useEffect(()=>{
  //   async function onLoadHandler() {
  //     try {
  //       let token = '123.456.7890'
  //       const topalbumsresponse = await axios.get(`https://qtify-backend-labs.crio.do/albums/top`, {
  //         headers:{
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       });

  //       const newalbumsresponse = await axios.get(`https://qtify-backend-labs.crio.do/albums/new`, {
  //         headers:{
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       })

  //       const faqsresponse = await axios.get(`https://qtify-backend-labs.crio.do/faq`, {
  //         headers:{
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       })

  //       const allsongsresponse = await axios.get(`https://qtify-backend-labs.crio.do/songs`, {
  //         headers:{
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       })

  //       const genresresponse = await axios.get(`https://qtify-backend-labs.crio.do/genres`, {
  //         headers:{
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       })

  //       console.log("Inside useEffect");
  //       // console.log(response.data);

  //       setTopAlbums(topalbumsresponse.data);
  //       setNewAlbums(newalbumsresponse.data);
  //       setAllSongs(allsongsresponse.data);
  //       setFaqs(faqsresponse.data.data);
  //       console.log(faqsresponse.data.data);
  //       setFilteredSongs(allsongsresponse.data);
  //       setGenres([{key:"all", label: "All"}, ...genresresponse.data.data]);
        
  //       console.log([{key:"all", label: "All"}, ...genresresponse.data.data]);
  //       console.log("Inside big useEffect");
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   setLoading(true);
  //   onLoadHandler();
  // }, [])

  // useEffect(()=>{
  //   console.log("inside useeffect for genres only");
  //   console.log(genres);
  // }, [genres])


  // const handleChange = (event, newValue) => {
  //   console.log(`In handleChange ${genres[newValue].key}`);
  //   let postFiltering = [];

  //   if (genres[newValue].key === 'all')
  //     postFiltering = [...allSongs];
  //   else
  //     postFiltering = allSongs.filter((song) => (song.genre.key===genres[newValue].key));
    
  //   console.log(postFiltering.map(s=>s.title));
  //   console.log("all songs len="+allSongs.length)
  //   setSelectedGenre(newValue);
  //   setFilteredSongs(postFiltering);
  // };

  // console.log(selectedGenre);

  const [songDetails, setSongDetails] = useState({});

  return (<div>
      {/* <BrowserRouter>
        <Routes>
        <Route exact path='/' element={<AppLander/>}/>
        <Route path='/albums/:albumId' element={<Album/> }> </Route>
        </Routes>
      </BrowserRouter> */}
      <RecoilRoot>
        <RouterProvider router={router}></RouterProvider>
      </RecoilRoot>

    </div>
  )
}

/* TODO : Define CustomTab and use Carousal in it. Send Tabs and CustomTab as children. */
export default App
