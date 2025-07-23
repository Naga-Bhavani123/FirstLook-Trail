import React, { useContext, useEffect, useState } from 'react'
import './MovieDetails.css'
import { useLocation, useParams } from 'react-router-dom';
import ReactContext from '../../ReactContext/ReactContext';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from '../Navbar/Navbar';

const MovieDetails = () => {
    const { state } = useLocation();
    const navi = useNavigate()
    const movie = state?.movie;
    const type = state?.type || "movie";
    const { WishlistAdd, watchlistAdd,wishlist ,watchlist,WishListRemove,watchlistRemove} = useContext(ReactContext)
    const watchTrailer = ()=>{
        navi(`/trailer/${movie.id}`, {state: {movie,type}})
    }
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
   
    const isAdded = wishlist.find(item => item.id === movie.id);
     const isWatched = watchlist.find(item=>item.id===movie.id)

    const detailWish = (e) => {
        e.stopPropagation();
        if (isAdded) {
            WishListRemove(movie);
        } else {
            WishlistAdd(movie);
        }
    };

    const detailWatch = (e) => {
        e.stopPropagation();
        if (isWatched) {
            watchlistRemove(movie);
        } else {
            watchlistAdd(movie);
        }
    };


    const backdropUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    const streamfetchURL = `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=ce676c654868e1fb7c7f39a2391400dc`;
    const [movieStream, setMovieStream] = useState({})
    const notAvailable = <p className='nostrem'>No streaming platforms found</p>
    useEffect(() => {
        const fetchStream = async () => {
        try {
            const res = await fetch(streamfetchURL);
            const resData = await res.json();
            const streams = resData.results?.IN?.flatrate || resData.results?.IN?.rent || [];
            setMovieStream(streams);
        } catch (error) {
            console.error("Failed to fetch streaming platforms:", error);
            setMovieStream([]);
        } finally {
            setLoading(false);
        }
    };
    fetchStream();
    }, [id,type])
    if (!movie) {
    return (
        <div style={{ padding: "40px", color: "white" }}>
            <h2>Movie or Show Not Found</h2>
            <p>Return to home and try again.</p>
        </div>
    );
}

    return (
        <>
        <Navbar />
<div className="backdrop-bg" style={{
            backgroundImage: `linear-gradient(135deg,rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${backdropUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            flexWrap: 'wrap',
        }}>
            <div className="posterDiv">
                <img className="posterr" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Sinners Poster" />
            </div>
            <div className="movieDetails">
                <h1 className="movietitleHead">{movie.title || movie.original_name}</h1>
                <p>⭐ {movie.vote_average?.toFixed(1)} <i className="bi bi-calendar-event"></i> {(movie.release_date || movie.first_air_date)?.slice(0, 4)} </p>
                <p className="movieDescription">
                    {movie.overview || 'No description available.'}
                </p>
                <div className='streaminigplatforms'>
                    {movieStream.length > 0 ? (
                        movieStream.map((item) => (
                            <img
                                key={item.provider_id}
                                src={`https://www.themoviedb.org/t/p/original${item.logo_path}`}
                                alt={item.provider_name}
                            />
                        ))
                    ) : notAvailable}
                </div>
                <div className="button-group">
                    <button className="btn btn-trailer" onClick={watchTrailer}>
                        <i className="bi bi-play"></i> Watch Trailer
                    </button>
                    <button className="btn btn-glass" onClick={detailWish}>
                        <i className="bi bi-heart"></i> {isAdded ? 'Unwish it!' : 'Wish it!'}
                    </button>
                    <button className="btn btn-glass" onClick={detailWatch}>
                        <i className="bi bi-clock"></i> {isWatched ? 'UnWatch' : 'Watch Later'}
                    </button>
                </div>
            </div>
        </div>
        </>
        
    )
}

export default MovieDetails