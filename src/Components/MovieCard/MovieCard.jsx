import React from 'react'
import './MovieCard.css'
import ReactContext from '../../ReactContext/ReactContext'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  console.log(movie)
  const navigate = useNavigate()
  const { WishlistAdd, WishListRemove, wishlist , watchlist, watchlistAdd,watchlistRemove} = useContext(ReactContext)
  const isAdded = wishlist.find(item => item.id === movie.id);
  const isWatched = watchlist.find(item=>item.id===movie.id)
  const type = movie.media_type || movie.first_air_date ? 'tv' : 'movie';

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (isAdded) {
      WishListRemove(movie);
    } else {
      WishlistAdd({ ...movie });
    }
  };

  const toggleWatchlist = (e)=>{
     e.stopPropagation();
    if (isWatched){
      watchlistRemove(movie)
    }
    else{
      watchlistAdd({...movie})
    }
  }
  const GotoDetails = (e)=>{
    e.preventDefault()
    e.stopPropagation();
    navigate(`/movie-details/${movie.id}`, { state: { movie,type } })
  }
  
  return (
    <div className="imageDiv" onClick={GotoDetails}>
      <img
        className="imagePoster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="imageOverlay">
        <div className="overlay"> 
          <h1>{movie.title}  {movie.original_name}</h1>
          <div className="Playbuttons">
            <button className="addtowish" onClick={toggleWishlist}>
              <i className="bi bi-heart"></i> {isAdded ? 'Unwish it!' : 'Wish it!'}
            </button>
            <button className="watchlater" onClick={toggleWatchlist}>
              <i className="bi bi-stopwatch"></i> {isWatched ? 'UnWatch' : 'Watch Later'}
            </button>
          </div>
          <div className="rateDiv">
            <p>⭐ {movie.vote_average?.toFixed(2)}</p>
            <h2>{(movie.release_date || movie.first_air_date)?.slice(0, 4)}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
