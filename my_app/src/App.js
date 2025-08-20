import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import searchIcon from './search.svg';
import Moviecard from './Components/Moviecard';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=7b76dae4';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchmovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search || []); // Ensure movies is always an array
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    searchmovies('Batman');
  }, []);

  return (
    <div className="App">
      <h1>MovieLand
        
      </h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={searchIcon} 
          alt="search" 
          onClick={() => searchmovies(searchTerm)} 
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <Moviecard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
