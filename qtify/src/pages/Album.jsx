import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

const Album = ({id}) => {
    const [songDetails, setSongDetails] = useState({});
    const params = useParams();
    // const loaderData = useLoaderData();

    console.log("Inside album");
    console.log(params);
    // console.log(loaderData);
    return (
        <div>
            <div id="al-bum">Album</div>
            
        </div>

    )
}

export default Album;