import React, { useContext, useEffect, useState } from 'react'
import './SearchRoot.css'
import ReactContext from '../../ReactContext/ReactContext'
import MovieCard from '../MovieCard/MovieCard'
import { ClipLoader } from 'react-spinners'
import Navbar from '../Navbar/Navbar'
const SearchRoot = () => {
  const {searchname} = useContext(ReactContext)
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false);

useEffect(() => {

  const filteredSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ce676c654868e1fb7c7f39a2391400dc&query=${searchname}`);
      const resData = await res.json();
      setResult(resData.results);
    } catch (error) {
      console.error("Error fetching data", error);
      setResult([]);
    } finally {
      setLoading(false);
    }
  }
  if(searchname.trim() !== '') filteredSearch();
  else setResult([]);
}, [searchname]);

  return (
    <div style={{ color: "white", paddingTop: "100px" }}>
      <Navbar/>
  <h1 className='searchHEad'>Search Results</h1>
  {loading ? (
    <div className="spinner-container">
      <ClipLoader color="#FF0000" size={60}/>
    </div>
  ) : (
    <div className='searchResults'>
      {result.length > 0 ? (
        result.map((movie) => <MovieCard movie={movie} key={movie.id} />)
      ) : (''
      )}
    </div>
  )}
</div>

  )
}

export default SearchRoot