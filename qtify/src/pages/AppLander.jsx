import { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navabar'
import { BrowserRouter, Outlet, useNavigate, useParams } from 'react-router-dom'
import styles from './AppLander.module.css'
import btnStyles from '../components/Button/Button.module.css'
import Hero from '../components/Hero/Hero';
import Button from '../components/Button/Button'
import Line from '../components/Utils/Line'
import CarousalSection from '../components/Sections/CarousalSection'
import FAQSection from '../components/Sections/FAQSection'
import MusicPlayer from '../components/MusicPlayer/MusicPlayer'
import axios from 'axios'


// @mui
import { Tab, Tabs } from '@mui/material'
import { color } from '@mui/system'

function AppLander() {

    const [topAlbums, setTopAlbums] = useState([]);
    const [newAlbums, setNewAlbums] = useState([]);
    const [allSongs, setAllSongs] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(0);
    const [loading, setLoading] = useState(true);
    const [songDetails, setSongDetails] = useState({});

    const collapseBtnText = ["Show All", "Collapse"];
    const navigation = useNavigate();

    const params = useParams();
    // const loaderData = useLoaderData();

    console.log("Inside AppLander");
    console.log(params);

    useEffect(() => {
        async function onLoadHandler() {
            try {
                let token = '123.456.7890'
                const topalbumsresponse = await axios.get(`https://qtify-backend-labs.crio.do/albums/top`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const newalbumsresponse = await axios.get(`https://qtify-backend-labs.crio.do/albums/new`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })

                const faqsresponse = await axios.get(`https://qtify-backend-labs.crio.do/faq`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })

                const allsongsresponse = await axios.get(`https://qtify-backend-labs.crio.do/songs`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })

                const genresresponse = await axios.get(`https://qtify-backend-labs.crio.do/genres`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })

                console.log("Inside useEffect");
                // console.log(response.data);

                setTopAlbums(topalbumsresponse.data);
                setNewAlbums(newalbumsresponse.data);
                setAllSongs(allsongsresponse.data);
                setFaqs(faqsresponse.data.data);
                console.log(faqsresponse.data.data);
                setFilteredSongs(allsongsresponse.data);
                setGenres([{ key: "all", label: "All" }, ...genresresponse.data.data]);

                console.log([{ key: "all", label: "All" }, ...genresresponse.data.data]);
                console.log("Inside big useEffect");
                setLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        }
        setLoading(true);
        onLoadHandler();
    }, [])

    useEffect(() => {
        console.log("inside useeffect for genres only");
        console.log(genres);
    }, [genres])


    const handleGenreChange = useCallback((event, newValue) => {
        console.log(`In handleChange ${genres[newValue].key}`);
        console.log(newValue);
        let postFiltering = [];

        if (genres[newValue].key === 'all')
            postFiltering = [...allSongs];
        else
            postFiltering = allSongs.filter((song) => (song.genre.key === genres[newValue].key));

        console.log(postFiltering.map(s => s.title));
        console.log("all songs len=" + allSongs.length)
        setSelectedGenre(newValue);
        setFilteredSongs(postFiltering);
    }, [genres, allSongs]);

    const onAlbumClick = useCallback((cardDetails=undefined) => {
        console.log("In OnAlbumClick");
        console.log(cardDetails);
        navigation('/album/20');
    }, [])

    const onSongClick = useCallback((cardDetails=undefined) => {
        console.log("In onSongClick");
        console.log(cardDetails);
    }, [])


    console.log(selectedGenre);
    return (
        <div style={{height: '100%'}}>
            <Hero />
            <section className={[styles['flex-container'], styles['gap-2'], styles['flex-column'], styles['container']].join(" ")}>
                <CarousalSection handleCardClick={onAlbumClick} iterable={topAlbums} sectionTitle="Top Albums" key="__1__" />
                <Line />
                <CarousalSection handleCardClick={() => onAlbumClick("Nikhil")} iterable={newAlbums} sectionTitle="New Albums" key="__2__" />
                <Line />
                <CarousalSection handleCardClick={onSongClick} showBtn={false} iterable={filteredSongs} sectionTitle="Songs" key="__3__">
                    <Tabs value={selectedGenre} onChange={handleGenreChange} aria-label="basic tabs example">
                        {genres.map(genre => {
                            return (
                                <Tab key={genre.key} label={genre.label} sx={{ color: 'var(--color-text)' }} />
                            );
                        })}
                    </Tabs>
                </CarousalSection>
                <Line />
                <FAQSection faqs={faqs} />
            </section>
        </div>
    )
}

/* TODO : Define CustomTab and use Carousal in it. Send Tabs and CustomTab as children. */
export default AppLander;
