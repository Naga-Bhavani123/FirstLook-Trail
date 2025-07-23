import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import TrendingSection from "./Components/TrendingSection/TrendingSection";
import UpcomingMovies from "./Components/UpcomingMovies/UpcomingMovies";
import HomePage from "./Components/HomePage/HomePage";
import Tvshows from './Components/TV Shows/Tvshows';
import ReactContext from './ReactContext/ReactContext';
import { useState } from 'react';
import WishList from './Components/WishList/WishList';
import WatchList from './Components/WatchList/WatchList';
import SearchRoot from './Components/SearchRoot/SearchRoot';
import Movies from './Components/Movies/Movies';
import MovieDetails from './Components/MovieDetailsPage/MovieDetails';
import Trailer from './Components/Trailer/Trailer';
import Login from './Components/Login/Login';
import Registration from './Components/Registration/Registration';
import ProtectRoute from "./Components/ProtectRoute";

function App() {
  const [wishlistArr, setwishlistArr] = useState([]);
  const [watchArr, setWatchArr] = useState([]);
  const [searchName, setsearchName] = useState('');
  const [isLog, setisLog] = useState(false)

  const loggedCheck = ()=>{
    setisLog(prev=>!prev)
  }

  const addWish = (movie) => {
    if (!wishlistArr.find(item => item.id === movie.id)) {
      setwishlistArr(prev => [...prev, { ...movie }]);
    }
  };

  const wishremove = (movie) => {
    setwishlistArr(prev => prev.filter(item => item.id !== movie.id));
  };

  const addWatch = (movie) => {
    if (!watchArr.find(item => item.id === (movie.id || movie.original_name))) {
      setWatchArr(prev => [...prev, { ...movie }]);
    }
  };

  const removewatch = (movie) => {
    setWatchArr(prev => prev.filter(item => item.id !== movie.id));
  };

  const search = (changeName) => {
    setsearchName(changeName);
  };

  return (
    <BrowserRouter>
      <ReactContext.Provider value={{
        wishlist: wishlistArr,
        WishlistAdd: addWish,
        WishListRemove: wishremove,
        watchlist: watchArr,
        watchlistAdd: addWatch,
        watchlistRemove: removewatch,
        searchname: searchName,
        search: search,
        loggedIn: isLog,
        loggedCheck: loggedCheck
      }}>
        <Routes>
          <Route path="/" element={<ProtectRoute><HomePage /></ProtectRoute>} />
          <Route path="/upcoming" element={<ProtectRoute><UpcomingMovies /></ProtectRoute>} />
          <Route path="/trending" element={<ProtectRoute><TrendingSection /></ProtectRoute>} />
          <Route path="/wishlist" element={<ProtectRoute><WishList /></ProtectRoute>} />
          <Route path="/tv-shows" element={<ProtectRoute><Tvshows /></ProtectRoute>} />
          <Route path="/watch-later" element={<ProtectRoute><WatchList /></ProtectRoute>} />
          <Route path="/movies" element={<ProtectRoute><Movies /></ProtectRoute>} />
          <Route path="/search-results" element={<ProtectRoute><SearchRoot /></ProtectRoute>} />
          <Route path="/trailer/:id" element={<ProtectRoute><Trailer /></ProtectRoute>} />
          <Route path="/movie-details/:id" element={<ProtectRoute><MovieDetails /></ProtectRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </ReactContext.Provider>
    </BrowserRouter>
  );
  // return (
  //   <BrowserRouter>
  //     <ReactContext value={{
  //       wishlist: wishlistArr,
  //       WishlistAdd: addWish,
  //       WishListRemove: wishremove,
  //       watchlist: watchArr,
  //       watchlistAdd: addWatch,
  //       watchlistRemove: removewatch,
  //       searchname: searchName,
  //       search: search,
  //       loggedIn: isLog,
  //       loggedCheck: loggedCheck
  //     }}>
  //       <Routes>
  //         <Route path="/" element={<HomePage /> }/>
  //         <Route path="/upcoming" element={<UpcomingMovies />} />
  //         <Route path="/trending" element={<TrendingSection /> }  />
  //         <Route path="/wishlist" element={<WishList />} />
  //         <Route path="/tv-shows" element={<Tvshows />} />
  //         <Route path="/watch-later" element={<WatchList />} />
  //         <Route path="/movies" element={<Movies />} />
  //         <Route path="/search-results" element={<SearchRoot />} />
  //         <Route path="/trailer/:id" element={<Trailer />} />
  //         <Route path="/movie-details/:id" element={<MovieDetails />} />
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/register" element={<Registration />} />
  //       </Routes>
  //     </ReactContext>
  //   </BrowserRouter>
  //);
}

export default App;
