import gridStyles from "./MusicPlayer.module.css"
import { useState, memo, useMemo, useEffect, useRef } from "react";
import { Calculate, SettingsVoiceTwoTone } from "@mui/icons-material";
import { height } from "@mui/system";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';

import HeadPhones from '../../assets/hero_headphones.png'
import Playing from '../../assets/playing.png'
import Paused from '../../assets/paused.png'
import NextTrack from '../../assets/next.png'
import PrevTrack from '../../assets/prev.png'
import next_flaticon from '../../assets/next_flaticon_outline.png'
// import song1 from '../../assets/sample-assets/song1.mp3'

import { IsPlayingAtom, TrackAtom, NextTrackAtom, PrevTrackAtom, setTrack, SeekBackgroundRefAtom, SeekBarRefAtom,
    startPlaying, stopPlaying, seekSong, TimeAtom, AudioRefAtom } from '../../store/atoms/MusicPlayerAtoms';

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const MusicPlayer = memo (function MusicPlayer() {
    console.log("Musicplayer recreated");
    const {durationTime} = useRecoilValue(TimeAtom);
    const currTrack = useRecoilValue(TrackAtom);

    const memoizedSongDetails = useMemo(() => {
        return {
            durationTime,
            file: currTrack.file,
        };
    }, [currTrack]);
    
    return (
        <div className={`${gridStyles.musicPlayerParent}`}>
            <section className={`${gridStyles.container} ${gridStyles.playerPosition}`}>
                <section className={`${gridStyles['music-card']}`}>
                    <img src={HeadPhones} alt="Not found" />
                    <p className={`${gridStyles['title']}`}>Song name</p>
                    <p className={`${gridStyles['subtitle']}`}>Album name</p>
                </section>
                <section>
                    <Player duration={durationTime} songURI={memoizedSongDetails.file}></Player>
                </section>
            </section>
        </div>
    )
})


const Player = memo(function Player({duration , songURI}) {
    // const [playing, setPlaying] = useState(false); // Display |> first ... i.e its paused..

    const isPlaying = useRecoilValue(IsPlayingAtom);
    
    // audio, seek ref atoms
    const [audioRefAtom, setAudioRefAtom] = useRecoilState(AudioRefAtom);
    const setSeekBarRefAtom = useSetRecoilState(SeekBarRefAtom);
    const setSeekBgRefAtom = useSetRecoilState(SeekBackgroundRefAtom);

    const audioReference = useRef(null);
    const seekBarReferance = useRef(null);
    const seekBackgroundReferance = useRef(null);
    const seekSongCb = useSetRecoilState(seekSong);

    // track related atoms.
    const nextTrack = useRecoilValue(NextTrackAtom);
    const prevTrack = useRecoilValue(PrevTrackAtom);
    const [time, setTime] = useRecoilState(TimeAtom);
    // const checkForTimeUpdate = useRecoilValue(timeUpdater);

    // call backs
    const setTrackCb = useSetRecoilState(setTrack(null));
    const playCb = useRecoilValue(startPlaying);
    const pauseCb = useRecoilValue(stopPlaying);

    useEffect(()=>{
        console.debug(time);
    }, [time])
    
    // #DEV-LOG
    useEffect(()=>{
        setAudioRefAtom({current: audioReference.current});
        setSeekBarRefAtom({current: seekBarReferance.current})
        setSeekBgRefAtom({current: seekBackgroundReferance.current})
        console.debug(audioRefAtom);
        console.log("Player Mounted");
    }, [])

    useEffect(() => {
        console.log("onclick",playCb.playingState);
        console.log(audioRefAtom);
    }, [playCb])


    const handlePlayState = async () => {
        // Also, perform the actual logic of play/pause of the song...
        isPlaying ? pauseCb.exec() : playCb.exec();
    }

    console.log("Player recreated");
    return (
        <div className={`${gridStyles['controller']}`}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap:'15px'}}>
                <button 
                    className={`${gridStyles['btn']}`}
                    onClick={() => console.log("Clicked NextTrack")}
                >
                    <img className={`${gridStyles['prev']}`} src={PrevTrack} alt="" />
                </button>

                <button 
                    className={`${gridStyles['btn']}`}
                    onClick={handlePlayState}
                >
                    {isPlaying ? 
                        <img src={Paused} alt="" /> :
                        <img src={Playing} alt="" />
                    }
                </button>

                <button 
                    className={`${gridStyles['btn']}`}
                    onClick={() => console.log("Clicked NextTrack")}
                >
                    <img className={`${gridStyles['next']}`} src={NextTrack} alt="" />
                </button>
                
            </div>
            <div className={`${gridStyles['progressbar-section']}`}>
                <p>{time.currentTime.minutes}:{time.currentTime.seconds}</p>
                <div id="seekBar" onClick={(e) => seekSongCb(e)} 
                    ref={seekBarReferance} 
                    style={{width: '100%' , backgroundColor: 'whitesmoke', borderRadius: '9999px', cursor: 'pointer'}}>
                    <hr id="seekBg" 
                        ref={seekBackgroundReferance} 
                        style={{'--height': '4px', height: 'var(--height)' , width:'0%', backgroundColor: 'green', border:0, borderRadius: '9999px'}}/>
                </div>
                {/* <p>{time.durationTime.minutes}:{time.durationTime.seconds}</p> */}
                <p>{duration.minutes}:{duration.seconds}</p>
            </div>
            <audio preload="auto" id="refedAudio" 
                ref={audioReference} 
                src={songURI}></audio>
        </div>
    )
});

export default MusicPlayer;