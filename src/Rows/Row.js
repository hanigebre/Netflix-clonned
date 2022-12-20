import React, { useState, useEffect } from 'react'
import "./Row.css"
import axios from '../axios'
import movieTrailer from "movie-trailer"
import Youtube from "react-youtube"

const base_url = "https://image.tmdb.org/t/p/original/";
const  Row= ({title,fetchUrl,isLargeRow}) => { 

    const [movies, setmovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
    
    useEffect(() => {
        async function fetchData() {
          const request = await axios.get(fetchUrl);
          setmovies(request.data.results);
   return request;
        } 
        fetchData(); 
      }, [fetchUrl]);


      const opts={
        heght: "390",
        width: "100%",
        playerVars: {
        autoplay: 1,
        }
      }
    //   console.log(movies);
    const handleClick = (movie) => {
        if(trailerUrl){
          setTrailerUrl('')
        }else {
          movieTrailer(movie.title ||movie.name||movie.orignal_name)
          .then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search)
            setTrailerUrl(urlParams.get('v'))
          })
          .catch((error) => console.log(error))
        }
      }
    // console.log(mov);
    return (
        <div className="row">
            <h1>{title}</h1>
            <div className="row__posters">
                 {movies.map((movie)=>(
                     <img   className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                     onClick={() => handleClick(movie)}
                     src={`${base_url}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                     alt={movie.name} />
                 )
                 )}
            </div>
            <div style={{padding: "40px"}}>
                {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
            </div>
        </div>

    )
}

export default Row