import React, { useContext } from 'react'
import './Search.css'
import SearchRoot from '../SearchRoot/SearchRoot'
import { useNavigate } from 'react-router-dom'
import ReactContext from '../../ReactContext/ReactContext'

const Search = () => {
    const navigate = useNavigate()
    const {search} = useContext(ReactContext)
    const SearchRoot = ()=>{
        navigate('/search-results')

    }
    const handleSearchChange = (e) => {
      e.preventDefault()
      search(e.target.value); 
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      SearchRoot();
    }
  };


  return (
    <div className="searchInput">
                <input type="search" placeholder="Seach Trailers..." onKeyDown={handleKeyDown} className="searchBox" onChange={handleSearchChange}/>
                <i className="bi bi-search" onClick={SearchRoot}></i>
            </div>
  )
}

export default Search