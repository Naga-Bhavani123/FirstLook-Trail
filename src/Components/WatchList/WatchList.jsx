import React, { useState, useEffect } from 'react'
import ReactContext from '../../ReactContext/ReactContext'
import { useContext } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './WatchList.css'
import { ClipLoader } from 'react-spinners'
import Navbar from '../Navbar/Navbar'

const WatchList = () => {
  const { watchlist } = useContext(ReactContext)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const emptyMsg = (
    <h1 className='watchDes'>
      Your saved movies will show up here. Start watching and keep track of what you love!
    </h1>
  )

  return (
    <>
      {!loaded ? (
        <div className="spinner-containerz">
          <ClipLoader color="#FF0000" size={60} />
        </div>
      ) : (
        <div className='watchmainDiv'>
        <Navbar />

          <h1 className='watchHead'>Watch Later</h1>
          {watchlist.length > 0 ? (
            <div className='watchDiv'>
              {watchlist.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            emptyMsg
          )}
        </div>
      )}
    </>
  )
}

export default WatchList
