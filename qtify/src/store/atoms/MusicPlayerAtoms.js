import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { createRef, useRef } from 'react';
import { songsData } from '../../assets/sample-assets/assets';
import { letterSpacing } from '@mui/system';

/**
 * Atoms
 */

export const IsPlayingAtom = atom({
    key : 'IsPlaying',
    default: false,
    effects: [
        ({onSet, getLoadable}) => {
            let intervalId;

            onSet(newVal => {
                if (newVal) {
                    const currentRef = getLoadable(AudioRefAtom).contents.current
                    
                    intervalId = setInterval(() => {
                        console.log();
                        getLoadable(timeUpdater).contents.cb();
                        if (currentRef.duration == currentRef.currentTime) {
                            clearInterval(intervalId);
                            intervalId = -1;
                        }

                    }, 1000);

                } else {
                    clearInterval(intervalId);
                    intervalId = -1;
                }
            })

            return () => {
                if (intervalId) {
                    console.log("IsPlaying cleanup");
                    clearInterval(intervalId);
                }
            };
        },
    ]
})

export const TrackAtom = atom({
    key: 'Track',
    default: songsData[0]
})

export const NextTrackAtom = atom ({
    key: 'NextTrack',
    default: ""
})

export const PrevTrackAtom = atom({
    key: 'PrevTrack',
    default: ""
})

export const AudioRefAtom = atom({
    key: 'AudioRef',
    default: {current: null},
    effects: [
        // Whenever we seek, but the audio is paused, the bg gets updated only after it plays(since its in timeUpdater)
        // So, adding an effect here, so that timer gets updated 'onSet' of the AudioRef.
        ({trigger, onSet, getLoadable}) => {
            onSet((newVal) => {
                // if (newVal && newVal.current && !isNaN(newVal.current.duration) && !isNaN(newVal.current.currentTime))
                getLoadable(timeUpdater).contents.cb();

                console.log("Inside AudioRefAtom Effect...");
                // console.log(newVal.current.duration);
                // console.log(oldVal.current.currentTime);
            })
        }
    ]
})

export const SeekBackgroundRefAtom = atom({
    key: 'SeekBackgroundRef',
    default: {current: null}
})

export const SeekBarRefAtom = atom({
    key: 'SeekBarRef',
    default: {current: null}
})

export const TimeAtom = atom({
    key: 'timeAtom',
    default: {
        currentTime: {
            minutes: "00",
            seconds: "00"
        },
        durationTime: {
            minutes: "00",
            seconds: "00"
        },
    },
})

// temp
const TrackID = atom({
    key: 'TrackIDAtom',
    default: -1,
})

/**
 * Selectors
 */

export const startPlaying = selector({
    key: 'startPlaying_functionality_selector',
    get: ({get, getCallback}) => {
        const exec = getCallback(({set, snapshot, reset}) => async () => {
            try {
                await snapshot.getLoadable(AudioRefAtom).contents.current.play();
                set(IsPlayingAtom, true);

                snapshot.getLoadable(AudioRefAtom).contents.current.onended = () => {
                    console.log("Load next track??");
                    set(IsPlayingAtom, false);
                    // uncomment if any time related prob occurs...
                    // reset(TimeAtom);
                }

                snapshot.getLoadable(AudioRefAtom).contents.current.onseeked = () => {
                    console.log('Seeked song');
                    // console.log(snapshot.getLoadable(AudioRefAtom).contents.current.seeking);
                }

                snapshot.getLoadable(AudioRefAtom).contents.current.onseeking = () => {
                    console.log("Seeking song");
                    // console.log(snapshot.getLoadable(AudioRefAtom).contents.current.seeking);
                }    
                
                // snapshot.getLoadable(timeUpdater).contents.cb();
            } catch (error) {
                console.log(error);
            }
        });
        const playingState = get(IsPlayingAtom);

        return {playingState, exec};
    },
})

export const stopPlaying = selector({
    key: 'stopPlaying_functionality_selector',
    get: ({get, getCallback}) => {
        const exec = getCallback(({set, snapshot}) => async () => {
            try {
                await snapshot.getLoadable(AudioRefAtom).contents.current.pause();
                set(IsPlayingAtom, false)

                const intervalId = get(TrackID);
                console.debug("after clearing -- ");
                console.debug(intervalId);
            } catch (error) {
                console.log(error);
            }
        });
        const playingState = get(IsPlayingAtom);

        return {playingState, exec};
    },
})

const timeUpdater = selector({
    key: 'timeUpdaterSelector',
    get: ({get, getCallback}) => {
        
        const cb = getCallback(({set}) => () => {
            /**
             * get(AudioRefAtom).current.ontimeupdate = () => {}
             * We can call the above function also, but it keeps updating at very short intervals, causing freq re-renders.
             */ 
            const currTime = get(AudioRefAtom).current.currentTime;
            const durTime = get(AudioRefAtom).current.duration;
            console.log("in ontimeupdate cb, ", currTime, durTime);

            if (!isNaN(durTime) && !isNaN(currTime)) {

                let seekbgupdate = get(SeekBackgroundRefAtom).current;
                // const percentagePerUpdate = 100/(Number(durTime));
                const newWidth = String((currTime/durTime) * 100) + '%';
                // String(Number(seekbgupdate.style.width.split('%')[0]) + percentagePerUpdate) + '%'
                seekbgupdate.style.width = newWidth;
                console.log(seekbgupdate.style.width, newWidth);
                console.log(newWidth);
                set(SeekBackgroundRefAtom, {current: seekbgupdate})

                set(TimeAtom, { 
                    currentTime: {
                        minutes: String(Math.floor(currTime/60)).padStart(2, '0') ,
                        seconds: String(Math.floor(currTime%60)).padStart(2, '0')
                    },
                    // future, seperate currTime, duration as, duration is constant and only changes for every track.
                    durationTime: {
                        minutes: String(Math.floor(durTime/60)).padStart(2, '0') ,
                        seconds: String(Math.floor(durTime%60)).padStart(2, '0')
                    }
                });
            
            
            }
        })

        return {cb};
    }
})

export const setTrack = selectorFamily({
    key: 'setTrackToPlay_functionality_selector',
    
    // Think about the Params for the setter... 
    set: (albumId) => async ({set, get}, newValue) => {
        // make an await call here...
        /**
         * Right now, since songs are playing from local assets, hardcoding.
         * Ideally I should have done something like the following.
         * 
         * const track = newValue.track
         * const prevTrack = track
         * const nextTrack = newValue.nextTrack
         * 
         * set(TrackAtom, track)
         * set(PrevTrackAtom, prevTrack)
         * set(NextTrackAtom, nextTrack)
        */
        
        console.log("setTrack.set()");

        const currTrack = get(TrackAtom);
        const trackId = get(TrackID);

        console.log(songData);

        if (currTrack === '') {
            set(TrackID, 0);
            set(TrackAtom, songData[trackId])
            set(NextTrackAtom, songData[(trackId+1) % 4]); // round-robin among the 4 songs.
        } else {

        }
    }
})

export const seekSong = selector({
    key: 'seekSongSelector',
    get: ({get}) => {
        return get(TimeAtom).currentTime;
    },
    set: ({set, get}, event) => {
        let audioRef =  get(AudioRefAtom).current;
        const seekBarRef = get(SeekBarRefAtom).current;
        const seekedPoint = (audioRef.duration * event.nativeEvent.offsetX) / seekBarRef.offsetWidth
        audioRef.currentTime = seekedPoint;
        // console.log(seekedPoint);

        set(AudioRefAtom, {current: audioRef});
        // console.log(get(TimeAtom).currentTime);
    },
})